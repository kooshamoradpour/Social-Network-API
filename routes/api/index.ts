import { Router } from 'express';
import { userRoute } from './userRoutes.js';
import { thoughtRoute } from './thoughtRoutes.js';

const router = Router();

router.use('/users', userRoute);
router.use('/thoughts', thoughtRoute);

export default router;