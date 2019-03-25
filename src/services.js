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

class UtleieTjenester {
  // hentKunder(success) {
  //   connection.query('select * from kunde', (error, results) => {
  //     if (error) return console.error(error);
  //
  //     success(results);
  //   });
  // }

  hentKunde(kunde, success) {
    connection.query('select kunde_nr from kunde where k_tlf=?', [kunde.tlf], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }

  opprettKunde(kunde) {
    connection.query(
      'INSERT IGNORE kunde (k_fornavn, k_etternavn, k_epost, k_tlf) values (?,?,?,?)',
      [kunde.fornavn, kunde.etternavn, kunde.epost, kunde.tlf],
      (error, results) => {
        if (error) return console.error(error);
      }
    );
  }

  hentUtleieData(success) {
    connection.query('select * from utleie', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  opprettUtleie(utleiedata, success) {
    connection.query(
      'INSERT utleie (utleietid, innleverigstid, selger_id, avdelings_id, antall_sykler, kunde_nr) values (?,?,?,?,?,?)',
      [
        utleiedata.fradato,
        utleiedata.tildato,
        utleiedata.selger_id,
        utleiedata.avdeling,
        utleiedata.antall_sykler,
        utleiedata.kunde_nr
      ],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }

  utleieSykkel(sykkelValg) {
    let type = ['tursykkel', 'terreng', 'downhill', 'grusracer', 'hybrid'];

    for (var i = 0; i < type.length; i++) {
      let antall = Number(sykkelValg[type[i]]);

      connection.query(
        'UPDATE sykkel SET s_tilstand="Utleid" WHERE sykkeltype = ? AND s_tilstand = "Ledig" LIMIT ?;',
        [type[i], antall],
        (error, results) => {
          if (error) return console.error(error);
        }
      );
    }

    //
    // for (var i=0 ; i < type.length; i++) {
    //   Object.keys(sykkelValg).forEach(function(key) {
    //     let x = Number(sykkelValg[key]);
    //   });

    // console.log(sykkelValg[i]);
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
