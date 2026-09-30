import copy
import datetime as dt
import importlib.util
import pathlib
import tempfile
import unittest
from unittest.mock import patch

spec = importlib.util.spec_from_file_location("refresh", pathlib.Path(__file__).with_name("refresh.py"))
r = importlib.util.module_from_spec(spec)
spec.loader.exec_module(r)
NOW = dt.datetime(2026, 9, 30, 20, tzinfo=dt.timezone.utc)


def sample(ident="C01", title="Pi adds MCP support", source="hn", rank=1, url="https://example.com/mcp"):
    c = r.card(title, url, source, rank, r.stamp(NOW), votes=100, comments=5, observed_url="https://news.ycombinator.com/item?id=1")
    c.update(id=ident, article_text="Pi adds MCP support. Access rolls out gradually to a small group of users.", article_available=True)
    return c


def group(ids):
    return {"card_ids": ids, "headline": "Pi gradually rolls out MCP support", "fact": "Pi adds MCP support with access rolling out gradually.", "scope": "coding", "category": "Tools & harnesses"}


def check(index=0):
    return {"index": index, "same_event": True, "relevant": True, "supported": True, "qualifiers_preserved": True, "evidence_card_id": "C01", "evidence_quote": "Pi adds MCP support.", "reason": "Supported"}


