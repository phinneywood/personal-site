"""Exercise the built page and public feed in a real Chromium browser."""
import argparse
import json
from pathlib import Path
import time
import urllib.request
import xml.etree.ElementTree as ET

from playwright.sync_api import sync_playwright


def verify(url, output, live=False):
    output.mkdir(parents=True, exist_ok=True)
    for attempt in range(24):
        try:
            with urllib.request.urlopen(url, timeout=10) as response:
                assert response.status == 200
                assert b'AGENT REPORT' in response.read()
            break
        except Exception:
            if attempt == 23:
                raise
            time.sleep(5 if live else 0.2)
    with sync_playwright() as p:
        browser = p.chromium.launch()
        context = browser.new_context(viewport={"width": 1280, "height": 900})
        page = context.new_page()
        errors = []
        page.on("pageerror", lambda error: errors.append(str(error)))
        response = page.goto(url, wait_until="networkidle")
        assert response.status == 200
        assert page.locator("h1").inner_text() == "AGENT REPORT"
        stories = page.locator("#front-page article")
        count = stories.count()
        assert count >= 5, count
        assert page.locator(".story-details[open]").count() == 0
        assert "unavailable" not in page.locator("#status").inner_text().lower()
        data_response = page.request.get(url.rstrip("/") + "/current.json")
        assert data_response.ok
        edition = data_response.json()
        assert count == len(edition["stories"])
        original_time = page.locator("#edition-time").get_attribute("datetime")
        assert original_time == edition["generated_at"]
        assert page.locator(".lead h2 a").inner_text() == edition["stories"][0]["headline"]
        assert page.locator(".stories").evaluate("e => getComputedStyle(e).gridTemplateColumns.split(' ').length") == 3
        page.screenshot(path=str(output / "desktop.png"), full_page=True)
        page.locator(".story-details > summary").first.click()
        assert page.locator(".story-details[open] table").count() == 1
        page.locator("#scope").select_option("coding")
        assert stories.count() == sum(s["scope"] == "coding" for s in edition["stories"])
        page.locator("#scope").select_option("all")
        page.locator("#refresh").click()
        page.wait_for_function("!document.querySelector('#refresh').disabled")
        assert "unavailable" not in page.locator("#status").inner_text().lower()
        page.set_viewport_size({"width": 390, "height": 844})
        page.screenshot(path=str(output / "mobile.png"), full_page=True)
        assert page.evaluate("document.documentElement.scrollWidth <= innerWidth"), "Horizontal overflow"
        assert page.locator(".stories").evaluate("e => getComputedStyle(e).gridTemplateColumns.split(' ').length") == 1
        assert page.locator(".story-details > summary").evaluate_all("es => es.every(e => e.scrollWidth <= e.clientWidth)"), "Metadata wraps or overflows"
        if live:
            rss = page.request.get(url.rstrip("/") + "/feed.xml")
            assert rss.ok
            assert len(ET.fromstring(rss.text()).findall("channel/item")) >= 5
        page.route("**/agent-report/current.json", lambda route: route.abort())
        page.locator("#refresh").click()
        page.wait_for_function("!document.querySelector('#refresh').disabled")
        assert stories.count() == count
        assert page.locator("#edition-time").get_attribute("datetime") == original_time
        assert "saved edition" in page.locator("#status").inner_text()
        assert not errors, errors
        no_js = browser.new_context(java_script_enabled=False, viewport={"width": 390, "height": 844})
        fallback = no_js.new_page()
        assert fallback.goto(url).status == 200
        assert fallback.locator("#front-page article").count() >= 5
        assert fallback.locator("noscript").inner_text()
        browser.close()
    report = {"url": url, "status": "passed", "stories": count, "generated_at": original_time,
              "viewports": ["1280x900", "390x844"], "page_errors": errors,
              "verified": ["live JSON", "points and evidence", "scope filter", "refresh", "three desktop columns", "one mobile column", "single-line metadata", "offline last-good retention", "no-JavaScript fallback"] + (["public RSS"] if live else [])}
    (output / "verification.json").write_text(json.dumps(report, indent=2) + "\n")
    print(json.dumps(report))


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--url", default="http://127.0.0.1:4173/agent-report")
    parser.add_argument("--output", type=Path, default=Path(".agent-report-browser"))
    parser.add_argument("--live", action="store_true")
    args = parser.parse_args()
    verify(args.url, args.output, args.live)
