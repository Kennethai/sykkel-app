import { connection } from './mysql_connection';

class UtleieTjenester {
  hentKunder(success) {
    connection.query('select * from kunder', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  hentKunde(id, success) {
    connection.query('select * from Kunder where id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }

  oppdaterKunde(student, success) {
    connection.query(
      'update kunder set name=?, email=? where id=?',
      [kunde.navn, kunde.epost, kunde.tlf, kunde.id],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }

  opprettUtleie(nyKunde, success) {
    connection.query('insert Students (name, email) values (?,?)', [newStudent.name, newStudent.email], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }

  deleteStudent(id, success) {
      connection.query('delete from Students where id = ?', [id], (error, results) => {
        if (error) return console.error(error);

        success();
      });
    }
  }

export let utleieTjenester = new UtleieTjenester();

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

  createStudent(newStudent, success) {
    connection.query('insert Students (name, email) values (?,?)', [newStudent.name, newStudent.email], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }

  deleteStudent(id, success) {
      connection.query('delete from Students where id = ?', [id], (error, results) => {
        if (error) return console.error(error);

        success();
      });
    }
  }

export let studentService = new StudentService();

// SUBJECT------------------------------------------------------------------

class SubjectService {
  getSubjects(success) {
    connection.query('select * from Subjects', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getSubject(id, success) {
    connection.query('select * from Subjects where id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }

  updateSubject(subject, success) {
    connection.query(
      'update Subjects set name=?, kode=? where id=?',
      [subject.name, subject.kode, subject.id],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }

  createSubject(newSubject, success) {
    connection.query('insert Subjects (name, kode) values (?,?)', [newSubject.name, newSubject.kode], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }

  deleteSubject(id, success) {
      connection.query('delete from Subjects where id = ?', [id], (error, results) => {
        if (error) return console.error(error);

        success();
      });
    }
}
export let subjectService = new SubjectService();
