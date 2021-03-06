import { connection } from '../mysql_connection';

class UtleieTjenester {
  // henter info om kunde fra db
  hentKunde(kunde, success) {
    connection.query('SELECT * FROM kunde WHERE k_tlf=?', [kunde.tlf], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }

  // legger inn ny kunde i db, IGNORE skal stanse identiske rader fra å bli opprettet
  opprettKunde(kunde) {
    connection.query(
      'INSERT IGNORE kunde (k_fornavn, k_etternavn, k_epost, k_tlf) values (?,?,?,?)',
      [kunde.fornavn, kunde.etternavn, kunde.epost, kunde.tlf],
      (error, results) => {
        if (error) return console.error(error);
      }
    );
  }

  // henter ID til det nyeste utleie (for å kunne fylle inn som fremmednøkkel i resten av tabellene)
  hentUtleieId(utleiedata, success) {
    connection.query('SELECT utleie_id FROM utleie ORDER BY utleie_id DESC', (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }

  // legger inn valgt info om utleie i db
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

  // finner ledige sykler av rett type
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

  // oppdaterer de valgte syklene i db som utlånt og med relevant info
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
      'INSERT INTO utleid_sykkel (utleie_id, sykkel_id) VALUES (?,?)',
      [utleieId, sykkelId],
      (error, results) => {
        if (error) return console.error(error);
      }
    );
  }

  // finner ledig utstyr av rett type
  velgUtstyr(utstyrValg, success) {
    let type = ['Hjelm', 'Sykkelveske', 'Sykkelvogn', 'Barnesete', 'Drikkesekk'];

    for (var i = 0; i < type.length; i++) {
      let antall = Number(utstyrValg[type[i]]);

      connection.query(
        'SELECT utstyr_id FROM utstyr WHERE utstyrstype = ? AND u_tilstand = "Ledig" LIMIT ?',
        [type[i], antall],
        (error, results) => {
          if (error) return console.error(error);

          success(results);
        }
      );
    }
  }

  // leier ut det valgte utstyret med relevant info
  utleieUtstyr(utleieId, utstyrId, kommentar) {
    connection.query('UPDATE utstyr SET u_tilstand = "Utleid" WHERE utstyr_id = ?;', [utstyrId], (error, results) => {
      if (error) return console.error(error);
    });

    connection.query(
      'INSERT INTO utstyr_kommentar (utstyr_id, Kommentar, utstyr_status) VALUES (?, ?, ?);',
      [utleieId, kommentar, 'Utleid'],
      (error, results) => {
        if (error) return console.error(error);
      }
    );

    connection.query(
      'INSERT INTO utleid_utstyr (utleie_id, utstyr_id) VALUES (?,?)',
      [utleieId, utstyrId],
      (error, results) => {
        if (error) return console.error(error);
      }
    );
  }
}

// export lar klassen kalles på tvers av dokument
export let utleieTjenester = new UtleieTjenester();
