import { Router } from 'express';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { exec } from 'child_process';

import { searchGoogle, searchYoutube, searchTwitterPeople, searchTwitterTopics, searchReddit, searchAmazon } from '../utils/scraper';

const router = Router();

router.get('/:categoryName', async (req, res) => {
    const { categoryName }: { categoryName?: string } = req.params;

    /**
        * Fetching data takes a lot of time. Hence the need to keep static files around.
        
        * It will see if is there any .json files with the search term.
            * If there is, it will check the time, and see if it's more than 2 hours old.
                * If it is, it will pass the old data to the frontend and fetch the new one, replacing the .json.
                * If it is not, it will just pass the data to the frontend.
            * If there's not, it will fetch the data and pass it to the frontend.
     **/
    const staticFolder = __dirname.replace('routes', 'static/');
    const jsonFile = staticFolder + `${categoryName}.json`;

    if (existsSync(staticFolder + `${categoryName}.json`)) {
        const data = JSON.parse(readFileSync(jsonFile, 'utf-8'));

        const savedTime = new Date(data.time);
        const currentTime = new Date();

        const difference = Math.abs(savedTime.getTime() - currentTime.getTime());
        const hourDifference = difference / 1000 / 3600;

        /**
            * Get time difference between the saved time and the current one.
            * If the difference is greater than 2 ( 2 hours ), the information is considered old.
            * Return the old information, and replace it with a new one.
        **/
        if (hourDifference <= 2) return res.json(data);

        /**
            * This has to be one of the smartest things I've ever done in my life.
            
            * This code will only be reached, if the data saved on the static folder is older than 2 hours.
            * If reached, it will execute a shell command and return the res.json with the old data.
            * The thing is that it won't wait for the shell command to finish. The shell command will execute
            the logic bellow this if statement ( googleSearch, youtubeSearch, etc ... ). And save it on the .json file.

            * What is great about this code is that the user receives the data normally, while the server refreshes the data, 
            when the next user requests the data, the user will receive new information. Both not waiting longer than 3 seconds.
        **/
        new Promise((resolve, reject) => exec('node ' + __dirname.replace('src', 'dist').replace('routes', 'utils/') + 'childProcessCreate.js ' + categoryName));
        console.log('refreshing category:', categoryName);

        return res.json(data);
    }

    // const googleSearch = await searchGoogle(categoryName);
    const youtubeSearch = await searchYoutube(categoryName);
    // const podcastSearch = await searchGoogle(categoryName + ' podcast');
    // const twitterSearchPeople = await searchTwitterPeople(categoryName);
    // const twitterSearchTopics = await searchTwitterTopics(categoryName);
    // const redditSearch = await searchReddit(categoryName);
    // const amazonSearch = await searchAmazon(categoryName);

    const result = {
        time: new Date(),
        // titles: [...googleSearch.titles, ...youtubeSearch.titles, ...podcastSearch.titles, ...twitterSearchPeople.titles, ...twitterSearchTopics.titles, ...redditSearch.titles, ...amazonSearch.titles],
        // links: [...googleSearch.links, ...youtubeSearch.links, ...podcastSearch.links, ...twitterSearchPeople.links, ...twitterSearchTopics.links, ...redditSearch.links, ...amazonSearch.links],
        // descriptions: [...googleSearch.descriptions, ...youtubeSearch.descriptions, ...podcastSearch.descriptions, ...twitterSearchPeople.descriptions, ...twitterSearchTopics.descriptions, ...redditSearch.descriptions, ...amazonSearch.descriptions]
        titles: [...youtubeSearch.map(({ title }) => title)],
        links: [...youtubeSearch.map(({ link }) => link)],
        descriptions: [...youtubeSearch.map(({ description }) => description)],
        images: [...youtubeSearch.map(({ image }) => image)]
    }
    console.log(result);

    writeFileSync(jsonFile, JSON.stringify(result));

    return res.json(result);
});

export default router;