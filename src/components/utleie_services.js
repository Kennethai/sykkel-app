import { connection } from '../mysql_connection';

class UtleieTjenester {
  hentKunde(kunde, success) {
    connection.query('SELECT * FROM kunde WHERE k_tlf=?', [kunde.tlf], (error, results) => {
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

  hentUtleieId(utleiedata, success) {
    connection.query('SELECT utleie_id FROM utleie ORDER BY utleie_id DESC', (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }

  opprettUtleie(utleiedata) {
    connection.query(
      'INSERT INTO utleie (utleietid, innleveringstid, utsted, innsted, selger_id, avdelings_id, kunde_nr) VALUES(?,?,?,?,?,?,?)',
      [
        utleiedata.fradato,
        utleiedata.tildato,
        utleiedata.utlevering,
        utleiedata.innlevering,
        utleiedata.selger_id,
        utleiedata.avdeling,
        utleiedata.kunde_nr
      ],
      (error, results) => {
        if (error) return console.error(error);
      }
    );
  }

  velgSykkel(sykkelValg, success) {
    let type = ['Tursykkel', 'Terreng', 'Downhill', 'Grusracer', 'Tandem'];

    for (var i = 0; i < type.length; i++) {
      let antall = Number(sykkelValg[type[i]]);

      connection.query(
        'SELECT sykkel_id FROM sykkel WHERE sykkeltype = ? AND s_tilstand = "Ledig" LIMIT ?',
        [type[i], antall],
        (error, results) => {
          if (error) return console.error(error);

          success(results);
        }
      );
    }
  }

  utleieSykkel(utleieId, sykkelId, kommentar) {
    connection.query('UPDATE sykkel SET s_tilstand = "Utleid" WHERE sykkel_id = ?;', [sykkelId], (error, results) => {
      if (error) return console.error(error);
    });

    connection.query(
      'INSERT INTO sykkel_kommentar (sykkel_id, kommentar, sykkel_status) VALUES (?, ?, ?);',
      [sykkelId, kommentar, 'Utleid'],
      (error, results) => {
        if (error) return console.error(error);
      }
    );

    connection.query(
      'INSERT INTO utleide_sykler (utleie_id, sykkel_id) VALUES (?,?)',
      [utleieId, sykkelId],
      (error, results) => {
        if (error) return console.error(error);
      }
    );
  }

  koblingstabellSykkel(utleiedata) {
    connection.query('SELECT sykkel_id FROM sykkel ORDER BY utleie_id DESC', (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });

    connection.query(
      'INSERT utleide_sykler (utlevering, innlevering, utleie_id, sykkel_id) VALUES (?,?,?,?)',
      [utleiedata.utlevering, utleiedata.innlevering, utleiedata.utleie_id, LAST_INSERT_ID()],
      (error, results) => {
        if (error) return console.error(error);
      }
    );
  }

  utleieUtstyr(utstyrValg) {
    let type = ['Hjelm', 'Sykkelveske', 'Sykkelvogn', 'Barnesete', 'Drikkesekk'];

    for (var i = 0; i < type.length; i++) {
      let antall = Number(utstyrValg[type[i]]);

      connection.query(
        'UPDATE utstyr SET u_tilstand="Utleid", utleie_id=? WHERE utstyrstype = ? AND u_tilstand = "Ledig" LIMIT ?;',
        [utstyrValg.utleie_id, type[i], antall],
        (error, results) => {
          if (error) return console.error(error);
        }
      );
    }
  }

  koblingstabellUtstyr(utleiedata) {
    connection.query(
      'INSERT utleid_utstyr (u_utlevering, u_innlevering, utleie_id, utstyr_id) VALUES (?,?,?,?)',
      [utleiedata.utlevering, utleiedata.innlevering, utleiedata.utleie_id, LAST_INSERT_ID()],
      (error, results) => {
        if (error) return console.error(error);
      }
    );
  }
}

export let utleieTjenester = new UtleieTjenester();
