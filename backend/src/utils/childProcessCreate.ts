import { writeFileSync } from 'fs';

import { searchGoogle, searchYoutube, searchTwitterPeople, searchTwitterTopics, searchReddit, searchAmazon } from '../utils/scraper';

const executeLogic = async () => {
    const categoryName = process.argv[2];

    const staticFolder = __dirname.replace('dist', 'src').replace('utils', 'static/');
    const jsonFile = staticFolder + `${categoryName}.json`;

    const googleSearch = await searchGoogle(categoryName);
    const youtubeSearch = await searchYoutube(categoryName);
    const podcastSearch = await searchGoogle(categoryName + ' podcast');
    const twitterSearchPeople = await searchTwitterPeople(categoryName);
    const twitterSearchTopics = await searchTwitterTopics(categoryName);
    const redditSearch = await searchReddit(categoryName);
    const amazonSearch = await searchAmazon(categoryName);

    const arr = [...googleSearch, ...youtubeSearch, ...podcastSearch, ...twitterSearchPeople, ...twitterSearchTopics, ...redditSearch, ...amazonSearch];

    const result = {
        time: new Date(),
        titles: arr.map(element => element.title.replace('\n', '')),
        links: arr.map(element => element.link),
        descriptions: arr.map(element => element.description),
        images: arr.map(element => element.image)
    }

    writeFileSync(jsonFile, JSON.stringify(result));
}

executeLogic();