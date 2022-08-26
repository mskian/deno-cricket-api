import { livescore } from "../data/score.ts";
import { dailyMatch } from "../data/match.ts";
import { errorData } from "../data/error.ts";

// deno-lint-ignore no-explicit-any
const homePage = ({ response }: { response: any }) => {
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With",
  );
  response.headers.set("Access-Control-Allow-Methods", "GET");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Strict-Transport-Security", "max-age=63072000");
  response.body = { "message": "Cricket API" };
};

// deno-lint-ignore no-explicit-any
const getScore = async ({ response }: { response: any }) => {
  const ms = Date.now();
  response.status = 200;
  response.headers.set("X-Response-Time", `${ms}ms`);
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With",
  );
  response.headers.set("Access-Control-Allow-Methods", "GET");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Strict-Transport-Security", "max-age=63072000");
  response.body = await livescore();
};

const matchScore = async (
  // deno-lint-ignore no-explicit-any
  { params, response }: { params: { id: number }; response: any },
) => {
  const currentMatch = params.id;
  const ms = Date.now();
  response.status = 200;
  response.headers.set("X-Response-Time", `${ms}ms`);
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With",
  );
  response.headers.set("Access-Control-Allow-Methods", "GET");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Strict-Transport-Security", "max-age=63072000");
  response.body = await dailyMatch(currentMatch);
};

// deno-lint-ignore no-explicit-any
const ErrorHandle = ({ response }: { response: any }) => {
  response.status = 404;
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With",
  );
  response.headers.set("Access-Control-Allow-Methods", "GET");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Strict-Transport-Security", "max-age=63072000");
  response.body = errorData;
};

export { ErrorHandle, getScore, homePage, matchScore };
