from app.loader import load_recipes

SAMPLE = """---
name: Test Pour
ingredients: dockgrain spirit, glowcap nectar
flavor_profile: sweet, warming
---

## Description

A test drink.
"""

BROKEN = """---
name: "Unclosed
---

body
"""


def test_load_recipes_happy_path(tmp_path):
    (tmp_path / "test-pour.md").write_text(SAMPLE)
    records = load_recipes(tmp_path)
    assert len(records) == 1
    record = records[0]
    assert record["name"] == "Test Pour"
    assert record["ingredients"] == "dockgrain spirit, glowcap nectar"
    assert record["source_file"] == "test-pour.md"
    assert "## Description" in record["body"]


def test_load_recipes_skips_unparseable_file(tmp_path):
    (tmp_path / "good.md").write_text(SAMPLE)
    (tmp_path / "broken.md").write_text(BROKEN)
    records = load_recipes(tmp_path)
    assert [r["source_file"] for r in records] == ["good.md"]
