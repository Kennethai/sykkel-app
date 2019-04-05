import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { utleieTjenester, studentService, subjectService } from './utleie_services';
import { Card, List, Row, Column, NavBar, Button, Form } from '../widgets';
import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

// Lagrer info om hvilken selger som registrerer utleie + hvilken avdeling
let selgerdata = {
  selger_id: '7',
  avdeling: '1'
};

// kundenr og utleie ID hentet fra db blir lagret her først
let kundeNr = [];
let utleieId = {};

// mellomlagring for innskrevet data om kunde og utleie, slik at det ikke går tapt når man gjør valg av sykkel/utstyr
let kundeLagring = {
  fornavn: '',
  etternavn: '',
  epost: '',
  tlf: ''
};

let utleiedataLagring = {
  selger_id: selgerdata.selger_id,
  avdeling: selgerdata.avdeling,
  utlevering: '1',
  innlevering: '2',
  fradato: '',
  tildato: '',
  fraKl: '',
  tilKl: '',
  kunde_nr: ''
};

export class Utleie extends Component {
  //henter inn mellomlagring ved innlasting av siden
  kunde = kundeLagring;
  utleiedata = utleiedataLagring;
  kommentar = '';
  valgteSykler = [];

  render() {
    return (
      <div>
        <Column>
          <Form.Label>Kunde fornavn:</Form.Label>
          <Form.Input type="text" value={this.kunde.fornavn} onChange={e => (this.kunde.fornavn = e.target.value)} />

          <Form.Label>Kunde etternavn:</Form.Label>
          <Form.Input
            type="text"
            value={this.kunde.etternavn}
            onChange={e => (this.kunde.etternavn = e.target.value)}
          />

          <Form.Label>Epost:</Form.Label>
          <Form.Input type="text" value={this.kunde.epost} onChange={e => (this.kunde.epost = e.target.value)} />

          <Form.Label>Tlf:</Form.Label>
          <Form.Input
            type="text"
            value={this.kunde.tlf}
            onChange={e => (this.kunde.tlf = e.target.value)}
            pattern=".{8,11}"
            required
          />
        </Column>

        <Column>
          <div className="form-group">
            <label>Utlevering:</label>
            <select className="form-control" onChange={e => (this.utleiedata.utlevering = e.target.value)}>
              <option value="1" defaultValue>
                Base 1
              </option>
              <option value="2">Base 2</option>
              <option value="3">Base 3</option>
              <option value="4">Base 4</option>
            </select>
          </div>

          <div className="form-group">
            <label>Innlevering:</label>
            <select className="form-control" onChange={e => (this.utleiedata.innlevering = e.target.value)}>
              <option value="1">Base 1</option>
              <option value="2" defaultValue>
                Base 2
              </option>
              <option value="3">Base 3</option>
              <option value="4">Base 4</option>
            </select>
          </div>
        </Column>

        <Column>
          <Form.Label>Leie fra:</Form.Label>
          <Form.Input
            type="date"
            value={this.utleiedata.fradato}
            onChange={e => (this.utleiedata.fradato = e.target.value)}
            pattern=".{10,10}"
            required
          />

          <Form.Label>Leie til:</Form.Label>
          <Form.Input
            type="date"
            value={this.utleiedata.tildato}
            onChange={e => (this.utleiedata.tildato = e.target.value)}
            pattern=".{10,10}"
            required
          />
        </Column>

        <Column>
          <NavLink to="/utleie/sykkel" onClick={this.lagring}>
            Velg sykkel
          </NavLink>
        </Column>

        <Column>
          <NavLink to="/utleie/utstyr" onClick={this.lagring}>
            Velg utstyr
          </NavLink>
        </Column>

        <Column>
          <div className="form-group">
            <label htmlFor="sykkelArea">Bestilling:</label>
            <textarea className="form-control" rows="5" id="sykkelArea" />
          </div>
        </Column>

        <Row>
          <Column>
            <Button.Success onClick={this.create}>Legg inn</Button.Success>
          </Column>
          <Column>
            <Button.Light onClick={this.delete}>Tøm Skjema</Button.Light>
          </Column>
        </Row>
      </div>
    );
  }

  mounted() {
    // fyller inn tekstfeltet med antall utlånt utstyr
    sykkelArea.value += 'SYKLER\n';
    Object.keys(sykkelValg).forEach(function(key) {
      sykkelArea.value += key + ' ' + sykkelValg[key] + '\n';
    });
    sykkelArea.value += '\nUTSTYR\n';
    Object.keys(utstyrValg).forEach(function(key) {
      sykkelArea.value += key + ' ' + utstyrValg[key] + '\n';
    });
    console.log(this.utleiedata);
  }

  // sender innfylt data til mellomlagring
  lagring() {
    kundeLagring = this.kunde;
    utleiedataLagring = this.utleiedata;
  }

