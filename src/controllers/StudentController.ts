import { Request, Response } from 'express';
import { StudentService } from '../services/StudentService';

export class StudentController {
  private studentService: StudentService;

  constructor() {
    this.studentService = new StudentService();
  }

  getAllStudents = async (req: Request, res: Response) => {
    try {
      const students = await this.studentService.getAllStudents();
      res.json(students);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  getStudentById = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id as string);
      const data = await this.studentService.getStudentById(id);
      res.json(data);
    } catch (err: any) {
      if (err.message === 'Student not found') {
        res.status(404).json({ error: err.message });
      } else {
        res.status(500).json({ error: err.message });
      }
    }
  };

  createStudent = async (req: Request, res: Response) => {
    try {
      const { name, age, classId, courseIds } = req.body;
      if (!name || !age || !classId) {
        return res.status(400).json({ error: 'Name, age, and classId are required' });
      }
      const student = await this.studentService.createStudent(name, age, classId, courseIds || []);
      res.status(201).json(student);
    } catch (err: any) {
      if (err.message === 'Class not found') {
        res.status(400).json({ error: err.message });
      } else {
        res.status(500).json({ error: err.message });
      }
    }
  };

  updateStudent = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id as string);
      const student = await this.studentService.updateStudent(id, req.body);
      res.json(student);
    } catch (err: any) {
      if (err.message === 'Student not found') {
        res.status(404).json({ error: err.message });
      } else if (err.message === 'Class not found') {
        res.status(400).json({ error: err.message });
      } else {
        res.status(500).json({ error: err.message });
      }
    }
  };

  deleteStudent = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id as string);
      await this.studentService.deleteStudent(id);
      res.json({ success: true, message: 'Student deleted successfully' });
    } catch (err: any) {
      if (err.message === 'Student not found') {
        res.status(404).json({ error: err.message });
      } else {
        res.status(500).json({ error: err.message });
      }
    }
  };
}
