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

    /* Evaluate all titles, mapping one by one. Getting the link afterwards. */
    (await page.$$('a > yt-formatted-string')).map(async result => {

        /* If it has an id, it's not the element we're looking for. */
        if (result.evaluate(element => element.id ? false : element.textContent)) {
            const evaluation = await result.evaluate(element => element.textContent + '\n' + element.parentElement.href);

            const [ title, link ] = evaluation.split('\n');

            /* Avoid empty links / titles. */
            if (!title || !link) return;

            data.links.push(link);
            data.titles.push(title);
            data.descriptions.push('No description available.')
        }
    });

    await browser.close();

    return data;
}

const searchTwitterPeople = async (searchQuery: string) => {
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
    await page.goto('https://twitter.com/search?q=' + searchQuery + '&src=typed_query&f=user', { waitUntil: 'networkidle2' });
    await page.waitForSelector('main[role=main]');

    /* Evaluate all titles, mapping one by one. Getting the link afterwards. */
    (await page.$$('a > div > div > div > span > span')).map(async result => {

        const evaluation = await result.evaluate(element => element.textContent + '\n' + element.parentElement.parentElement.parentElement.parentElement.parentElement.href);

        const [ title, link ] = evaluation.split('\n');

        /* Avoid empty links / titles. */
        if (!title || !link) return;

        data.links.push(link);
        data.titles.push(title);
        data.descriptions.push('Twitter profile.');
    });

    await browser.close();

    return data;
}

const searchTwitterTopics = async (searchQuery: string) => {
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
    await page.goto('https://twitter.com/search?q=' + searchQuery + '&src=typed_query', { waitUntil: 'networkidle2' });
    await page.waitForSelector('main[role=main]');

    /* Evaluate all titles, mapping one by one. Getting the link afterwards. */
    (await page.$$('div[data-testid="tweet"] > div > div div[lang=en] > span')).map(async (result, index) => {

        /**
            * We want to iterate over even amounts of tweets, since the next span ( the odd one )
            would be a bold text with the search query
        **/
        if (index % 2 !== 0) return;

        /* If it starts with '#', it's not a text worth showing. */
        if (result.evaluate(element => element.textContent.startsWith('#') ? false : element.textContent)) {
            const title = await result.evaluate(element => element.textContent);

            if (!title) return;

            data.titles.push(title);
            data.links.push('https://twitter.com/search?q=' + searchQuery + '&src=typed_query');
            data.descriptions.push('Twitter topic.');
        }
    });

    await browser.close();

    return data;
}

export { searchGoogle, searchYoutube, searchTwitterPeople, searchTwitterTopics };