import { connection } from './mysql_connection';

class CourseService {
  getCourses(success) {
    connection.query('select * from Emnene', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getCourse(id, success) {
    connection.query('select * from Emnene where id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }

  updateCourse(course, success) {
    connection.query(
      'update Emnene set name=?, emne_kode=? where id=?',
      [course.name, course.emne_kode, course.id],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }
  addCourse(emne_kode, name, success) {
    connection.query('insert into Emnene (emne_kode, name) values (?,?)', [emne_kode, name], error => {
      if (error) return console.error(error);

      success();
    });
  }
}
export let courseService = new CourseService();

class StudentService {
  getStudents(success) {
    connection.query('select * from Students', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getStudent(id, success) {
    connection.query('select * from Students where id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }

  updateStudent(student, success) {
    connection.query(
      'update Students set name=?, email=? where id=?',
      [student.name, student.email, student.id],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }
  addStudent(name, email, success) {
    connection.query('insert into Students (name, email) values (?,?)', [name, email], error => {
      if (error) return console.error(error);

      success();
    });
  }
}
export let studentService = new StudentService();
