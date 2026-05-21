import { Class, Student } from '../models';

export class ClassService {
  async getAllClasses() {
    return await Class.findAll();
  }

  async getClassById(id: number) {
    const classRecord = await Class.findByPk(id, {
      include: [
        {
          model: Student,
          as: 'Students',
          attributes: ['id', 'name', 'age'],
        },
      ],
    });

    if (!classRecord) {
      throw new Error('Class not found');
    }

    const students = classRecord.Students || [];
    
    return {
      classInfo: classRecord,
      totalStudents: students.length,
      studentsList: students,
    };
  }

  async createClass(name: string) {
    return await Class.create({ name });
  }

  async updateClass(id: number, name: string) {
    const classRecord = await Class.findByPk(id);
    if (!classRecord) {
      throw new Error('Class not found');
    }
    if (!name) {
      throw new Error('Name is required');
    }
    classRecord.set('name', name);
    await classRecord.save();
    await classRecord.reload();
    return classRecord;
  }

  async deleteClass(id: number) {
    const classRecord = await Class.findByPk(id);
    if (!classRecord) {
      throw new Error('Class not found');
    }
    await classRecord.destroy();
    return true;
  }
}