  // oppretter et utleie (sender alt til db)
  create() {
    // sender kundeinfo til db
    utleieTjenester.opprettKunde(this.kunde);

    //henter kundenr fra db
    utleieTjenester.hentKunde(this.kunde, kunde => {
      this.kunde = kunde;
      console.log(this.kunde);
      console.log(this.utleiedata);
      this.utleiedata.kunde_nr = this.kunde.kunde_nr.toString();
    });

    //sender info om utlånet til db
    utleieTjenester.opprettUtleie(this.utleiedata);

    // henter utleie_id fra db
    utleieTjenester.hentUtleieId(this.utleiedata, utleiedata => {
      utleieId = utleiedata.utleie_id;
    });

    this.kommentar = 'Sykkelen er utlånt av ' + this.kunde.k_fornavn + ' ' + this.kunde.k_etternavn;

    let ids = [];
    utleieTjenester.velgSykkel(sykkelValg, results => {
      if (results != undefined) {
        for (var i = 0; i < results.length; i++) {
          ids.push(results[i].sykkel_id);
          console.log(results[i].sykkel_id);
        }
      }
    });
    console.log(ids.toString());

    // registrerer sykler for utlån i db
    for (var i = 0; i < ids.length; i++) {
      console.log('Oppdaterer kommentar for sykkel ' + ids[i] + '.');
      utleieTjenester.utleieSykkel(utleieId, ids[i], this.kommentar);
    }

    // registrerer utstyr for utlån i db, dersom det blir lånt tilleggsutstyr
    if (utstyrTeller > 0) {
      utleieTjenester.utleieUtstyr(utstyrValg);
    }

    history.push('/utleie/');
  }

  delete() {
    history.push('/utleie/');
  }
}

// antall sykler av valgt type
let sykkelValg = {
  tursykkel: '0',
  terreng: '0',
  downhill: '0',
  grusracer: '0',
  tandem: '0'
};

// sammenlagt antall
let sykkelTeller;
// henter antall av hver type
function GetPropertyValue(sykkelValg, dataToRetrieve) {
  return dataToRetrieve
    .split('.') // split string based on `.`
    .reduce(function(o, k) {
      return o && o[k]; // get inner property if `o` is defined else get `o` and return
    }, sykkelValg); // set initial value as object
}

// skjermbilde for valg av sykler
export class VelgSykkel extends Component {
  render() {
    return (
      <div>
        <Column>
          <Form.Label>Tursykkel:</Form.Label>
          <Form.Input type="number" onChange={e => (sykkelValg.tursykkel = e.target.value)} />
          <Form.Label>Terreng:</Form.Label>
          <Form.Input type="number" onChange={e => (sykkelValg.terreng = e.target.value)} />
          <Form.Label>Downhill:</Form.Label>
          <Form.Input type="number" onChange={e => (sykkelValg.downhill = e.target.value)} />
          <Form.Label>Racing:</Form.Label>
          <Form.Input type="number" onChange={e => (sykkelValg.grusracer = e.target.value)} />
          <Form.Label>Tandem:</Form.Label>
          <Form.Input type="number" onChange={e => (sykkelValg.tandem = e.target.value)} />
        </Column>
        <Row>
          <Button.Success onClick={this.create}>Legg inn</Button.Success>
          <Button.Light onClick={this.cancel}>Tilbake</Button.Light>
        </Row>
      </div>
    );
  }

  create() {
    sykkelTeller =
      Number(GetPropertyValue(sykkelValg, 'tursykkel')) +
      Number(GetPropertyValue(sykkelValg, 'terreng')) +
      Number(GetPropertyValue(sykkelValg, 'downhill')) +
      Number(GetPropertyValue(sykkelValg, 'grusracer')) +
      Number(GetPropertyValue(sykkelValg, 'tandem'));
    console.log(sykkelTeller);
    history.push('/utleie/');
  }

  cancel() {
    history.push('/utleie/');
  }
}

// under er samme som for sykler, men for utstyr
let utstyrValg = {
  Hjelm: '',
  Sykkelveske: '',
  Sykkelvogn: '',
  Barnesete: '',
  Drikkesekk: ''
};

let utstyrTeller;

export class VelgUtstyr extends Component {
  render() {
    return (
      <div>
        <Column>
          <Form.Label>Hjelm:</Form.Label>
          <Form.Input type="number" onChange={e => (utstyrValg.Hjelm = e.target.value)} />
          <Form.Label>Sykkelveske:</Form.Label>
          <Form.Input type="number" onChange={e => (utstyrValg.Sykkelveske = e.target.value)} />
          <Form.Label>Sykkelvogn:</Form.Label>
          <Form.Input type="number" onChange={e => (utstyrValg.Sykkelvogn = e.target.value)} />
          <Form.Label>Barnesete:</Form.Label>
          <Form.Input type="number" onChange={e => (utstyrValg.Barnesete = e.target.value)} />
          <Form.Label>Drikkesekk:</Form.Label>
          <Form.Input type="number" onChange={e => (utstyrValg.Drikkesekk = e.target.value)} />
        </Column>
        <Row>
          <Button.Success onClick={this.create}>Legg inn</Button.Success>
          <Button.Light onClick={this.cancel}>Tilbake</Button.Light>
        </Row>
      </div>
    );
  }

  create() {
    utstyrTeller =
      Number(GetPropertyValue(utstyrValg, 'Hjelm')) +
      Number(GetPropertyValue(utstyrValg, 'Sykkelveske')) +
      Number(GetPropertyValue(utstyrValg, 'Sykkelvogn')) +
      Number(GetPropertyValue(utstyrValg, 'Barnesete')) +
      Number(GetPropertyValue(utstyrValg, 'Drikkesekk'));
    history.push('/utleie/');
  }

  cancel() {
    history.push('/utleie/');
  }
}
