# Object-Oriented Programming (OOP) Decisions

This document outlines the architectural and coding decisions made for the core classes (`Class`, `Student`, `Course`) in the backend of the student platform API. The project uses TypeScript, Express, and Sequelize (ORM).

## Three-Tier OOP Architecture

We implemented a standard three-tier architecture using Object-Oriented principles to ensure separation of concerns, testability, and maintainability.

### 1. The Model Layer (Data Access)
**Files:** `src/models/Class.ts`, `src/models/Student.ts`, `src/models/Course.ts`

- **Decision:** We used Sequelize `Model` classes. By extending `Model` from Sequelize, we get a fully object-oriented representation of our database tables.
- **Relationships:**
  - `Class` and `Student`: A One-to-Many relationship (`Class.hasMany(Student)` and `Student.belongsTo(Class)`). The assignment requirements stated that a student can only belong to one class.
  - `Student` and `Course`: A Many-to-Many relationship (`Student.belongsToMany(Course)` and `Course.belongsToMany(Student)`). The requirements stated students can take multiple courses, and courses have multiple students.

### 2. The Service Layer (Business Logic)
**Files:** `src/services/ClassService.ts`, `src/services/StudentService.ts`, `src/services/CourseService.ts`

- **Decision:** The business logic (CRUD operations, associating records, aggregating counts) is encapsulated within Service classes (e.g., `ClassService`).
- **Why OOP here?** 
  - **Encapsulation**: The controllers don't need to know *how* Sequelize queries the database; they just call methods like `classService.getAllClasses()`.
  - **Reusability**: If we need to fetch a student from a cron job or a WebSocket server later, we can just instantiate the `StudentService` instead of duplicating database query logic.

### 3. The Controller Layer (HTTP Interface)
**Files:** `src/controllers/ClassController.ts`, `src/controllers/StudentController.ts`, `src/controllers/CourseController.ts`

- **Decision:** Each core entity has a corresponding Controller class. The controller's constructor initializes an instance of the corresponding Service class.
- **Why OOP here?**
  - **State Management**: The controller holds a reference to its service via a private property (`private classService: ClassService;`).
  - **Bound Methods**: We use arrow functions for controller methods (e.g., `getAllClasses = async (req, res) => {...}`) to ensure that `this` always binds correctly to the controller instance when the method is passed as a callback to Express routers.
  - **Responsibility**: The controller is *only* responsible for extracting data from the HTTP `Request` (body, params), calling the Service, and returning the HTTP `Response`. It handles HTTP status codes, while the Service throws standard Error objects.

## Relationship Handling (Eager Loading)
To meet the requirements of viewing an entity and its associated data (e.g., "While viewing a class record, we should be able to see the class information, total number of students... and the list of students"):

- We utilized Sequelize's Eager Loading feature (`include`).
- In `ClassService.getClassById()`, we include the `Student` model. We then construct an object that separates the base `classInfo`, the `totalStudents` (derived from the length of the array), and the `studentsList`. 
- This same pattern was consistently applied across `StudentService` and `CourseService`.
