import { Student, Class, Course } from '../models';

export class StudentService {
  async getAllStudents() {
    return await Student.findAll();
  }

  async getStudentById(id: number) {
    const student = await Student.findByPk(id, {
      include: [
        { model: Class, as: 'Class' },
        { model: Course, as: 'Courses' },
      ],
    });

    if (!student) {
      throw new Error('Student not found');
    }

    const courses = student.Courses || [];

    return {
      studentInfo: student,
      classAssigned: student.Class || null,
      totalCourses: courses.length,
      coursesList: courses,
    };
  }

  async createStudent(name: string, age: number, classId: number, courseIds: number[]) {
    // Check if class exists
    const classRecord = await Class.findByPk(classId);
    if (!classRecord) {
      throw new Error('Class not found');
    }

    const student = await Student.create({ name, age, classId });

    if (courseIds && courseIds.length > 0) {
      const courses = await Course.findAll({ where: { id: courseIds } });
      // @ts-ignore
      await student.setCourses(courses);
    }

    return student;
  }

  async updateStudent(id: number, data: { name?: string; age?: number; classId?: number; courseIds?: number[] }) {
    const student = await Student.findByPk(id);
    if (!student) {
      throw new Error('Student not found');
    }

    if (data.classId !== undefined && data.classId !== null) {
      const classRecord = await Class.findByPk(data.classId);
      if (!classRecord) {
        throw new Error('Class not found');
      }
    }

    if (data.name !== undefined) student.set('name', data.name);
    if (data.age !== undefined) student.set('age', data.age);
    if (data.classId !== undefined) student.set('classId', data.classId);
    await student.save();

    if (data.courseIds !== undefined) {
      const courses = await Course.findAll({ where: { id: data.courseIds } });
      // @ts-ignore
      await student.setCourses(courses);
    }

    await student.reload();
    return student;
  }

  async deleteStudent(id: number) {
    const student = await Student.findByPk(id);
    if (!student) {
      throw new Error('Student not found');
    }
    await student.destroy();
    return true;
  }
}
