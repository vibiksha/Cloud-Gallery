import express, { Router } from 'express';
import { downloadObject } from '../services/downloadObject';

const router: Router = express.Router();

router.post('/',  downloadObject);

export { router as downloadRoutes };
