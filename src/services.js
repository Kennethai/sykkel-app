import { connection } from './mysql_connection';
class Varelager {
  hentSykkeltabell(info, success) {
    connection.query('select * from sykkel', (error, results) => {
      if (error) return console.error(error);
      // for (let i = 0; i < keys.length; i++) {
      success(results);
      // }
    });
  }
  hentsykkel(info, success) {
    connection.query(
      'select sykkel_id ID, sykkelnavn Navn, sykkeltype Type, s_tilhorighet Tilhørighet, s_aar År, s_utleiepris Pris, s_tilstand Tilstand, s_beskrivelse Beskrivelse, Kommentar from sykkel where sykkel_id=?',
      [info.sykkelid],
      (error, results) => {
        if (error) return console.error(error);

        success(results[0]);
      }
    );
  }
  hentUtstyrtabell(info, success) {
    connection.query('select * from utstyr', (error, results) => {
      if (error) return console.error(error);
      success(results);
    });
  }

  hentutstyr(info, success) {
    connection.query(
      'select utstyr_id ID, u_navn Navn, utstyrstype Type, u_sykkeltype Sykkeltilhørighet, u_tilhorighet Tilhørighet, u_utleiepris Pris, u_tilstand Tilstand from utstyr where utstyr_id=?',
      [info.utstyrsid],
      (error, results) => {
        if (error) return console.error(error);
        success(results[0]);
      }
    );
  }
}

export let varelager = new Varelager();

class MottakTjenester {
  hentData(kunde, success) {
    connection.query(
      'SELECT k_fornavn Fornavn, k_etternavn Etternavn, k_tlf Tlf, sykkel.sykkel_id Sykkel, sykkeltype Type, utleietid Utleid from utleie, utleid_sykkel, kunde, sykkel where utleie.kunde_nr = kunde.kunde_nr and utleid_sykkel.utleie_id = utleie.utleie_id and sykkel.sykkel_id = utleid_sykkel.sykkel_id and k_fornavn=? or k_etternavn=? or k_tlf=?',
      [kunde.fornavn, kunde.etternavn, kunde.tlf],
      (error, results) => {
        if (error) return alert('Kunden finnes ikke!');
        success(results[0]);
      }
    );
  }

  hentKunde(kunde, success) {
    connection.query('select * from kunde', (error, results) => {
      if (error) return console.error(error);
      success(results);
    });
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
