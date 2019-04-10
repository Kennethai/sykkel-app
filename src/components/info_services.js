import { connection } from '../mysql_connection';

//Her hentes det ut informasjon om kunde.
class InfoService {
  hentKunde(kunde, success) {
    connection.query(
      'SELECT k_fornavn "Fornavn: ", k_etternavn "Etternavn: ", k_tlf "Tlf: "FROM kunde WHERE k_tlf=?;',
      [kunde.tlf],
      (error, results) => {
        if (error) return console.error(error);
        success(results[0]);
      }
    );
  }
  //Her hentes tabellen med all informasjonen ut når man søker på telefonnummer.
  hentListe(kunde, success) {
    connection.query(
      'SELECT utleid_sykkel.utleie_id AS us, utleid_utstyr.utleie_id AS uu, k_fornavn, k_etternavn, k_tlf, utleietid, innleveringstid, utleid_sykkel.utleie_id, COUNT(DISTINCT utleid_sykkel.sykkel_id) as sykler, SUM(DISTINCT s_utleiepris) AS spris, utleid_utstyr.utleie_id, COUNT(DISTINCT utleid_utstyr.utstyr_id) as utstyr, SUM(DISTINCT u_utleiepris) AS upris FROM kunde,(utleie LEFT JOIN utleid_utstyr ON utleid_utstyr.utleie_id = utleie.utleie_id) LEFT JOIN utleid_sykkel ON (utleid_sykkel.utleie_id = utleie.utleie_id) LEFT JOIN utstyr ON (utleid_utstyr.utstyr_id = utstyr.utstyr_id) LEFT JOIN sykkel ON utleid_sykkel.sykkel_id = sykkel.sykkel_id WHERE kunde.kunde_nr = utleie.kunde_nr AND utleid_utstyr.utstyr_id = utstyr.utstyr_id AND k_tlf=?  GROUP BY utleid_sykkel.utleie_id, utleid_utstyr.utleie_id, kunde.kunde_nr, utleietid, innleveringstid UNION ALL SELECT utleid_sykkel.utleie_id AS us, utleid_utstyr.utleie_id AS uu, k_fornavn, k_etternavn, k_tlf, utleietid, innleveringstid, utleid_sykkel.utleie_id, COUNT(DISTINCT utleid_sykkel.sykkel_id) as sykler, SUM(DISTINCT s_utleiepris) AS spris, utleid_utstyr.utleie_id, COUNT(DISTINCT utleid_utstyr.utleie_id) as utstyr,  SUM(DISTINCT u_utleiepris) AS upris FROM kunde,(utleie RIGHT JOIN utleid_utstyr ON utleid_utstyr.utleie_id = utleie.utleie_id) RIGHT JOIN utleid_sykkel ON (utleid_sykkel.utleie_id = utleie.utleie_id) RIGHT JOIN utstyr ON (utleid_utstyr.utstyr_id = utstyr.utstyr_id) RIGHT JOIN sykkel ON utleid_sykkel.sykkel_id = sykkel.sykkel_id WHERE kunde.kunde_nr = utleie.kunde_nr AND k_tlf=? GROUP BY utleid_sykkel.utleie_id, utleid_utstyr.utleie_id, kunde.kunde_nr, utleietid, innleveringstid ORDER BY utleietid',
      [kunde.tlf, kunde.tlf],
      (error, results) => {
        if (error) return console.error(error);
        success(results);
      }
    );
  }
  //Her hentes tabellen med all informasjonen når siden lastes.
  hentAlt(kunde, success) {
    connection.query(
      'SELECT utleid_sykkel.utleie_id AS us, utleid_utstyr.utleie_id AS uu, k_fornavn, k_etternavn, k_tlf, utleietid, innleveringstid, utleid_sykkel.utleie_id, COUNT(DISTINCT utleid_sykkel.sykkel_id) as sykler, SUM(DISTINCT s_utleiepris) AS spris, utleid_utstyr.utleie_id, COUNT(DISTINCT utleid_utstyr.utstyr_id) as utstyr, SUM(DISTINCT u_utleiepris) AS upris FROM kunde,(utleie LEFT JOIN utleid_utstyr ON utleid_utstyr.utleie_id = utleie.utleie_id) LEFT JOIN utleid_sykkel ON (utleid_sykkel.utleie_id = utleie.utleie_id) LEFT JOIN utstyr ON (utleid_utstyr.utstyr_id = utstyr.utstyr_id) LEFT JOIN sykkel ON utleid_sykkel.sykkel_id = sykkel.sykkel_id WHERE kunde.kunde_nr = utleie.kunde_nr AND utleid_utstyr.utstyr_id = utstyr.utstyr_id GROUP BY utleid_sykkel.utleie_id, utleid_utstyr.utleie_id, kunde.kunde_nr, utleietid, innleveringstid UNION ALL SELECT utleid_sykkel.utleie_id AS us, utleid_utstyr.utleie_id AS uu, k_fornavn, k_etternavn, k_tlf, utleietid, innleveringstid, utleid_sykkel.utleie_id, COUNT(DISTINCT utleid_sykkel.sykkel_id) as sykler, SUM(DISTINCT s_utleiepris) AS spris, utleid_utstyr.utleie_id, COUNT(DISTINCT utleid_utstyr.utleie_id) as utstyr,  SUM(DISTINCT u_utleiepris) AS upris FROM kunde,(utleie RIGHT JOIN utleid_utstyr ON utleid_utstyr.utleie_id = utleie.utleie_id) RIGHT JOIN utleid_sykkel ON (utleid_sykkel.utleie_id = utleie.utleie_id) RIGHT JOIN utstyr ON (utleid_utstyr.utstyr_id = utstyr.utstyr_id) RIGHT JOIN sykkel ON utleid_sykkel.sykkel_id = sykkel.sykkel_id WHERE kunde.kunde_nr = utleie.kunde_nr GROUP BY utleid_sykkel.utleie_id, utleid_utstyr.utleie_id, kunde.kunde_nr, utleietid, innleveringstid ORDER BY utleietid',
      (error, results) => {
        if (error) return console.error(error);
        success(results);
      }
    );
  }
  //Her hentes sykkel_id når det søkes på utleie_id
  idInfo(utleie, success) {
    connection.query(
      'SELECT  utleid_sykkel.utleie_id AS us,  utleid_sykkel.sykkel_id, utleid_utstyr.utleie_id AS uu FROM (utleie LEFT JOIN utleid_utstyr ON utleid_utstyr.utleie_id = utleie.utleie_id) LEFT JOIN utleid_sykkel ON utleid_sykkel.utleie_id = utleie.utleie_id WHERE utleie.utleie_id=? GROUP BY utleid_sykkel.utleie_id, utleid_utstyr.utleie_id, utleid_sykkel.sykkel_id, utleid_utstyr.utstyr_id UNION SELECT  utleid_sykkel.utleie_id AS us,  utleid_sykkel.sykkel_id, utleid_utstyr.utleie_id AS uu FROM  (utleie RIGHT JOIN utleid_utstyr ON utleie.utleie_id = utleid_utstyr.utstyr_id) RIGHT JOIN utleid_sykkel ON utleie.utleie_id = utleid_sykkel.utleie_id  WHERE utleie.utleie_id=? GROUP BY utleid_sykkel.utleie_id, utleid_utstyr.utleie_id, utleid_sykkel.sykkel_id, utleid_utstyr.utstyr_id',
      [utleie.utleieid, utleie.utleieid],
      (error, results) => {
        if (error) return console.error(error);
        success(results);
      }
    );
  }
  //Her hentes utstyr_id når det søkes på utleie_id
  UidInfo(utleie, success) {
    connection.query(
      'SELECT utleid_sykkel.utleie_id, utleid_utstyr.utleie_id, utleid_utstyr.utstyr_id  FROM (utleie LEFT JOIN utleid_utstyr ON utleid_utstyr.utleie_id = utleie.utleie_id) LEFT JOIN utleid_sykkel ON utleid_sykkel.utleie_id = utleie.utleie_id WHERE utleie.utleie_id=? GROUP BY utleid_sykkel.utleie_id, utleid_utstyr.utleie_id, utleid_sykkel.sykkel_id, utleid_utstyr.utstyr_id UNION SELECT utleid_sykkel.utleie_id, utleid_utstyr.utleie_id, utleid_utstyr.utleie_id FROM  (utleie RIGHT JOIN utleid_utstyr ON utleie.utleie_id = utleid_utstyr.utstyr_id) RIGHT JOIN utleid_sykkel ON utleie.utleie_id = utleid_sykkel.utleie_id  WHERE utleie.utleie_id=? GROUP BY utleid_sykkel.utleie_id, utleid_utstyr.utleie_id, utleid_sykkel.sykkel_id, utleid_utstyr.utstyr_id',
      [utleie.utleieid, utleie.utleieid],
      (error, results) => {
        if (error) return console.error(error);
        success(results);
      }
    );
  }
}

export let infoService = new InfoService();
