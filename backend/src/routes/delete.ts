import express, { Router } from 'express';
import { deleteObject } from '../services/deleteobject';

const router: Router = express.Router();

router.post('/',  deleteObject);

export { router as deleteRoutes };
