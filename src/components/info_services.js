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
      'SELECT k_fornavn, k_etternavn, k_tlf, COUNT(utstyr.utstyr_id) AS utstyr,  COUNT(sykkel.sykkel_id) AS sykler, utleietid, innleveringstid, SUM(s_utleiepris) AS spris, SUM(u_utleiepris) AS upris FROM kunde, sykkel, utstyr, utleie, utleid_sykkel, utleid_utstyr WHERE kunde.kunde_nr = utleie.kunde_nr AND utleie.utleie_id = utleid_sykkel.utleie_id AND utleie.utleie_id = utleid_utstyr.utleie_id AND sykkel.sykkel_id = utleid_sykkel.sykkel_id AND utstyr.utstyr_id = utleid_utstyr.utstyr_id AND k_fornavn=? AND k_etternavn=? AND k_tlf=? GROUP BY utleid_sykkel.utleie_id, utleid_utstyr.utleie_id',
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
      'SELECT utleid_sykkel.utleie_id, COUNT(utleid_sykkel.sykkel_id) as sykler, utleid_utstyr.utleie_id, COUNT(utleid_utstyr.utleie_id) as utstyr FROM utleid_sykkel LEFT JOIN utleid_utstyr ON utleid_utstyr.utleie_id = utleid_sykkel.utleie_id GROUP BY utleid_sykkel.utleie_id, utleid_utstyr.utleie_id UNION SELECT utleid_sykkel.utleie_id, COUNT(utleid_sykkel.sykkel_id) as sykler, utleid_utstyr.utleie_id, COUNT(utleid_utstyr.utleie_id) as utstyr FROM utleid_sykkel RIGHT JOIN utleid_utstyr ON utleid_sykkel.utleie_id = utleid_utstyr.utleie_id GROUP BY utleid_sykkel.utleie_id, utleid_utstyr.utleie_id',
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
      'SELECT COUNT(utleid_utstyr.utstyr_id)AS utstyr, SUM(u_utleiepris) AS pris FROM utstyr, utleid_utstyr, kunde, utleie WHERE utleid_utstyr.utstyr_id = utstyr.utstyr_id AND kunde.kunde_nr = utleie.kunde_nr AND utleie.utleie_id = utleid_utstyr.utleie_id AND k_fornavn=? AND k_etternavn=? AND k_tlf=? GROUP BY utleid_utstyr.utleie_id',
      [kunde.fornavn, kunde.etternavn, kunde.tlf],
      (error, results) => {
        if (error) return console.error(error);
        success(results);
      }
    );
  }
  syklerr(kunde, success) {
    connection.query(
      'SELECT COUNT(utleid_sykkel.sykkel_id) AS sykler, SUM(s_utleiepris) AS pris FROM sykkel, utleid_sykkel, kunde, utleie WHERE utleid_sykkel.sykkel_id = sykkel.sykkel_id AND kunde.kunde_nr = utleie.kunde_nr AND utleie.utleie_id = utleid_sykkel.utleie_id AND k_fornavn=? AND k_etternavn=? AND k_tlf=? GROUP BY utleid_sykkel.utleie_id',
      [kunde.fornavn, kunde.etternavn, kunde.tlf],
      (error, results) => {
        if (error) return console.error(error);
        success(results);
      }
    );
  }
}

export let infoService = new InfoService();
