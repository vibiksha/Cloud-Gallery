import express, { Router } from 'express';
import multer from 'multer';
import { handleFileUpload } from '../services/upload';

const router: Router = express.Router();

router.post('/',  handleFileUpload);

export { router as uploadRoutes };
