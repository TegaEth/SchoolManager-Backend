import { Course, Student } from '../models';

export class CourseService {
  async getAllCourses() {
    return await Course.findAll();
  }

  async getCourseById(id: number) {
    const course = await Course.findByPk(id, {
      include: [
        { model: Student, as: 'Students' },
      ],
    });

    if (!course) {
      throw new Error('Course not found');
    }

    const students = course.Students || [];

    return {
      courseInfo: course,
      totalStudents: students.length,
      studentsList: students,
    };
  }

  async createCourse(name: string, studentIds?: number[]) {
    const course = await Course.create({ name });

    if (studentIds && studentIds.length > 0) {
      const students = await Student.findAll({ where: { id: studentIds } });
      // @ts-ignore
      await course.setStudents(students);
    }

    return course;
  }

  async updateCourse(id: number, data: { name?: string; studentIds?: number[] }) {
    const course = await Course.findByPk(id);
    if (!course) {
      throw new Error('Course not found');
    }

    if (data.name !== undefined) {
      course.set('name', data.name);
      await course.save();
    }

    await course.reload();
    return course;
  }

  async deleteCourse(id: number) {
    const course = await Course.findByPk(id);
    if (!course) {
      throw new Error('Course not found');
    }
    await course.destroy();
    return true;
  }
}
