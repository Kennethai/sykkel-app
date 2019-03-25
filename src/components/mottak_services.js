import { connection } from '../mysql_connection';

class MottakTjenester {
  hentData(kunde, success) {
    connection.query(
      'SELECT k_fornavn Fornavn, k_etternavn Etternavn, k_tlf Tlf, sykkel.sykkel_id Sykkel, sykkeltype Type, utleietid Utleid from utleie, utleid_sykkel, kunde, sykkel where utleie.kunde_nr = kunde.kunde_nr and utleid_sykkel.utleie_id = utleie.utleie_id and sykkel.sykkel_id = utleid_sykkel.sykkel_id and k_fornavn=? or k_etternavn=? or k_tlf=?',
      [kunde.fornavn, kunde.etternavn, kunde.tlf],
      (error, results) => {
        if (error) return alert('Kunden finnes ikke!');
        success(results[0]);
      }
    );
  }

  hentKunde(kunde, success) {
    connection.query('select * from kunde', (error, results) => {
      if (error) return console.error(error);
      success(results);
    });
  }
}

export let mottakTjenester = new MottakTjenester();
