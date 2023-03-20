import {
  Application,
  isHttpError,
} from "https://deno.land/x/oak@v12.1.0/mod.ts";
import router from "./lib/router.ts";
import { errorData } from "./data/error.ts";
import { RateLimiter } from "https://deno.land/x/oak_rate_limit@v0.1.1/mod.ts";

const HOST = "localhost";
const PORT = 3000;

const rateLimit = RateLimiter({
  windowMs: 1 * 60 * 1000,
  max: 45,
  headers: true,
  message:
    `{"title":"Too many requests, please try again later after 60 seconds.","update":"Data Not Found","current":"Too many requests, please try again later.","batsman":"Data Not Found","batsmanrun":"Data Not Found","ballsfaced":"Data Not Found","fours":"Data Not Found","sixes":"Data Not Found","sr":"Data Not Found","batsmantwo":"Data Not Found","batsmantworun":"Data Not Found","batsmantwoballsfaced":"Data Not Found","batsmantwofours":"Data Not Found","batsmantwosixes":"Data Not Found","batsmantwosr":"Data Not Found","bowler":"Data Not Found","bowlerover":"Data Not Found","bowlerruns":"Data Not Found","bowlerwickets":"Data Not Found","bowlermaiden":"Data Not Found","bowlertwo":"Data Not Found","bowletworover":"Data Not Found","bowlertworuns":"Data Not Found","bowlertwowickets":"Data Not Found","bowlertwomaiden":"Data Not Found","partnership":"Data Not Found","recentballs":"Data Not Found","lastwicket":"Data Not Found","runrate":"Data Not Found","commentary":"Data Not Found"}`,
  statusCode: 429,
});

const app = new Application();

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (isHttpError(err)) {
      switch (err.status) {
        case 404:
          ctx.response.status = 404;
          ctx.response.body = errorData;
          break;
        default:
          ctx.response.status = 400;
          ctx.response.body = errorData;
      }
    } else {
      ctx.response.status = 500;
      ctx.response.body = errorData;
    }
  }
});

app.use(await rateLimit);
app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Listening on port ${PORT} ...`);
await app.listen(`${HOST}:${PORT}`);
