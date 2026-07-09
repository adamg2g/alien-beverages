import { expect, it } from "vitest";
import { buildApp } from "../src/app.js";

it("health returns ok", async () => {
  const app = buildApp();
  const res = await app.inject({ method: "GET", url: "/health" });
  expect(res.statusCode).toBe(200);
  expect(res.json()).toEqual({ status: "ok" });
});

it("recommendations accepts a need", async () => {
  const app = buildApp();
  const res = await app.inject({
    method: "POST",
    url: "/recommendations",
    payload: { need: "something smoky, not too strong" },
  });
  expect(res.statusCode).toBe(200);
  expect(Array.isArray(res.json())).toBe(true);
});
