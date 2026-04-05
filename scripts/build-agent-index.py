#!/usr/bin/env python3
"""
Build Agent Index - Generate structured index for AI agent lookup.

This script reads all module README files and generates:
1. agent-manifest.json - Structured data for AI agents
2. AGENT-INDEX.md - Human-readable summary

Usage:
    python3 scripts/build-agent-index.py
"""

import json
import re
from datetime import datetime
from pathlib import Path

# Configuration
REPO_ROOT = Path(__file__).parent.parent
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
    match = re.match(r"^---\s*\n(.*?)\n---\s*\n", content, re.DOTALL)
    if not match:
        return frontmatter

    yaml_content = match.group(1)
    for line in yaml_content.split("\n"):
        if ":" in line:
            key, value = line.split(":", 1)
            key = key.strip()
            value = value.strip().strip('"\'')
            frontmatter[key] = value

    return frontmatter


def extract_headings(content: str) -> list:
    """Extract all headings from markdown content."""
    headings = []
    for match in re.finditer(r"^(#{1,3})\s+(.+)$", content, re.MULTILINE):
        level = len(match.group(1))
        text = match.group(2).strip()
        headings.append({"level": level, "text": text})
    return headings


def extract_code_blocks(content: str) -> list:
    """Extract code blocks with language and content."""
    blocks = []
    pattern = r"```(\w+)?\s*\n(.*?)```"
    for match in re.finditer(pattern, content, re.DOTALL):
        language = match.group(1) or "text"
        code = match.group(2).strip()
        if len(code) > 500:
            code = code[:500] + "...[truncated]"
        blocks.append({"language": language, "content": code})
    return blocks


def process_module(module_path: Path) -> dict:
    """Process a single module and extract metadata."""
    readme_path = module_path / "README.md"

    if not readme_path.exists():
        return None

    content = readme_path.read_text()
    frontmatter = parse_frontmatter(content)

    content_without_fm = re.sub(r"^---\s*\n.*?\n---\s*\n", "", content, flags=re.DOTALL)

    headings = extract_headings(content_without_fm)
    code_blocks = extract_code_blocks(content_without_fm)

    topics = [h["text"] for h in headings if h["level"] == 2][:10]
    examples = code_blocks[:5]

    return {
        "name": module_path.name,
        "path": str(module_path.relative_to(REPO_ROOT)) + "/README.md",
        "cc_version_verified": frontmatter.get("cc_version_verified", "unknown"),
        "last_verified": frontmatter.get("last_verified", "unknown"),
        "topics": topics,
        "examples": examples,
        "code_blocks_count": len(code_blocks),
        "headings_count": len(headings),
    }


def build_manifest() -> dict:
    """Build the complete agent manifest."""
    modules = []

    for module_name in MODULES:
        module_path = REPO_ROOT / module_name
        data = process_module(module_path)
        if data:
            modules.append(data)

    return {
        "version": "1.0",
        "generated_at": datetime.now().isoformat(),
        "claude_code_version": "2.1.92",
        "modules": modules,
    }


def generate_markdown_index(manifest: dict) -> str:
    """Generate human-readable AGENT-INDEX.md."""
    lines = [
        "# Agent Index",
        "",
        f"> Generated: {manifest['generated_at']}",
        f"> Claude Code Version: {manifest['claude_code_version']}",
        "",
        "This index provides structured metadata for AI agents to query module content.",
        "",
        "## Modules Overview",
        "",
        "| Module | Topics | Examples | Code Blocks | Verified |",
        "|--------|--------|----------|-------------|----------|",
    ]

    for module in manifest["modules"]:
        lines.append(
            f"| [{module['name']}]({module['path']}) "
            f"| {len(module['topics'])} "
            f"| {len(module['examples'])} "
            f"| {module['code_blocks_count']} "
            f"| {module['last_verified']} |"
        )

    lines.extend(["", "## Module Details", ""])

    for module in manifest["modules"]:
        lines.extend([
            f"### {module['name']}",
            "",
            f"- **Path:** `{module['path']}`",
            f"- **Verified:** {module['last_verified']} (CC v{module['cc_version_verified']})",
            f"- **Topics:** {', '.join(module['topics'][:5]) or 'N/A'}",
            "",
        ])

    return "\n".join(lines)


def main():
    """Main entry point."""
    print("Building agent index...")

    manifest = build_manifest()

    manifest_path = REPO_ROOT / "agent-manifest.json"
    manifest_path.write_text(json.dumps(manifest, indent=2))
    print(f"  Created: {manifest_path}")

    index_path = REPO_ROOT / "AGENT-INDEX.md"
    index_content = generate_markdown_index(manifest)
    index_path.write_text(index_content)
    print(f"  Created: {index_path}")

    print(f"\n  Modules indexed: {len(manifest['modules'])}")
    print(f"  Total code blocks: {sum(m['code_blocks_count'] for m in manifest['modules'])}")

    print("\n✓ Agent index built successfully")


if __name__ == "__main__":
    main()
