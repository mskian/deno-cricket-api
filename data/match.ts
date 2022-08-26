import { cheerio } from "https://deno.land/x/denocheerio@1.0.0/mod.ts";
import { getAgent } from "./randomagent.ts";

type scoreData = {
  title: string;
  update: string;
  current: string;
  batsman: string;
  batsmanrun: string;
  ballsfaced: string;
  fours: string;
  sixes: string;
  sr: string;
  batsmantwo: string;
  batsmantworun: string;
  batsmantwoballsfaced: string;
  batsmantwofours: string;
  batsmantwosixes: string;
  batsmantwosr: string;
  bowler: string;
  bowlerover: string;
  bowlerruns: string;
  bowlerwickets: string;
  bowlermaiden: string;
  bowlertwo: string;
  bowletworover: string;
  bowlertworuns: string;
  bowlertwowickets: string;
  bowlertwomaiden: string;
  partnership: string;
  recentballs: string;
  lastwicket: string;
  runrate: string;
  commentary: string;
};

export async function dailyMatch(matchId: number) {
  return await fetch(
    `https://m.cricbuzz.com/live-cricket-scores/${matchId}/`,
    {
      headers: new Headers({
        "User-agent": getAgent(),
      }),
    },
  )
    .then((result) => result.text())
    .then((html) => {
      const $ = cheerio.load(html);
      const title = $("h4.ui-header").text();
      const update = $("div.cbz-ui-status").text();
      const currentscore = $("span.ui-bat-team-scores").text();
      const batsman = $("span.bat-bowl-miniscore").eq(0).text();
      const batsmanrun = $('td[class="cbz-grid-table-fix "]').eq(6).text();
      const ballsfaced = $('span[style="font-weight:normal"]').eq(0).text();
      const fours = $('td[class="cbz-grid-table-fix "]').eq(7).text();
      const sixes = $('td[class="cbz-grid-table-fix "]').eq(8).text();
      const sr = $('td[class="cbz-grid-table-fix "]').eq(9).text();
      const batsmantwo = $('td[class="cbz-grid-table-fix "]').eq(10).text();
      const batsmantworun = $('td[class="cbz-grid-table-fix "]').eq(11).text();
      const batsmantwoballsfaced = $('span[style="font-weight:normal"]').eq(1)
        .text();
      const batsmantwofours = $('td[class="cbz-grid-table-fix "]').eq(12)
        .text();
      const batsmantwosixes = $('td[class="cbz-grid-table-fix "]').eq(16)
        .text();
      const batsmantwosr = $('td[class="cbz-grid-table-fix "]').eq(14).text();
      const bowler = $("span.bat-bowl-miniscore").eq(2).text();
      const bowlerover = $('td[class="cbz-grid-table-fix "]').eq(21).text();
      const bowlerruns = $('td[class="cbz-grid-table-fix "]').eq(23).text();
      const bowlerwickets = $('td[class="cbz-grid-table-fix "]').eq(24).text();
      const bowlermaiden = $('td[class="cbz-grid-table-fix "]').eq(22).text();
      const bowlertwo = $("span.bat-bowl-miniscore").eq(3).text();
      const bowletworover = $('td[class="cbz-grid-table-fix "]').eq(26).text();
      const bowlertworuns = $('td[class="cbz-grid-table-fix "]').eq(28).text();
      const bowlertwowickets = $('td[class="cbz-grid-table-fix "]').eq(29)
        .text();
      const bowlertwomaiden = $('td[class="cbz-grid-table-fix "]').eq(27)
        .text();
      const partnership = $("span[style='color:#333']").eq(0).text();
      const recentballs = $("span[style='color:#333']").eq(2).text();
      const lastwicket = $("span[style='color:#333']").eq(1).text();
      const runrate = $("span[class='crr']").eq(0).text();
      const commentary = $("p[class='commtext']").text();
      const livescore = ({
        title: title || "Data Not Found",
        update: update || "Data Not Found",
        current: currentscore || "Data Not Found",
        batsman: batsman || "Data Not Found",
        batsmanrun: batsmanrun || "Data Not Found",
        ballsfaced: ballsfaced || "Data Not Found",
        fours: fours || "Data Not Found",
        sixes: sixes || "Data Not Found",
        sr: sr || "Data Not Found",
        batsmantwo: batsmantwo || "Data Not Found",
        batsmantworun: batsmantworun || "Data Not Found",
        batsmantwoballsfaced: batsmantwoballsfaced || "Data Not Found",
        batsmantwofours: batsmantwofours || "Data Not Found",
        batsmantwosixes: batsmantwosixes || "Data Not Found",
        batsmantwosr: batsmantwosr || "Data Not Found",
        bowler: bowler || "Data Not Found",
        bowlerover: bowlerover || "Data Not Found",
        bowlerruns: bowlerruns || "Data Not Found",
        bowlerwickets: bowlerwickets || "Data Not Found",
        bowlermaiden: bowlermaiden || "Data Not Found",
        bowlertwo: bowlertwo || "Data Not Found",
        bowletworover: bowletworover || "Data Not Found",
        bowlertworuns: bowlertworuns || "Data Not Found",
        bowlertwowickets: bowlertwowickets || "Data Not Found",
        bowlertwomaiden: bowlertwomaiden || "Data Not Found",
        partnership: partnership || "Data Not Found",
        recentballs: recentballs || "Data Not Found",
        lastwicket: lastwicket || "Data Not Found",
        runrate: runrate || "Data Not Found",
        commentary: commentary || "Data Not Found",
      });
      const score: scoreData = livescore;
      return score;
    }).catch((error) => {
      console.log(error);
    });
}
