import { Router } from 'express';
import classRoutes from './classRoutes';
import studentRoutes from './studentRoutes';
import courseRoutes from './courseRoutes';

const router = Router();

router.use('/classes', classRoutes);
router.use('/students', studentRoutes);
router.use('/courses', courseRoutes);

export default router;
