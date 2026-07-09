import Fastify from "fastify";
import { loadRecipes, type RecipeRecord } from "./loader.js";

declare module "fastify" {
  interface FastifyInstance {
    recipes: RecipeRecord[];
  }
}

export function buildApp() {
  const app = Fastify({ logger: true });

  const recipesDir = process.env.RECIPES_DIR ?? "data/recipes";
  app.decorate("recipes", loadRecipes(recipesDir));
  app.log.info(`Loaded ${app.recipes.length} recipe(s) from ${recipesDir}`);

  app.get("/health", async () => ({ status: "ok" }));

  app.post(
    "/recommendations",
    {
      schema: {
        body: {
          type: "object",
          required: ["need"],
          properties: { need: { type: "string" } },
        },
      },
    },
    async () => {
      // TODO: implement matching
      return [];
    },
  );

  return app;
}
