import { connection } from '../mysql_connection';

class Varelager {
  hentSykkeltabell(info, success) {
    connection.query('select * from sykkel', (error, results) => {
      if (error) return console.error(error);
      // for (let i = 0; i < keys.length; i++) {
      success(results);
      // }
    });
  }
  hentsykkel(info, success) {
    connection.query(
      'select sykkel_id "ID: ", sykkelnavn "Navn: " , sykkeltype "Type: ", s_tilhorighet "Tilhørighet: ", s_aar "År: ", s_utleiepris "Pris: ", s_tilstand "Tilstand: ", s_beskrivelse "Beskrivelse: " from sykkel where sykkel_id=?',
      [info.sykkelid],
      (error, results) => {
        if (error) return console.error(error);
        success(results[0]);
      }
    );
  }
  hentUtstyrtabell(info, success) {
    connection.query('select * from utstyr', (error, results) => {
      if (error) return console.error(error);
      success(results);
    });
  }

  hentutstyr(info, success) {
    connection.query(
      'select utstyr_id "ID: ", u_navn "Navn: ", utstyrstype "Type: ", u_sykkeltype "Sykkeltilhørighet: ", u_tilhorighet "Tilhørighet: ", u_utleiepris "Pris: ", u_tilstand "Tilstand: " from utstyr where utstyr_id=?',
      [info.utstyrsid],
      (error, results) => {
        if (error) return console.error(error);
        success(results[0]);
      }
    );
  }
}

export let varelager = new Varelager();

class RegSykkel {
  opprettSykkel(sykkel) {
    connection.query(
      'INSERT sykkel (sykkelnavn, sykkeltype, s_aar, s_tilhorighet, s_utleiepris, s_tilstand, s_beskrivelse) values (?,?,?,?,?,?,?)',
      [sykkel.merke, sykkel.type, sykkel.aar, sykkel.sted, sykkel.pris, sykkel.tilstand, sykkel.beskrivelse],
      (error, results) => {
        if (error) return console.error(error);
        success(results);
      }
    );
  }
}
export let regSykkel = new RegSykkel();

class RegUtstyr {
  opprettUtstyr(utstyr) {
    connection.query(
      'INSERT utstyr (utstyrstype, u_sykkeltype, u_tilhorighet, u_utleiepris, u_tilstand, u_navn) values (?,?,?,?,?,?);',
      [utstyr.type, utstyr.stype, utstyr.sted, utstyr.pris, utstyr.tilstand, utstyr.merke],
      (error, results) => {
        if (error) return console.error(error);
        success(results);
      }
    );
  }
}
export let regUtstyr = new RegUtstyr();
