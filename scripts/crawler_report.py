"""Summarize AI crawler hits on the Firebase Hosting site from Cloud Logging.

Usage:
    python3 scripts/crawler_report.py            # last 7 days
    python3 scripts/crawler_report.py --days 30

Requires gcloud authenticated with read access to the project's logs.
"""

from __future__ import annotations

import argparse
import json
import subprocess
import sys
from collections import Counter, defaultdict
from dataclasses import dataclass, field
from datetime import datetime, timedelta, timezone
from urllib.parse import urlparse

PROJECT = "wanderlund-static-website"
LOG_NAME = f"projects/{PROJECT}/logs/firebasehosting.googleapis.com%2Fwebrequests"

# User-agent token -> category. Order matters only if tokens overlap; none do today.
BOTS: dict[str, str] = {
    "GPTBot": "training",
    "ClaudeBot": "training",
    "CCBot": "training",
    "Bytespider": "training",
    "meta-externalagent": "training",
    "Amazonbot": "training",
    "OAI-SearchBot": "search",
    "Claude-SearchBot": "search",
    "PerplexityBot": "search",
    "ChatGPT-User": "user-triggered",
    "Claude-User": "user-triggered",
    "Perplexity-User": "user-triggered",
    "meta-externalfetcher": "user-triggered",
    # Search indexes that ground assistants: Bing feeds ChatGPT search, Google feeds Gemini.
    "bingbot": "index",
    "Googlebot": "index",
}

# Requests whose user agent contains this marker are our own test traffic.
TEST_MARKER = "logging-test"


@dataclass
class BotStats:
    """Hit counts for one crawler."""

    category: str
    hits: int = 0
    paths: Counter[str] = field(default_factory=Counter)
    statuses: Counter[int] = field(default_factory=Counter)
    last_seen: str = ""


def classify(user_agent: str) -> tuple[str, str] | None:
    """Return (bot, category) for a known AI crawler user agent, else None."""
    ua = user_agent.lower()
    for token, category in BOTS.items():
        if token.lower() in ua:
            return token, category
    return None


def summarize(entries: list[dict]) -> dict[str, BotStats]:
    """Aggregate Cloud Logging entries into per-bot stats."""
    stats: dict[str, BotStats] = {}
    for entry in entries:
        req = entry.get("httpRequest", {})
        ua = req.get("userAgent", "")
        if TEST_MARKER in ua:
            continue
        match = classify(ua)
        if match is None:
            continue
        bot, category = match
        s = stats.setdefault(bot, BotStats(category=category))
        s.hits += 1
        s.paths[urlparse(req.get("requestUrl", "")).path or "/"] += 1
        if "status" in req:
            s.statuses[int(req["status"])] += 1
        s.last_seen = max(s.last_seen, entry.get("timestamp", ""))
    return stats


def build_filter(since: datetime) -> str:
    """Build the Cloud Logging filter for crawler requests since a given time."""
    pattern = "|".join(BOTS)
    return (
        f'logName="{LOG_NAME}" '
        f'timestamp>="{since.strftime("%Y-%m-%dT%H:%M:%SZ")}" '
        f'httpRequest.userAgent=~"(?i){pattern}"'
    )


def fetch(days: int) -> list[dict]:
    """Read matching log entries via gcloud."""
    since = datetime.now(timezone.utc) - timedelta(days=days)
    cmd = [
        "gcloud", "logging", "read", build_filter(since),
        f"--project={PROJECT}", "--format=json", "--limit=100000",
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        sys.exit(f"gcloud failed:\n{result.stderr}")
    return json.loads(result.stdout or "[]")


def render(stats: dict[str, BotStats], days: int, top: int) -> str:
    """Format stats as a plain-text report grouped by category."""
    if not stats:
        return f"No AI crawler hits in the last {days} days."
    lines = [f"AI crawler hits, last {days} days\n"]
    by_cat: dict[str, list[tuple[str, BotStats]]] = defaultdict(list)
    for bot, s in stats.items():
        by_cat[s.category].append((bot, s))
    for category in ("user-triggered", "search", "index", "training"):
        bots = sorted(by_cat.get(category, []), key=lambda b: -b[1].hits)
        if not bots:
            continue
        lines.append(f"== {category} ({sum(s.hits for _, s in bots)} hits)")
        for bot, s in bots:
            codes = ", ".join(f"{c}:{n}" for c, n in sorted(s.statuses.items()))
            lines.append(f"  {bot:<22}{s.hits:>6}  last {s.last_seen[:16]}  [{codes}]")
            for path, n in s.paths.most_common(top):
                lines.append(f"      {n:>5}  {path}")
        lines.append("")
    return "\n".join(lines)


def main() -> None:
    """Parse arguments, fetch logs, and print the report."""
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--days", type=int, default=7, help="lookback window (logs keep 30)")
    parser.add_argument("--top", type=int, default=5, help="top paths to show per bot")
    args = parser.parse_args()
    print(render(summarize(fetch(args.days)), args.days, args.top))


if __name__ == "__main__":
    main()
