"""Unit tests for crawler_report. Run: python3 -m unittest discover scripts"""

import unittest

from crawler_report import classify, render, summarize


def entry(ua: str, url: str = "https://www.wanderlund.com/", status: int = 200,
          ts: str = "2026-11-12T10:00:00Z") -> dict:
    """Build a minimal Cloud Logging entry."""
    return {"timestamp": ts, "httpRequest": {"userAgent": ua, "requestUrl": url, "status": status}}


class ClassifyTest(unittest.TestCase):
    def test_known_bots(self) -> None:
        self.assertEqual(classify("Mozilla/5.0 (compatible; GPTBot/1.2)"), ("GPTBot", "training"))
        self.assertEqual(classify("Mozilla/5.0 ChatGPT-User/1.0"), ("ChatGPT-User", "user-triggered"))
        self.assertEqual(classify("Claude-SearchBot/1.0"), ("Claude-SearchBot", "search"))

    def test_case_insensitive(self) -> None:
        self.assertEqual(classify("perplexitybot/1.0"), ("PerplexityBot", "search"))

    def test_regular_browser_is_ignored(self) -> None:
        self.assertIsNone(classify("Mozilla/5.0 (Macintosh) Safari/605.1.15"))


class SummarizeTest(unittest.TestCase):
    def test_counts_paths_statuses_and_last_seen(self) -> None:
        stats = summarize([
            entry("GPTBot/1.2", "https://www.wanderlund.com/llms.txt", ts="2026-11-10T00:00:00Z"),
            entry("GPTBot/1.2", "https://www.wanderlund.com/llms.txt?x=1", ts="2026-11-11T00:00:00Z"),
            entry("GPTBot/1.2", "https://www.wanderlund.com/missing", status=404),
            entry("Mozilla/5.0 Safari"),
        ])
        s = stats["GPTBot"]
        self.assertEqual(s.hits, 3)
        self.assertEqual(s.paths["/llms.txt"], 2)
        self.assertEqual(s.statuses[404], 1)
        self.assertEqual(s.last_seen, "2026-11-12T10:00:00Z")
        self.assertEqual(list(stats), ["GPTBot"])

    def test_skips_test_traffic(self) -> None:
        self.assertEqual(summarize([entry("ClaudeBot/1.0; logging-test")]), {})

    def test_render_empty(self) -> None:
        self.assertIn("No AI crawler hits", render({}, 7, 5))


if __name__ == "__main__":
    unittest.main()
