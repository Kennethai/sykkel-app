import { connection } from '../mysql_connection';

//---------------STATUS----------------

class StatusService {
  //Her oppdaters status på sykkelen og det legegs til en kommentar.
  oppdaterStatus(status, success) {
    connection.query(
      'UPDATE sykkel SET s_tilstand=? WHERE sykkel_id=?',
      [status.s_tilstand, status.sykkelId],
      (error, results) => {
        connection.query(
          'INSERT INTO sykkel_kommentar (kommentar, sykkel_status, sykkel_id) values (?,?,?)',
          [status.kommentar, status.s_tilstand, status.sykkelId],
          (error, results) => {
            if (error) return console.error(error);

            success();
          }
        );
      }
    );
  }

  //Her finner man alle kommentarene og status på den valgte sykkelen.
  søkStatus(idSykkel, success) {
    connection.query(
      'SELECT sykkel_id, sykkel_status, kommentar FROM sykkel_kommentar WHERE sykkel_id=? ORDER BY kommentar DESC',
      [idSykkel],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
}

export let statusService = new StatusService();

class UtstyrStatus {
  //Her oppdaters status på utstyret og det legegs til en kommentar.
  oppdaterUstatus(status, success) {
    connection.query(
      'UPDATE utstyr SET u_tilstand=? WHERE utstyr_id=?',
      [status.u_tilstand, status.utstyrId],
      (error, results) => {
        connection.query(
          'INSERT INTO utstyr_kommentar (kommentar, utstyr_status, utstyr_id) values (?,?,?)',
          [status.kommentar, status.u_tilstand, status.utstyrId],
          (error, results) => {
            if (error) return console.error(error);

            success();
          }
        );
      }
    );
  }

  //Her finner man alle kommentarene og status på det valgte utstyret.
  søkUstatus(idUtstyr, success) {
    connection.query(
      'SELECT utstyr_id, utstyr_status, kommentar FROM utstyr_kommentar WHERE utstyr_id=?',
      [idUtstyr],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
}

export let utstyrStatus = new UtstyrStatus();
