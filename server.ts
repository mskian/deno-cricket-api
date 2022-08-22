import {
  Application,
  isHttpError,
} from "https://deno.land/x/oak@v11.0.0/mod.ts";
import router from "./lib/router.ts";
import { errorData } from "./data/error.ts";

const HOST = "localhost";
const PORT = 3000;

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

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Listening on port ${PORT} ...`);
await app.listen(`${HOST}:${PORT}`);
