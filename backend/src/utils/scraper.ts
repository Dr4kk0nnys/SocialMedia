import puppeteer  from 'puppeteer';

import IScraperData from '../interfaces/ScraperData';

const searchGoogle = async (searchQuery: string) => {

    /**
        * TODO: Page 2 things as well
    **/

    const data: IScraperData = { titles: [], links: [], descriptions: [] }

    const browser = await puppeteer.launch({
        args: [
            '--disable-gpu',
            '--disable-dev-shm-usage',
            '--disable-setuid-sandbox',
            '--no-first-run',
            '--no-sandbox',
            '--no-zygote',
            '--single-process',
        ]
    });
    const page = await browser.newPage();
    await page.goto('https://google.com/search?q=' + searchQuery, { waitUntil: 'networkidle2' });
    await page.waitForSelector('div[id=search]');

    /* Evaluate all titles, mapping one by one. Getting the link afterwards. */
    (await page.$$('h3 > span')).map(async result => {
        const evaluation = await result.evaluate(element => element.textContent + '\n' + element.parentElement.parentElement.href);
        const [ title, link ] = evaluation.split('\n');

        if (title && link && link !== 'undefined') data.titles.push(title) && data.links.push(link);
    });

    const descriptions = await page.$$('div > div > span > span');
    descriptions.map(async description => {
        const evaluation = await description.evaluate(element => element.textContent);

        /* Avoid getting more items than necessary. */
        if (data.descriptions.length < data.titles.length) data.descriptions.push(evaluation);
    })

    await browser.close();
    return data;
};

const searchYoutube = async (searchQuery: string) => {
    const data: IScraperData = { titles: [], links: [], descriptions: [] }
    
    const browser = await puppeteer.launch({
        args: [
            '--disable-gpu',
            '--disable-dev-shm-usage',
            '--disable-setuid-sandbox',
            '--no-first-run',
            '--no-sandbox',
            '--no-zygote',
            '--single-process',
        ]
    });
    const page = await browser.newPage();
    await page.goto('https://www.youtube.com/results?search_query=' + searchQuery, { waitUntil: 'networkidle2' });
    await page.waitForSelector('div[id=container]');

    await page.screenshot({ path: 'screenshot.png' });

    /* Evaluate all titles, mapping one by one. Getting the link afterwards. */
    (await page.$$('a > yt-formatted-string')).map(async result => {

        if (result.evaluate(element => element.id ? false : element.textContent)) {
            const title = await result.evaluate(element => element.textContent);

            if (title) data.titles.push(title);
        } else {
            if (data.links.length < data.titles.length) return;
            if (await result.evaluate(element => element.href ? element.href : false)) return;

            const link = await result.evaluate(element => element.href);

            if (link) data.links.push(link);
        }

        console.log(data);
    });

    await browser.close();

    return data;
}

export { searchGoogle, searchYoutube };