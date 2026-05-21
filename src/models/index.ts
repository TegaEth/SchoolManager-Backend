import { Class } from './Class';
import { Student } from './Student';
import { Course } from './Course';
import { sequelize } from '../config/database';

// 1:N Relationship between Class and Student
Class.hasMany(Student, { foreignKey: 'classId', as: 'Students', onDelete: 'SET NULL' });
Student.belongsTo(Class, { foreignKey: 'classId', as: 'Class', onDelete: 'SET NULL' });

// M:N Relationship between Student and Course
Student.belongsToMany(Course, { through: 'StudentCourses', as: 'Courses', foreignKey: 'studentId', onDelete: 'CASCADE' });
Course.belongsToMany(Student, { through: 'StudentCourses', as: 'Students', foreignKey: 'courseId', onDelete: 'CASCADE' });

export { Class, Student, Course, sequelize };
