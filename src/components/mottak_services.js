import { connection } from '../mysql_connection';

class MottakTjenester {
  hentKunde(kunde, success) {
    connection.query(
      'SELECT k_fornavn "Fornavn: ", k_etternavn "Etternavn: ", k_tlf "Tlf: "FROM kunde WHERE ((k_fornavn=? or k_etternavn=?) or k_tlf=?);',
      [kunde.fornavn, kunde.etternavn, kunde.tlf],
      (error, results) => {
        if (error) return console.error(error);
        success(results[0]);
      }
    );
  }

  hentSykkel(kunde, success) {
    connection.query(
      'SELECT sykkel.sykkel_id, sykkeltype, utleietid FROM sykkel, kunde, utleie, utleid_sykkel WHERE utleid_sykkel.sykkel_id = sykkel.sykkel_id AND utleie.kunde_nr = kunde.kunde_nr AND utleid_sykkel.utleie_id = utleie.utleie_id AND s_tilstand = "Utleid" AND((k_fornavn=? or k_etternavn=?) or k_tlf=?)',
      [kunde.fornavn, kunde.etternavn, kunde.tlf],
      (error, results) => {
        if (error) return console.error(error);
        success(results);
      }
    );
  }
  hentUtstyr(kunde, success) {
    connection.query(
      'SELECT utstyr.utstyr_id, utstyrstype, utleietid FROM utstyr, kunde, utleie, utleid_utstyr WHERE utleie.kunde_nr = kunde.kunde_nr AND utleid_utstyr.utleie_id = utleie.utleie_id AND utstyr.utstyr_id = utleid_utstyr.utstyr_id AND u_tilstand = "Utleid" AND ((k_fornavn=? or k_etternavn=?) or k_tlf=?)',
      [kunde.fornavn, kunde.etternavn, kunde.tlf],
      (error, results) => {
        if (error) return console.error(error);
        success(results);
      }
    );
  }
  mottak() {
    let sykkel = document.getElementById('sykkel1').innerHTML.value;
    let utstyr = document.getElementById('utstyr1').innerHTML.value;

    if (checkBox.sykkel == true) {
      connection.query('ALTER TABLE sykkel WHERE s_tilstand = "Ledig" AND utleid_sykkel.sykkel_id=?', [
        sykkel.sykkel_id
      ]);
    }
    (error, results) => {
      if (error) return console.error(error);
      success(results);
    };
  }
}

// 'SELECT k_fornavn "Fornavn: ", k_etternavn "Etternavn: ", k_tlf "Tlf: ", sykkel.sykkel_id "Sykkel: ", sykkeltype "Type: ", utleietid "Utleid: ", utstyr.utstyr_id, utstyrstype from utleie, utleid_sykkel, kunde, sykkel, utstyr, utleid_utstyr where utleie.kunde_nr = kunde.kunde_nr and utleid_sykkel.utleie_id = utleie.utleie_id and sykkel.sykkel_id = utleid_sykkel.sykkel_id and utleid_utstyr.utleie_id = utleie.utleie_id and utstyr.utstyr_id = utleid_utstyr.utstyr_id and ((k_fornavn=? or k_etternavn=?) or k_tlf=?)',

export let mottakTjenester = new MottakTjenester();
