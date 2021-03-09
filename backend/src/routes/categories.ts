import { Router } from 'express';

import searchGoogle from '../utils/scraper';

const router = Router();

router.get('/:categoryName', async (req, res) => {
    const { categoryName }: { categoryName?: string } = req.params;

    const result = await searchGoogle(categoryName);
    console.log(result);
    return res.json(result);
});

export default router;