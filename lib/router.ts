import { Application, Router } from "https://deno.land/x/oak@v11.0.0/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import { RateLimiter } from "https://deno.land/x/oak_rate_limit@0.1.0-rc2/mod.ts";
import { ErrorHandle, getScore, homePage, matchScore } from "./controller.ts";

const router = new Router();

const allowedOrigins = [
  "http://localhost:8080",
  "https://localhost:3000",
  "https://score.sanweb.info",
  "https://sanweb.info/",
];

function rateLimit() {
  return RateLimiter({
    windowMs: 1 * 60 * 1000,
    max: 40,
    headers: true,
    message: "Too many requests, please try again later.",
    statusCode: 429,
  });
}

function CorsHeader() {
  return oakCors({
    origin: allowedOrigins,
    optionsSuccessStatus: 200,
  });
}

router.get("/", CorsHeader(), rateLimit(), homePage)
  .get("/live", CorsHeader(), rateLimit(), getScore)
  .get("/match/:id", CorsHeader(), rateLimit(), matchScore)
  .get("/(.*)", CorsHeader(), ErrorHandle);

const app = new Application();
app.use(router.routes());

export default router;
