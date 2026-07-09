# Intentionally naive — extend as needed.
"""Load recipe cards from markdown files with YAML frontmatter."""

import logging
from pathlib import Path

import frontmatter

logger = logging.getLogger(__name__)


def load_recipes(dir: str | Path) -> list[dict]:
    """Read every .md file in `dir` into a record.

    Each record contains the parsed frontmatter keys, plus:
      - body: the raw markdown body below the frontmatter, as one string
      - source_file: the name of the file it came from

    Files that fail to parse are skipped with a logged warning.
    """
    records = []
    for path in sorted(Path(dir).glob("*.md")):
        try:
            post = frontmatter.load(path)
            records.append(
                {**post.metadata, "body": post.content, "source_file": path.name}
            )
        except Exception:
            logger.warning("Skipping %s: failed to parse", path, exc_info=True)
    return records
