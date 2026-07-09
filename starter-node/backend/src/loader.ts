// Intentionally naive — extend as needed.
// Loads recipe cards from markdown files with YAML frontmatter.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type RecipeRecord = Record<string, unknown> & {
  body: string;
  source_file: string;
};

/**
 * Read every .md file in `dir` into a record.
 *
 * Each record contains the parsed frontmatter keys, plus:
 *   - body: the raw markdown body below the frontmatter, as one string
 *   - source_file: the name of the file it came from
 *
 * Files that fail to parse are skipped with a logged warning.
 */
export function loadRecipes(dir: string): RecipeRecord[] {
  const records: RecipeRecord[] = [];

  let files: string[];
  try {
    files = fs
      .readdirSync(dir)
      .filter((f) => f.endsWith(".md"))
      .sort();
  } catch {
    console.warn(`Recipes directory not found: ${dir}`);
    return records;
  }

  for (const file of files) {
    const fullPath = path.join(dir, file);
    try {
      const raw = fs.readFileSync(fullPath, "utf8");
      const parsed = matter(raw);
      records.push({ ...parsed.data, body: parsed.content, source_file: file });
    } catch (err) {
      console.warn(`Skipping ${fullPath}: failed to parse`, err);
    }
  }

  return records;
}