class RefreshTests(unittest.TestCase):
    def test_native_extractor_abort_is_contained_and_next_article_succeeds(self):
        body = ("<html><head><title>Pi adds MCP support</title></head><body><article>" +
                "<p>Pi adds native MCP support for coding agents, with access rolling out gradually to early users.</p>" * 12 +
                "</article></body></html>").encode()
        with tempfile.TemporaryDirectory() as directory:
            crash = pathlib.Path(directory) / "crash.py"
            crash.write_text("import os,resource\nresource.setrlimit(resource.RLIMIT_CORE,(0,0))\nos.abort()\n")
            with patch.object(r, "download", return_value=body):
                with patch.object(r, "EXTRACTOR", crash):
                    failed = r.article(sample())
                self.assertFalse(failed["article_available"])
                self.assertEqual(failed["article_text"], "")
                good = r.article(sample("C02"))
                self.assertTrue(good["article_available"])
                self.assertEqual(good["source_title"], "Pi adds MCP support")

    def test_identity_strips_tracking_and_rejects_unsafe_urls(self):
        self.assertEqual(r.canonical("https://www.example.com/story/?utm_source=x&accessToken=secret&a=1#here"), "https://example.com/story?a=1")
        for url in ["javascript:alert(1)", "https://user:pass@example.com", "https://example.com:8080"]:
            with self.assertRaises(ValueError): r.canonical(url)
        with patch.object(r.socket, "getaddrinfo", return_value=[(2, 1, 6, "", ("127.0.0.1", 443))]):
            with self.assertRaises(ValueError): r.public_url("https://example.com/")

    def test_duplicates_do_not_inflate_points(self):
        c = sample()
        duplicate = copy.deepcopy(c)
        merged = r.dedupe([c, duplicate] * 8)
        self.assertEqual(len(merged), 1)
        self.assertEqual(r.score(merged[0]["observations"]), r.score(c["observations"]))
        self.assertEqual(r.score(c["observations"] * 10), r.score(c["observations"]))

    def test_independent_sources_and_rank_contribute_deterministically(self):
        hn = sample(rank=30)
        tm = sample(source="techmeme", rank=1)
        points = r.score(hn["observations"] + tm["observations"])
        self.assertEqual(points["agreement"], 15)
        self.assertGreater(points["total"], r.score(hn["observations"])["total"])
        self.assertGreater(r.score(sample(rank=1)["observations"])["total"], r.score(sample(rank=100)["observations"])["total"])

    def test_final_answer_does_not_parse_commentary(self):
        raw = {"status": "completed", "output": [{"type": "message", "phase": "commentary", "content": [{"type": "output_text", "text": "not JSON"}]}, {"type": "message", "phase": "final_answer", "content": [{"type": "output_text", "text": '{"groups":[]}'}]}]}
        self.assertEqual(r.parse_final(raw), {"groups": []})
        raw["status"] = "incomplete"
        with self.assertRaises(ValueError): r.parse_final(raw)

    def test_every_card_once_and_factual_quote_must_match(self):
        cards = [sample(), sample("C02", url="https://example.com/other")]
        self.assertTrue(r.groups_valid([group(["C01", "C02"])], cards))
        self.assertFalse(r.groups_valid([group(["C01", "C01"])], cards))
        self.assertTrue(r.evidence_matches(check(), cards))
        bad = check(); bad["evidence_quote"] = "Pi is proven better than every competitor."
        self.assertFalse(r.evidence_matches(bad, cards))

    def test_failed_qualifier_check_uses_original_headline(self):
        bad = check(); bad["qualifiers_preserved"] = False
        stories = r.build_stories([sample()], [group(["C01"])], [bad], {}, NOW)
        self.assertEqual(stories[0]["headline"], "Pi adds MCP support")
        self.assertEqual(stories[0]["headline_status"], "source")
        self.assertEqual(stories[0]["fact"], "")

    def test_bad_merge_does_not_combine_attention(self):
        cards = [sample(), sample("C02", title="Pi MCP security patch", source="techmeme", url="https://example.com/security")]
        bad = check(); bad["same_event"] = False
        stories = r.build_stories(cards, [group(["C01", "C02"])], [bad], {}, NOW)
        self.assertEqual(len(stories), 2)
        self.assertTrue(all(s["breakdown"]["agreement"] == 0 for s in stories))

    def test_repeat_refresh_same_window_is_not_persistence(self):
        state = {}
        args = ([sample()], [group(["C01"])], [check()], state)
        first = r.build_stories(*args, NOW)[0]
        again = r.build_stories(*args, NOW + dt.timedelta(minutes=10))[0]
        later = r.build_stories(*args, NOW + dt.timedelta(hours=4))[0]
        self.assertEqual(first["points"], again["points"])
        self.assertEqual(later["points"], first["points"] + 3)

    def test_budget_failure_sends_no_request(self):
        class Store:
            def save(self, state): raise AssertionError("No reservation should be saved")
        state = {"budget": {"2026-09": {"used_upper_usd": r.MONTHLY_LIMIT, "calls": 0}}}
        with patch.dict(r.os.environ, {"OPENAI_API_KEY": "test-only-placeholder"}):
            with patch.object(r.urllib.request, "urlopen", side_effect=AssertionError("No paid request")):
                with self.assertRaises(ValueError): r.Editorial(state, Store(), NOW).call("prompt", {}, r.GROUP_SCHEMA)

    def test_timeout_keeps_persisted_reservation_and_no_retry(self):
        writes = []
        class Store:
            def save(self, state): writes.append(copy.deepcopy(state))
        state = {}
        with patch.dict(r.os.environ, {"OPENAI_API_KEY": "test-only-placeholder"}):
            with patch.object(r.urllib.request, "urlopen", side_effect=TimeoutError) as request:
                with self.assertRaises(TimeoutError): r.Editorial(state, Store(), NOW).call("prompt", {}, r.GROUP_SCHEMA)
                self.assertEqual(request.call_count, 1)
        self.assertEqual(len(writes), 1)
        self.assertGreater(writes[0]["budget"]["2026-09"]["used_upper_usd"], 0)

    def test_techmeme_captures_main_clusters_only(self):
        cluster = '<div class="clus"><div class="item"><div class="ii"><a class="ourh" href="https://example.com/mcp">Pi adds MCP</a></div></div><a href="https://example.com/comment">Discussion</a></div>'
        cards = r.techmeme(cluster * 5, r.stamp(NOW))
        self.assertEqual(len(cards), 5)
        self.assertTrue(all(c["url"] == "https://example.com/mcp" for c in cards))
        with self.assertRaises(ValueError): r.techmeme("<html>Sign in</html>", r.stamp(NOW))

    def test_stale_specialist_feed_cannot_add_current_prominence(self):
        xml = '<rss version="2.0"><channel><title>AI</title><item><title>New coding agent</title><link>https://example.com/old</link><pubDate>Wed, 09 Sep 2026 05:44:39 GMT</pubDate></item></channel></rss>'
        cards, newest = r.specialist(xml, "smol", "https://example.com/feed", r.stamp(NOW), NOW)
        self.assertEqual(cards, [])
        self.assertTrue(newest.startswith("2026-09-09"))

    def test_last_good_edition_is_preserved_when_all_sources_fail(self):
        with tempfile.TemporaryDirectory() as directory:
            p = pathlib.Path(directory)
            import json
            old = {"version": 1, "generated_at": r.stamp(NOW), "stories": r.build_stories([sample()], [group(["C01"])], [check()], {}, NOW), "source_health": []}
            (p / "latest.json").write_text(json.dumps(old))
            args = type("Args", (), {"publish": False, "output": directory, "no_ai": True})()
            with patch.object(r, "collect", return_value=([], [{"source": "hn", "status": "unavailable"}])):
                with self.assertRaises(ValueError): r.refresh(args)
            saved = json.loads((p / "latest.json").read_text())
            self.assertEqual(saved["stories"], old["stories"])
            self.assertEqual(saved["generated_at"], old["generated_at"])


if __name__ == "__main__": unittest.main()
