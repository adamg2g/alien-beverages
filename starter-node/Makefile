.PHONY: up test lint

up:
	docker compose up --build

test:
	docker compose run --rm --no-deps backend npm test

lint:
	docker compose run --rm --no-deps backend npm run lint
