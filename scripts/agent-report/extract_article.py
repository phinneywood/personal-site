"""One bounded, credential-free HTML extraction worker; no network or files."""
import html
import json
import re
import resource
import sys

resource.setrlimit(resource.RLIMIT_CORE, (0, 0))

from bs4 import BeautifulSoup
import trafilatura


if __name__ == "__main__":
    data = sys.stdin.buffer.read(2_000_001)
    if len(data) > 2_000_000:
        raise ValueError("Article exceeds size limit")
    text = trafilatura.extract(data, include_comments=False, include_tables=False) or ""
    soup = BeautifulSoup(data, "html.parser")
    meta = soup.find("meta", property="og:title")
    title = meta.get("content", "") if meta else soup.title.get_text(" ", strip=True) if soup.title else ""
    if not 8 < len(title) < 220 or re.search(r"access denied|just a moment|page not found|sign in", title, re.I):
        title = ""
    print(json.dumps({"article_text": text[:3600], "source_title": html.unescape(title)}))
