import express from 'express';
const router = express.Router();

import {createShortUrl, redirect, checkUrlCode} from '../controller/urlController.js';

router.post('/checkUrlCode', checkUrlCode);

router.post('/create', createShortUrl)

router.get('/:urlCode', redirect)

export default router;