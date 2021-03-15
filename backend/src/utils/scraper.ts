import puppeteer  from 'puppeteer';

import IScraperData from '../interfaces/ScraperData';

const searchGoogle = async (searchQuery: string) => {

    /* TODO: Page 2 things as well */

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
    await page.goto('https://google.com/search?q=' + searchQuery + '&tbm=nws', { waitUntil: 'networkidle2' });
    await page.waitForSelector('div[id=rso]');

    await page.screenshot({ path: 'screenshot.png' });

    /* Evaluate all titles, mapping one by one. Getting the link afterwards. */
    (await page.$$('a > div > div > div[role=heading]')).map(async result => {
        const evaluation = await result.evaluate(element => 
            element.textContent + '\n' + element.parentElement.parentElement.parentElement.href + '\n' + (element.nextElementSibling.firstChild.textContent).replace('\n', ' ')
        );
        const [ title, link, descriptions ] = evaluation.split('\n');

        if (title && link && link !== 'undefined' && link.startsWith('https://')) data.titles.push(title) && data.links.push(link) && data.descriptions.push(descriptions);
    });

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
    await page.goto('https://www.youtube.com/results?search_query=' + searchQuery + '&sp=CAASBAgEEAE%253D', { waitUntil: 'networkidle2' });
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
        }
    });

    (await page.$$('yt-formatted-string[id="description-text"]')).map(async result => {
        const description = await result.evaluate(element => element.textContent);
        data.descriptions.push(description);
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
    (await page.$$('a > div > div > div > span > span')).map(async (result, index) => {
        if (index <= 10) {
            const evaluation = await result.evaluate(element => element.textContent + '\n' + element.parentElement.parentElement.parentElement.parentElement.parentElement.href);
    
            const [ title, link ] = evaluation.split('\n');
    
            /* Avoid empty links / titles. */
            if (!title || !link) return;
    
            data.links.push(link);
            data.titles.push(title);
        };
    });

    (await page.$$('div[role=button] > div > div > div[dir=auto]')).map(async (result) => {
        const description = await result.evaluate(element => element.textContent);
        
        data.descriptions.push(description);
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
    await page.waitForSelector('div[lang=en]');

    await page.screenshot({ path: 'screenshot.png' });

    (await page.$$('div[lang=en]')).map(async result => {

        const description = await result.evaluate(element => element.textContent);

        data.titles.push('Twitter Topic.')
        data.links.push('https://twitter.com/search?q=' + searchQuery + '&src=typed_query');
        data.descriptions.push(description);
    });

    await browser.close();

    return data;
}

const searchReddit = async (searchQuery: string) => {
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
    await page.goto('https://www.reddit.com/search/?q=' + searchQuery + '&t=week&sort=hot', { waitUntil: 'networkidle2' });

    await page.screenshot({ path: 'screenshot.png' });

    /* Evaluate all titles, mapping one by one. Getting the link afterwards. */
    (await page.$$('a[data-click-id="body"]')).map(async result => {
        const evaluation = await result.evaluate(element => element.textContent + '\n' + element.href);

        const [ title, link ] = evaluation.split('\n');

        if (!title || !link) return;

        data.titles.push(title);
        data.links.push(link);
        data.descriptions.push('/r/' + link.split('/')[4]);
    });

    await browser.close();

    return data;
}

const searchAmazon = async (searchQuery: string) => {
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
    await page.goto('https://www.amazon.com.br/s?k=' + searchQuery, { waitUntil: 'networkidle2' });

    await page.screenshot({ path: 'screenshot.png' });

    /* Evaluate all titles, mapping one by one. Getting the link afterwards. */
    (await page.$$('div > h2 > a > span')).map(async result => {
        const evaluation = await result.evaluate(element => element.textContent + '\n' + element.parentElement.href);

        const [ title, link ] = evaluation.split('\n');

        if (!title || !link) return;

        data.titles.push(title);
        data.links.push(link);
        data.descriptions.push('Amazon store.');
    });

    await browser.close();

    return data;
}

export { searchGoogle, searchYoutube, searchTwitterPeople, searchTwitterTopics, searchReddit, searchAmazon };