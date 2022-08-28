import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import { ErrorHandle, getScore, homePage, matchScore } from "./controller.ts";

const router = new Router();

const allowedOrigins = [
  "http://localhost:8080",
  "https://localhost:3000",
  "https://score.sanweb.info",
  "https://sanweb.info/",
];

function CorsHeader() {
  return oakCors({
    origin: allowedOrigins,
    optionsSuccessStatus: 200,
  });
}

router.get("/", CorsHeader(), homePage)
  .get("/live", CorsHeader(), getScore)
  .get("/match/:id", CorsHeader(), matchScore)
  .get("/(.*)", CorsHeader(), ErrorHandle);

const app = new Application();
app.use(router.routes());

export default router;
