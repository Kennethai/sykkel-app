import { connection } from './mysql_connection';

class MottakTjenester {
  hentKunder(success) {
    connection.query(
      'select * from kunde, sykkel, utleie, utleid_sykkel where utleie.kunde_nr = kunde.kunde_nr and utleid_sykkel.utleie_id = utleie.utleie_id and sykkel.sykkel_id = utleid_sykkel.sykkel_id',
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }

  hentKunde(kunde, success) {
    connection.query('select k_fornavn=?, k_etternavn=? from kunde', (error, results) => {
      [kunde.fornavn, kunde.etternavn];
      if (error) alert('Kunden finnes ikke!');
      success(results);
    });
  }
  hentTlf(kunde, success) {
    connection.query('select k_tlf from kunde where k_tlf=?', (error, results) => {
      [kunde.tlf];
      if (error) alert('Kunden finnnes ikke!');
      success(results);
    });
  }

  hentData(kunde, success) {
    connection.query(
      'SELECT k_fornavn, k_etternavn, k_tlf, sykkeltype, sykkel.sykkel_id, utleietid from utleie, utleid_sykkel, kunde, sykkel where utleie.kunde_nr = kunde.kunde_nr and utleid_sykkel.utleie_id = utleie.utleie_id and sykkel.sykkel_id = utleid_sykkel.sykkel_id and k_fornavn=? or k_etternavn=? or k_tlf=?',
      [kunde.fornavn, kunde.etternavn, kunde.tlf],
      (error, results) => {
        if (error) return console.error(error);
        success(results);
      }
    );
  }
}

export let mottakTjenester = new MottakTjenester();

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
    connection.query(
      'insert Students (name, email) values (?,?)',
      [newStudent.name, newStudent.email],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
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
    connection.query(
      'insert Subjects (name, kode) values (?,?)',
      [newSubject.name, newSubject.kode],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }

  deleteSubject(id, success) {
    connection.query('delete from Subjects where id = ?', [id], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }
}
export let subjectService = new SubjectService();
