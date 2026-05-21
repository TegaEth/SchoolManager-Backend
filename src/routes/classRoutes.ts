import { Router } from 'express';
import { ClassController } from '../controllers/ClassController';

const router = Router();
const classController = new ClassController();

router.get('/', classController.getAllClasses);
router.get('/:id', classController.getClassById);
router.post('/', classController.createClass);
router.put('/:id', classController.updateClass);
router.delete('/:id', classController.deleteClass);

export default router;
