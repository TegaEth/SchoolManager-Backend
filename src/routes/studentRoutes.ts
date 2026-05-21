import { Router } from 'express';
import { StudentController } from '../controllers/StudentController';

const router = Router();
const studentController = new StudentController();

router.get('/', studentController.getAllStudents);
router.get('/:id', studentController.getStudentById);
router.post('/', studentController.createStudent);
router.put('/:id', studentController.updateStudent);
router.delete('/:id', studentController.deleteStudent);

export default router;
