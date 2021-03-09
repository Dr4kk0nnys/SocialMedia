import { Router } from 'express';

import { searchGoogle, searchYoutube } from '../utils/scraper';

const router = Router();

router.get('/:categoryName', async (req, res) => {
    const { categoryName }: { categoryName?: string } = req.params;
    
    // const googleSearch = await searchGoogle(categoryName);
    const youtubeSearch = await searchYoutube(categoryName)

    return res.json(youtubeSearch);
});

export default router;