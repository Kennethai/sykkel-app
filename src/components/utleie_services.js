import { connection } from '../mysql_connection';

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
      'INSERT INTO utleie (utleietid, innleveringstid, selger_id, avdelings_id, antall_sykler, kunde_nr) values (?,?,?,?,?,?)',
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
    let type = ['tursykkel', 'terreng', 'downhill', 'grusracer', 'tandem'];

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
