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
    const staticFolder = __dirname.replace('routes', 'static/').replace('dist', 'src/');
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

    try {
        /* Not working. */
        // const googleSearch = await searchGoogle(categoryName);
        // const podcastSearch = await searchGoogle(categoryName + ' podcast');
        
        let youtubeSearch = [{ title: '', link: '', description: '', image: '' }];
        try { youtubeSearch = await searchYoutube(categoryName); } catch { console.log('\x1b[31m%s\x1b[0m', 'Youtube error'); }
        
        let twitterSearchPeople = [{ title: '', link: '', description: '', image: '' }];
        try { twitterSearchPeople = await searchTwitterPeople(categoryName); } catch { console.log('\x1b[31m%s\x1b[0m', 'Twitter People error'); }

        let twitterSearchTopics = [{ title: '', link: '', description: '', image: '' }];
        try { twitterSearchTopics = await searchTwitterTopics(categoryName); } catch { console.log('\x1b[31m%s\x1b[0m', 'Twitter Topics error'); }

        let redditSearch = [{ title: '', link: '', description: '', image: '' }];
        try { redditSearch = await searchReddit(categoryName); } catch { console.log('\x1b[31m%s\x1b[0m', 'Reddit error'); }

        let amazonSearch = [{ title: '', link: '', description: '', image: '' }];
        try { amazonSearch = await searchAmazon(categoryName); } catch { console.log('\x1b[31m%s\x1b[0m', 'Amazon error'); }

        const arr = [...youtubeSearch, ...twitterSearchPeople, ...twitterSearchTopics, ...redditSearch, ...amazonSearch];

        const result = {
            time: new Date(),
            titles: arr.map(element => element.title.replace('\n', '')),
            links: arr.map(element => element.link),
            descriptions: arr.map(element => element.description),
            images: arr.map(element => element.image)
        }
        console.log(result);

        writeFileSync(jsonFile, JSON.stringify(result));

        return res.json(result);
    } catch (e) {
        console.log('\x1b[31m%s\x1b[0m', 'Error while retrieving data from puppeteer.\n' + e);
        
        /* Trying again after fail. */
        new Promise((resolve, reject) => exec('node ' + __dirname.replace('src', 'dist').replace('routes', 'utils/') + 'childProcessCreate.js ' + categoryName));

        return res.json({ titles: ['Unable to load content. Sorry for that. Try again later or try another category.'], links: [], descriptions: ['Support: renatoversianidrakk@gmail.com'], images: [] });
    }

});

export default router;