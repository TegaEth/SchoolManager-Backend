import { Request, Response } from 'express';
import { ClassService } from '../services/ClassService';

export class ClassController {
  private classService: ClassService;

  constructor() {
    this.classService = new ClassService();
  }

  getAllClasses = async (req: Request, res: Response) => {
    try {
      const classes = await this.classService.getAllClasses();
      res.json(classes);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  getClassById = async (req: Request, res: Response) => {
    try {
      const classId = parseInt(req.params.id as string);
      const data = await this.classService.getClassById(classId);
      res.json(data);
    } catch (err: any) {
      if (err.message === 'Class not found') {
        res.status(404).json({ error: err.message });
      } else {
        res.status(500).json({ error: err.message });
      }
    }
  };

  createClass = async (req: Request, res: Response) => {
    try {
      const { name } = req.body;
      if (!name) {
        return res.status(400).json({ error: 'Name is required' });
      }
      const newClass = await this.classService.createClass(name);
      res.status(201).json(newClass);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  updateClass = async (req: Request, res: Response) => {
    try {
      const classId = parseInt(req.params.id as string);
      const { name } = req.body;
      const updatedClass = await this.classService.updateClass(classId, name);
      res.json(updatedClass);
    } catch (err: any) {
      if (err.message === 'Class not found') {
        res.status(404).json({ error: err.message });
      } else {
        res.status(500).json({ error: err.message });
      }
    }
  };

  deleteClass = async (req: Request, res: Response) => {
    try {
      const classId = parseInt(req.params.id as string);
      await this.classService.deleteClass(classId);
      res.json({ success: true, message: 'Class deleted successfully' });
    } catch (err: any) {
      if (err.message === 'Class not found') {
        res.status(404).json({ error: err.message });
      } else {
        res.status(500).json({ error: err.message });
      }
    }
  };
}
