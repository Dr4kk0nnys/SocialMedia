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

    const evaluation = await page.$$('a > div > div > div[role=heading]');
    
    evaluation.map(async result => {
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
    descriptionEvaluation.map(async (result: any, index: number) => index < data.length ? data[index].description = await result.evaluate((element: any) => element.textContent) : '');

    /* Loading all the images ( on yt, the images load when the user comes close to it. ) */
    await page.waitForTimeout(1000);

    for (let i = 0; i < 3; i++) {
        await page.keyboard.press('PageDown');
        await page.keyboard.press('PageDown');
        await page.keyboard.press('PageDown');

        await page.waitForTimeout(1000);
    }
    await page.waitForTimeout(1000);

    const imageEvaluation = await page.$$('a[id=thumbnail] > yt-img-shadow > img[id=img]');
    imageEvaluation.map(async (result: any, index: number) => index < data.length ? data[index].image = await result.evaluate((element: any) => element.src) : '');

    await browser.close();
    return data;
}

const searchTwitterPeople = async (searchQuery: string) => {
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
    await page.goto('https://twitter.com/search?q=' + searchQuery + '&src=typed_query&f=user', { waitUntil: 'networkidle2' });
    await page.waitForSelector('a > div > div > div > span > span');
    
    await page.screenshot({ path: 'screenshot.png' });

    const titleAndLinkEvaluation = await page.$$('a > div > div > div > span > span');
    titleAndLinkEvaluation.map(async (result, index) => {
        if (index <= 10) return;

        const { title, link } = await result.evaluate(element => {
            return {
                title: element.textContent,
                link: element.parentElement.parentElement.parentElement.parentElement.parentElement.href
            }
        });

        if (scraperCheck({ title, link, description: 'description', image: 'image' })) data.push({ title, link, description: 'description', image: 'image' });
    });

    const descriptionEvaluation = await page.$$('div[role=button] > div > div > div[dir=auto]');
    descriptionEvaluation.map(async (result, index) => index < data.length ? data[index].description = await result.evaluate(element => element.textContent) || 'No description available' : '');

    const imageEvaluation = await page.$$('a > div > div > div > img');
    imageEvaluation.map(async (result, index) => index < data.length ? data[index].image = await result.evaluate(element => element.src) || 'image' : '');

    await browser.close();
    return data;
}

const searchTwitterTopics = async (searchQuery: string) => {
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
    await page.goto('https://twitter.com/search?q=' + searchQuery + '&src=typed_query', { waitUntil: 'networkidle2' });
    await page.waitForSelector('div[lang=en]');

    await page.screenshot({ path: 'screenshot.png' });

    const titleAndLinkEvaluation = await page.$$('div[data-testid=tweet]');
    titleAndLinkEvaluation.map(async result => {

        const { title, link, image } = await result.evaluate(element => {
            const upperPart = element.lastElementChild.firstElementChild.firstElementChild.firstElementChild.firstElementChild;
            return {
                title: upperPart.firstElementChild.textContent.replace('@', ' @'),
                link: upperPart.firstElementChild.nextElementSibling.nextElementSibling.href,
                description: 'description',
                image: 'image' // Twitter posts won't have image attribution
            }
        })

        if (scraperCheck({ title, link, description: 'description', image })) data.push({ title, link, description: 'description', image });
    });

    /* Descriptions evaluation */
    (await page.$$('div[lang=en]')).map(async (result, index) => index < data.length ? data[index].description = await result.evaluate(element => element.textContent) : '');

    await browser.close();
    return data;
}

const searchReddit = async (searchQuery: string) => {
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
    await page.goto('https://www.reddit.com/search/?q=' + searchQuery + '&t=week&sort=hot', { waitUntil: 'networkidle2' });

    await page.screenshot({ path: 'screenshot.png' });

    const titleLinkAndDescriptionEvaluation = await page.$$('a[data-click-id="body"]');
    titleLinkAndDescriptionEvaluation.map(async result => {
        const { title, link, description, image } = await result.evaluate(element => {
            return {
                title: element.textContent,
                link: element.href,
                description: '/r/' + element.href.split('/')[4],
                image: 'image'
            }
        });

        if (scraperCheck({ title, link, description, image })) data.push({ title, link, description, image });
    });

    const imageEvaluation = await page.$$('div[data-click-id=image]');
    imageEvaluation.map(async (result, index) => {
        if (index < data.length) data[index].image = await result.evaluate(element => element.style.backgroundImage.replace(/[\"\(\)]/g, '').slice(3));
    });

    /* This is very unusual, but sometimes there is a lot of shit from 'r/Udemy', cleaning it. */
    data.map((element, index) => element.description.includes('Udemy') ? data.splice(index, 1) : '');

    await browser.close();

    return data;
}

const searchAmazon = async (searchQuery: string) => {
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
    await page.goto('https://www.amazon.com/s?k=' + searchQuery, { waitUntil: 'networkidle2' });

    await page.screenshot({ path: 'screenshot.png' });

    const evaluation = await page.$$('div > h2 > a > span');
    evaluation.map(async (result, index) => {
        if (index > 20) return;
        const { title, link, description, image } = await result.evaluate(element => {
            return {
                title: element.textContent,
                link: element.parentElement.href,
                description: element.parentElement.parentElement.parentElement.nextElementSibling.nextElementSibling.lastElementChild.textContent.split('$')[1],
                image: 'image'
            }
        });

        if (scraperCheck({ title, link, description, image })) data.push({ title, link, description: '$ ' + description, image });
    });

    await browser.close();
    return data;
}

export { searchGoogle, searchYoutube, searchTwitterPeople, searchTwitterTopics, searchReddit, searchAmazon };