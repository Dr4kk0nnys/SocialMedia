import express from 'express';
// import cors from 'cors';
import { config } from 'dotenv';

config();
const app = express();
const PORT = process.env.PORT || 8000;

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

import categories from './routes/categories';

app.use('/categories', categories);

app.listen(PORT, () => console.log('\x1b[32m%s\x1b[0m', `Listening on port ${PORT}`));