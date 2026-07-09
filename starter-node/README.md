# Starter: spaceport bar exercise (Node/TypeScript)

Your interviewer will explain the task at the start of the session.

## Setup

Prerequisites: Docker with the compose plugin.

```bash
cp .env.example .env   # fill in LLM_API_KEY if/when you need it
make up                # or: docker compose up --build
```

- Backend (Fastify): http://localhost:8000
- Frontend (React/Vite): http://localhost:5173

The frontend is deliberately bare: a text box that POSTs to
`/recommendations` and dumps the raw JSON response. You shouldn't need to
touch it to see your results.

## Smoke test

```bash
curl http://localhost:8000/health
# → {"status":"ok"}
```

## Data & the loader

Recipe cards live in `data/recipes/` as markdown files with YAML
frontmatter — the house menu of a spaceport bar. The directory is empty for
now — you'll receive the dataset at the start of the exercise; drop the
files in and restart. `backend/src/loader.ts` reads them at startup;
they're available on the Fastify instance as `app.recipes`. Each record is
an object with:

- every key from the file's YAML frontmatter, parsed as-is
- `body` — the raw markdown body below the frontmatter, as a single string
  (the `##` sections are **not** parsed — that's up to you if you need them)
- `source_file` — the filename the record came from

The loader is intentionally naive: it handles well-formed files and skips
anything that fails to parse with a logged warning. Extend it as needed.

## Where to work

- `backend/src/matching.ts` — search/matching logic (empty, TODO)
- `backend/src/llm.ts` — LLM integration (empty, TODO)
- `backend/src/app.ts` — `POST /recommendations` currently returns `[]`

## Commands

```bash
make up     # build + run the full stack
make test   # run backend tests (vitest)
make lint   # eslint + tsc --noEmit
```

## Workflow

Please commit as you go — small, frequent commits with clear messages. We
want to see how you work, not just the end state.
