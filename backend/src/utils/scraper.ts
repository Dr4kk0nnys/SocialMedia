import puppeteer  from 'puppeteer';

import IScraperData from '../interfaces/ScraperData';

import { scraperCheck } from './scraperUtils';

const searchGoogle = async (searchQuery: string) => {

    /* TODO: Page 2 things as well */

    const data: IScraperData[] = [];

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
    await page.waitForSelector('a > div > div > div[role=heading]');

    // await page.screenshot({ path: 'screenshot.png' });

    /* Evaluate all titles, mapping one by one. Getting the rest of the data afterwards. */
    (await page.$$('a > div > div > div[role=heading]')).map(async result => {
        const { title, link, description, image } = await result.evaluate(element => {
            return {
                title: element.textContent,
                link: element.parentElement.parentElement.parentElement.href,
                description: element.nextElementSibling.firstChild.textContent,
                image: element.parentElement.parentElement.firstElementChild.firstElementChild.firstElementChild.firstElementChild.firstElementChild.firstElementChild.getAttribute('src')
            }
        });

        /* Returns true if successfully checked all elements, false otherwise. */
        if (scraperCheck({ title, link, description, image })) data.push({ title, link, description, image });
    });

    await browser.close();
    return data;
};

const searchYoutube = async (searchQuery: string) => {
    const data: IScraperData[] = [];

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
    const page: any = await browser.newPage();
    await page.goto('https://www.youtube.com/results?search_query=' + searchQuery + '&sp=CAASBAgEEAE%253D', { waitUntil: 'networkidle2' });
    await page.waitForSelector('a > yt-formatted-string');

    await page.screenshot({ path: 'screenshot.png' });

    /* Evaluate all titles, mapping one by one. Getting the link afterwards. */
    const titleAndLinkEvaluation = await page.$$('a > yt-formatted-string');
    titleAndLinkEvaluation.map(async (result: any) => {
        const { title, link, description, image } = await result.evaluate((element: any) => {
            return {
                title: element.textContent,
                link: element.parentElement.href,
                description: 'description',
                image: 'image'
            }
        });
        
        if (scraperCheck({ title, link, description: 'description', image })) data.push({ title, link, description, image });
    });
    
    const descriptionEvaluation = await page.$$('yt-formatted-string[id="description-text"]');
    descriptionEvaluation.map(async (result: any, index: number) => {
        if (index < data.length) data[index].description = await result.evaluate((element: any) => element.textContent);
    });
    await page.waitForTimeout(1000);

    for (let i = 0; i < 3; i++) {
        await page.keyboard.press('PageDown');
        await page.keyboard.press('PageDown');
        await page.keyboard.press('PageDown');

        await page.waitForTimeout(1000);
    }
    await page.waitForTimeout(1000);

    const imageEvaluation = await page.$$('a[id=thumbnail] > yt-img-shadow > img[id=img]')
    imageEvaluation.map(async (result: any, index: number) => {
        if (index < data.length) data[index].image = await result.evaluate((element: any) => element.src);
    });

    await browser.close();

    return data;
}

const searchTwitterPeople = async (searchQuery: string) => {
    const data: IScraperData[] = [{ title: '', link: '', description: '', image: '' }];

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
    
            // data.links.push(link);
            // data.titles.push(title);
        };
    });

    (await page.$$('div[role=button] > div > div > div[dir=auto]')).map(async (result) => {
        // data.descriptions.length < data.titles.length ? data.descriptions.push(await result.evaluate(element => element.textContent) || 'No description available') : '';
    });

    await browser.close();

    return data;
}

const searchTwitterTopics = async (searchQuery: string) => {
    const data: IScraperData[] = [{ title: '', link: '', description: '', image: '' }];

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

        // data.titles.push('Twitter Topic.')
        // data.links.push('https://twitter.com/search?q=' + searchQuery + '&src=typed_query');
        // data.descriptions.push(description || 'No description available');
    });

    await browser.close();

    return data;
}

const searchReddit = async (searchQuery: string) => {
    const data: IScraperData[] = [{ title: '', link: '', description: '', image: '' }];

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

        // data.titles.push(title);
        // data.links.push(link);
        // data.descriptions.push('/r/' + link.split('/')[4] || 'No description available.');
    });

    await browser.close();

    return data;
}

const searchAmazon = async (searchQuery: string) => {
    const data: IScraperData[] = [{ title: '', link: '', description: '', image: '' }];

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
    await page.goto('https://www.amazon.com/s?k=' + searchQuery, { waitUntil: 'networkidle2' });

    await page.screenshot({ path: 'screenshot.png' });

    /* Evaluate 15 titles, mapping one by one. Getting the link afterwards. */
    (await page.$$('div > h2 > a > span')).map(async (result, index) => {
        if (index <= 15) {
            const evaluation = await result.evaluate(element => element.textContent + '\n' + element.parentElement.href);
    
            const [ title, link ] = evaluation.split('\n');
    
            if (!title || !link) return;
    
            // data.titles.push(title);
            // data.links.push(link);
            // data.descriptions.push('Amazon store.');
        }
    });

    await browser.close();

    return data;
}

export { searchGoogle, searchYoutube, searchTwitterPeople, searchTwitterTopics, searchReddit, searchAmazon };