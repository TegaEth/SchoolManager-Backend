import { Request, Response } from 'express';
import { CourseService } from '../services/CourseService';

export class CourseController {
  private courseService: CourseService;

  constructor() {
    this.courseService = new CourseService();
  }

  getAllCourses = async (req: Request, res: Response) => {
    try {
      const courses = await this.courseService.getAllCourses();
      res.json(courses);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  getCourseById = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id as string);
      const data = await this.courseService.getCourseById(id);
      res.json(data);
    } catch (err: any) {
      if (err.message === 'Course not found') {
        res.status(404).json({ error: err.message });
      } else {
        res.status(500).json({ error: err.message });
      }
    }
  };

  createCourse = async (req: Request, res: Response) => {
    try {
      const { name, studentIds } = req.body;
      if (!name) {
        return res.status(400).json({ error: 'Name is required' });
      }
      const course = await this.courseService.createCourse(name, studentIds || []);
      res.status(201).json(course);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  updateCourse = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id as string);
      const course = await this.courseService.updateCourse(id, req.body);
      res.json(course);
    } catch (err: any) {
      if (err.message === 'Course not found') {
        res.status(404).json({ error: err.message });
      } else {
        res.status(500).json({ error: err.message });
      }
    }
  };

  deleteCourse = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id as string);
      await this.courseService.deleteCourse(id);
      res.json({ success: true, message: 'Course deleted successfully' });
    } catch (err: any) {
      if (err.message === 'Course not found') {
        res.status(404).json({ error: err.message });
      } else {
        res.status(500).json({ error: err.message });
      }
    }
  };
}
