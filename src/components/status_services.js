import { connection } from '../mysql_connection';

//---------------STATUS----------------

class StatusService {
  //Oppdaterer tabell sykkel i databasen, samt legger til kommentar, valgt status og id i tabell sykkel_kommentar i databasen
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

  //Henter ut sykkel_id, status og kommentar fra tabell sykkel_kommentar i databasen, basert på sykkel_id i input-feltet.
  søkStatus(idSykkel, success) {
    connection.query(
      'SELECT sykkel_id, sykkel_status, kommentar FROM sykkel_kommentar WHERE sykkel_id=?',
      [idSykkel],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
}

export let statusService = new StatusService();
