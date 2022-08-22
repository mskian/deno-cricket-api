# Deno Cricket API

[![Test Lint](https://github.com/mskian/deno-cricket-api/actions/workflows/test.yml/badge.svg)](https://github.com/mskian/deno-cricket-api/actions/workflows/test.yml)
![Deno](https://img.shields.io/badge/Deno-464647?style=for-the-badge&logo=deno&logoColor=white)

Live Cricket Score JSON API - Build using Deno 🦕  

## Prerequisites

- Deno on your System <https://deno.land/#installation>
- Denon for Development Server and Live Changes -
  <https://github.com/denosaurs/denon>

## Methods Used

- oak middleware framework for Deno's native HTTP server -
  <https://github.com/oakserver/oak>
- cheerio for data Scrape - <https://github.com/mskian/deno-cheerio-js>
- Cors - <https://github.com/tajpouria/cors>
- API rate limit - <https://github.com/AdityaTD/oak-rate-limit>

## Testing

- Development

```sh
denon run --allow-net --allow-read server.ts

or

deno task dev
```

- Production

```sh
deno run --allow-net --allow-read server.ts

or

deno task start
```

## API URL

- Live Match - `http://localhost:3000/live`
- Get Match Score by ID - `http://localhost:3000/match/<MatchID>`
- Update live Match URL in `/data/config.json`

## Todo

- [ ] Random User Agent
- [ ] API Caching

## For More about Live Score API

- Free Live Cricket Score API - <https://github.com/mskian/cricket-api>

## Contributing

Your PR's are Welcome

## Disclaimer

- This is not an Offical API from Cricbuzz - it's an Unofficial API
- This is for Education Purpose only - use at your own risk on Production Site

## LICENSE

MIT
