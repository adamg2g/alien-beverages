.PHONY: up test lint

up:
	docker compose up --build

test:
	docker compose run --rm --no-deps backend pytest

lint:
	docker compose run --rm --no-deps backend ruff check .
