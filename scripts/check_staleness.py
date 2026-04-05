#!/usr/bin/env python3
"""
Check module staleness and create GitHub issues for outdated modules.

This script reads the last_verified date from each module's README frontmatter
and creates a GitHub issue if the module hasn't been verified in 30+ days.
"""

import os
import re
import sys
from datetime import datetime, timedelta
from pathlib import Path

# Configuration
STALENESS_THRESHOLD_DAYS = 30
MODULES = [
    "01-slash-commands",
    "02-memory",
    "03-skills",
    "04-subagents",
    "05-mcp",
    "06-hooks",
    "07-plugins",
    "08-checkpoints",
    "09-advanced-features",
    "10-cli",
]


def parse_frontmatter(content: str) -> dict:
    """Parse YAML frontmatter from markdown content."""
    frontmatter = {}

    # Match frontmatter between --- delimiters
    match = re.match(r"^---\s*\n(.*?)\n---\s*\n", content, re.DOTALL)
    if not match:
        return frontmatter

    yaml_content = match.group(1)

    # Parse simple key-value pairs
    for line in yaml_content.split("\n"):
        if ":" in line:
            key, value = line.split(":", 1)
            key = key.strip()
            value = value.strip().strip('"\'')
            frontmatter[key] = value

    return frontmatter


def get_last_verified(module_path: Path) -> datetime | None:
    """Get the last_verified date from a module's README."""
    readme_path = module_path / "README.md"

    if not readme_path.exists():
        return None

    content = readme_path.read_text()
    frontmatter = parse_frontmatter(content)

    last_verified = frontmatter.get("last_verified")
    if last_verified:
        try:
            return datetime.strptime(last_verified, "%Y-%m-%d")
        except ValueError:
            return None

    return None


def create_issue_title(module_name: str) -> str:
    """Create a standardized issue title."""
    return f"[Staleness] Module {module_name} needs verification"


def check_existing_issue(module_name: str) -> bool:
    """Check if an issue already exists for this module."""
    import subprocess

    try:
        result = subprocess.run(
            ["gh", "issue", "list", "--search", create_issue_title(module_name),
             "--state", "open", "--json", "number"],
            capture_output=True,
            text=True,
            check=True
        )
        issues = result.stdout.strip()
        return issues != "[]"
    except (subprocess.CalledProcessError, FileNotFoundError):
        # If gh CLI is not available, assume no existing issue
        return False


def create_issue(module_name: str, days_stale: int) -> None:
    """Create a GitHub issue for a stale module."""
    import subprocess

    title = create_issue_title(module_name)
    body = f"""## Module Staleness Alert

The module **{module_name}** has not been verified in **{days_stale}** days.

### Action Required

1. Review the module's README.md
2. Verify all examples work with the current Claude Code version
3. Update the `last_verified` date in frontmatter
4. Update the version badge if needed

### Files to Update

- `{module_name}/README.md` — Update frontmatter and version badge

### Threshold

- Last verified: {days_stale} days ago
- Threshold: {STALENESS_THRESHOLD_DAYS} days

---

*This issue was automatically created by the staleness-check workflow.*
"""

    try:
        subprocess.run(
            ["gh", "issue", "create",
             "--title", title,
             "--body", body,
             "--label", "stale,documentation"],
            capture_output=True,
            text=True,
            check=True
        )
        print(f"Created issue for {module_name}")
    except subprocess.CalledProcessError as e:
        print(f"Failed to create issue for {module_name}: {e.stderr}")
    except FileNotFoundError:
        print("gh CLI not available, skipping issue creation")


def main():
    """Main entry point."""
    print("Checking module staleness...")
    print(f"Threshold: {STALENESS_THRESHOLD_DAYS} days")
    print()

    repo_root = Path(os.environ.get("GITHUB_WORKSPACE", "."))
    issues_created = 0
    modules_stale = 0

    for module in MODULES:
        module_path = repo_root / module
        last_verified = get_last_verified(module_path)

        if last_verified is None:
            print(f"  {module}: No last_verified date found")
            continue

        days_since = (datetime.now() - last_verified).days

        if days_since > STALENESS_THRESHOLD_DAYS:
            print(f"  {module}: STALE ({days_since} days since verification)")

            if not check_existing_issue(module):
                if os.environ.get("GITHUB_TOKEN"):
                    create_issue(module, days_since)
                    issues_created += 1
                else:
                    print(f"    Would create issue (no GITHUB_TOKEN)")
            else:
                print(f"    Issue already exists")

            modules_stale += 1
        else:
            print(f"  {module}: OK ({days_since} days since verification)")

    print()
    print(f"Summary: {modules_stale} stale modules, {issues_created} issues created")


if __name__ == "__main__":
    main()
