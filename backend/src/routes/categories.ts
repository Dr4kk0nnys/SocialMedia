import { Router } from 'express';

import { searchGoogle, searchYoutube, searchTwitterPeople, searchTwitterTopics } from '../utils/scraper';

const router = Router();

router.get('/:categoryName', async (req, res) => {
    const { categoryName }: { categoryName?: string } = req.params;

    // const googleSearch = await searchGoogle(categoryName);
    // const youtubeSearch = await searchYoutube(categoryName);
    // const podcastSearch = await searchGoogle(categoryName + ' podcast');
    // const twitterSearchPeople = await searchTwitterPeople(categoryName);
    const twitterSearchTopics = await searchTwitterTopics(categoryName);

    console.log(twitterSearchTopics);
    
    return res.json(twitterSearchTopics);


    /* TODO: Reddit, twitter and amazon. */

    // const result = {
    //     titles: [...googleSearch.titles, ...youtubeSearch.titles, ...podcastSearch.titles],
    //     links: [...googleSearch.links, ...youtubeSearch.links, ...podcastSearch.links],
    //     descriptions: [...googleSearch.descriptions, ...youtubeSearch.descriptions, ...podcastSearch.descriptions]
    // }

    // console.log(result);

    // return res.json(result);
});

export default router;