import { Router } from 'express';

import { searchGoogle, searchYoutube } from '../utils/scraper';

const router = Router();

router.get('/:categoryName', async (req, res) => {
    const { categoryName }: { categoryName?: string } = req.params;

    const googleSearch = await searchGoogle(categoryName);
    const youtubeSearch = await searchYoutube(categoryName);
    const podcastSearch = await searchGoogle(categoryName + ' podcast');

    const result = {
        titles: [...googleSearch.titles, ...youtubeSearch.titles, ...podcastSearch.titles],
        links: [...googleSearch.links, ...youtubeSearch.links, ...podcastSearch.links],
        descriptions: [...googleSearch.descriptions, ...youtubeSearch.descriptions, ...podcastSearch.descriptions]
    }

    return res.json(result);
});

export default router;