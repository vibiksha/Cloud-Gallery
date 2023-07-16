import express, { Router } from 'express';
import { displayImages } from '../services/displayImages';

const router: Router = express.Router();

router.get('/',displayImages);

export { router as displayRoutes };
