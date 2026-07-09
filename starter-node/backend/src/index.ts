import { buildApp } from "./app.js";

const app = buildApp();

app.listen({ port: 8000, host: "0.0.0.0" }).catch((err) => {
  app.log.error(err);
  process.exit(1);
});
