import { connection } from '../mysql_connection';

//---------------STATUS----------------

class StatusService {
  oppdaterStatus(status, success) {
    connection.query(
      'UPDATE sykkel SET s_tilstand=?, kommentar=? WHERE sykkel_id=?',
      [status.s_tilstand, status.kommentar, status.sykkelId],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }

  søkStatus(idSykkel, success) {
    connection.query(
      'SELECT sykkel_id "ID: ", s_tilstand "Tilstand: ", kommentar "Kommentar: " FROM sykkel WHERE sykkel_id=?',
      [idSykkel],
      (error, results) => {
        if (error) return console.error(error);

        success(results[0]);
      }
    );
  }
}

export let statusService = new StatusService();
