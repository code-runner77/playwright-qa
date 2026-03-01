import { chromium } from "playwright";

const seeds = [22,23,24,25,26,27,28,29,30,31];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  let total = 0;

  for (const seed of seeds) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
    console.log(`\n=== Visiting Seed ${seed} ===`);

    await page.goto(url, { waitUntil: "networkidle" });
    await page.waitForTimeout(2000); // wait for JS to render table

    const allText = await page.evaluate(() => document.body.innerText);
    const matches = allText.match(/-?\d[\d,.]*/g) || [];
    const numbers = matches.map(txt => parseFloat(txt.replace(/,/g, ""))).filter(n => !isNaN(n));

    if (numbers.length === 0) {
      console.log(`Seed ${seed}: no numeric values found`);
      continue;
    }

    const sum = numbers.reduce((a,b) => a+b, 0);
    console.log(`Seed ${seed} sum =`, sum);
    total += sum;
  }

  console.log("\nFINAL TOTAL =", total);
  await browser.close();
})();