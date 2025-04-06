import { Router } from 'express';
import { subscribeUser } from '../controller/sub.controller.js';

const subRouter = Router();

subRouter.post('/subscribe', subscribeUser);

export { subRouter };