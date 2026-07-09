import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { expect, it } from "vitest";
import { loadRecipes } from "../src/loader.js";

const SAMPLE = `---
name: Test Pour
ingredients: dockgrain spirit, glowcap nectar
flavor_profile: sweet, warming
---

## Description

A test drink.
`;

const BROKEN = `---
name: "Unclosed
---

body
`;

it("loads well-formed recipe files", () => {
  const dir = mkdtempSync(join(tmpdir(), "recipes-"));
  writeFileSync(join(dir, "test-pour.md"), SAMPLE);

  const records = loadRecipes(dir);

  expect(records).toHaveLength(1);
  expect(records[0].name).toBe("Test Pour");
  expect(records[0].ingredients).toBe("dockgrain spirit, glowcap nectar");
  expect(records[0].source_file).toBe("test-pour.md");
  expect(records[0].body).toContain("## Description");
});

it("skips unparseable files without crashing", () => {
  const dir = mkdtempSync(join(tmpdir(), "recipes-"));
  writeFileSync(join(dir, "good.md"), SAMPLE);
  writeFileSync(join(dir, "broken.md"), BROKEN);

  const records = loadRecipes(dir);

  expect(records.map((r) => r.source_file)).toEqual(["good.md"]);
});
