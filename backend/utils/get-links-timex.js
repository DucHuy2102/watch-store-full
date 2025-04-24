import puppeteer from 'puppeteer';
import fs from 'fs';

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://timex.com/collections/kids-watches', {
        waitUntil: 'networkidle2',
    });

    const urls = await page.evaluate(() => {
        const scriptTag = Array.from(
            document.querySelectorAll('script[type="application/ld+json"]')
        ).find((tag) => tag.innerText.includes('"@type": "ItemList"'));
        if (!scriptTag) return [];

        const json = JSON.parse(scriptTag.innerText);
        return json.itemListElement.map((item) => `'https://timex.com${item.url}',`);
    });

    fs.writeFileSync('timex-urls.txt', urls.join('\n'));
    console.log(`\nSaved ${urls.length} links to timex-urls.txt`);

    await browser.close();
})();
