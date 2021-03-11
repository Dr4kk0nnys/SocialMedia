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

    const result = {
        time: new Date(),
        titles: [...googleSearch.titles, ...youtubeSearch.titles, ...podcastSearch.titles, ...twitterSearchPeople.titles, ...twitterSearchTopics.titles, ...redditSearch.titles, ...amazonSearch.titles],
        links: [...googleSearch.links, ...youtubeSearch.links, ...podcastSearch.links, ...twitterSearchPeople.links, ...twitterSearchTopics.links, ...redditSearch.links, ...amazonSearch.links],
        descriptions: [...googleSearch.descriptions, ...youtubeSearch.descriptions, ...podcastSearch.descriptions, ...twitterSearchPeople.descriptions, ...twitterSearchTopics.descriptions, ...redditSearch.descriptions, ...amazonSearch.descriptions]
    }
    writeFileSync(jsonFile, JSON.stringify(result));
}

executeLogic();