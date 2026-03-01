import { chromium } from "playwright";

const seeds = [22,23,24,25,26,27,28,29,30,31];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  let total = 0;

  for (const seed of seeds) {
    const url = `https://tds-iitm.github.io/qa-reporting/seed-${seed}.html`;
    await page.goto(url);

    const numbers = await page.$$eval("table td", tds =>
      tds.map(td => parseFloat(td.innerText)).filter(n => !isNaN(n))
    );

    const sum = numbers.reduce((a,b)=>a+b,0);
    console.log(`Seed ${seed} sum =`, sum);
    total += sum;
  }

  console.log("FINAL TOTAL =", total);
  await browser.close();
})();
