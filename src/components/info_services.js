import { connection } from '../mysql_connection';

//------INFO----------

class InfoService {
  hentKunde(kunde, success) {
    connection.query(
      'SELECT k_fornavn "Fornavn: ", k_etternavn "Etternavn: ", k_tlf "Tlf: "FROM kunde WHERE k_fornavn=? AND k_etternavn=? AND k_tlf=?;',
      [kunde.fornavn, kunde.etternavn, kunde.tlf],
      (error, results) => {
        if (error) return console.error(error);
        success(results[0]);
      }
    );
  }
  hentListe(kunde, success) {
    connection.query(
      'SELECT utleie_id, k_fornavn, k_etternavn, k_tlf, utleietid, innleveringstid FROM kunde INNER JOIN utleie ON kunde.kunde_nr = utleie.kunde_nr WHERE k_fornavn=? AND k_etternavn=? AND k_tlf=? GROUP BY kunde.kunde_nr, utleie_id ORDER BY utleie_id',
      [kunde.fornavn, kunde.etternavn, kunde.tlf],
      (error, results) => {
        if (error) return console.error(error);
        success(results);
      }
    );
  }
  hentAlt(kunde, success) {
    connection.query(
      'SELECT utleie_id, k_fornavn, k_etternavn, k_tlf, utleietid, innleveringstid FROM kunde INNER JOIN utleie ON kunde.kunde_nr = utleie.kunde_nr GROUP BY kunde.kunde_nr, utleie_id ORDER BY utleie_id',
      (error, results) => {
        if (error) return console.error(error);
        success(results);
      }
    );
  }
  utstyr(kunde, success) {
    connection.query(
      'SELECT utleid_sykkel.utleie_id, COUNT(utleid_sykkel.sykkel_id) as sykler, utleid_utstyr.utleie_id, COUNT(utleid_utstyr.utleie_id) as utstyr FROM kunde,(utleie LEFT JOIN utleid_utstyr ON utleid_utstyr.utleie_id = utleie.utleie_id) LEFT JOIN utleid_sykkel ON utleid_sykkel.utleie_id = utleie.utleie_id WHERE kunde.kunde_nr = utleie.kunde_nr GROUP BY utleid_sykkel.utleie_id, utleid_utstyr.utleie_id UNION  SELECT utleid_sykkel.utleie_id, COUNT(utleid_sykkel.sykkel_id) as sykler, utleid_utstyr.utleie_id, COUNT(utleid_utstyr.utleie_id) as utstyr FROM kunde, (utleie RIGHT JOIN utleid_utstyr ON utleid_utstyr.utleie_id = utleie.utleie_id) RIGHT JOIN utleid_sykkel ON utleid_sykkel.utleie_id = utleie.utleie_id WHERE kunde.kunde_nr = utleie.kunde_nr  GROUP BY utleid_sykkel.utleie_id, utleid_utstyr.utleie_id',
      [kunde.fornavn, kunde.etternavn, kunde.tlf],
      (error, results) => {
        if (error) return console.error(error);
        success(results);
      }
    );
  }
  sykler(kunde, success) {
    connection.query(
      'SELECT COUNT(utleid_sykkel.sykkel_id) AS sykler, SUM(s_utleiepris) AS pris FROM sykkel, utleid_sykkel, kunde, utleie WHERE utleid_sykkel.sykkel_id = sykkel.sykkel_id AND kunde.kunde_nr = utleie.kunde_nr AND utleie.utleie_id = utleid_sykkel.utleie_id GROUP BY utleid_sykkel.utleie_id',
      [kunde.fornavn, kunde.etternavn, kunde.tlf],
      (error, results) => {
        if (error) return console.error(error);
        success(results);
      }
    );
  }
  utstyrr(kunde, success) {
    connection.query(
      'SELECT utleid_sykkel.utleie_id, COUNT(utleid_sykkel.sykkel_id) as sykler, utleid_utstyr.utleie_id, COUNT(utleid_utstyr.utleie_id) as utstyr FROM kunde,(utleie LEFT JOIN utleid_utstyr ON utleid_utstyr.utleie_id = utleie.utleie_id) LEFT JOIN utleid_sykkel ON utleid_sykkel.utleie_id = utleie.utleie_id WHERE kunde.kunde_nr = utleie.kunde_nr AND k_tlf=? GROUP BY utleid_sykkel.utleie_id, utleid_utstyr.utleie_id UNION  SELECT utleid_sykkel.utleie_id, COUNT(utleid_sykkel.sykkel_id) as sykler, utleid_utstyr.utleie_id, COUNT(utleid_utstyr.utleie_id) as utstyr FROM kunde, (utleie RIGHT JOIN utleid_utstyr ON utleid_utstyr.utleie_id = utleie.utleie_id) RIGHT JOIN utleid_sykkel ON utleid_sykkel.utleie_id = utleie.utleie_id WHERE kunde.kunde_nr = utleie.kunde_nr GROUP BY utleid_sykkel.utleie_id, utleid_utstyr.utleie_id',
      [kunde.fornavn, kunde.etternavn, kunde.tlf],
      (error, results) => {
        if (error) return console.error(error);
        success(results);
      }
    );
  }
}

export let infoService = new InfoService();
