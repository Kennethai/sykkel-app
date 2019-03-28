import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { utleieTjenester, studentService, subjectService } from './utleie_services';
import { Card, List, Row, Column, NavBar, Button, Form } from '../widgets';
import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

let selgerdata = {
  selger_id: '7',
  avdeling: '1'
};

let kundeNr = [];

let utleieId = {};

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
  kunde = {};

  utleiedata = {};

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
            <Button.Light onClick={this.delete}>Delete</Button.Light>
          </Column>
          <Column right>
            <Button.Light onClick={this.cancel}>Cancel</Button.Light>
          </Column>
        </Row>
      </div>
    );
  }

  mounted() {
    sykkelArea.value += 'SYKLER\n';
    Object.keys(sykkelValg).forEach(function(key) {
      sykkelArea.value += key + ' ' + sykkelValg[key] + '\n';
    });
    sykkelArea.value += '\nUTSTYR\n';
    Object.keys(utstyrValg).forEach(function(key) {
      sykkelArea.value += key + ' ' + utstyrValg[key] + '\n';
    });
    this.kunde = kundeLagring;
    this.utleiedata = utleiedataLagring;
    console.log(this.utleiedata);
  }

  lagring() {
    kundeLagring = this.kunde;
    utleiedataLagring = this.utleiedata;
  }

  create() {
    utleieTjenester.opprettKunde(this.kunde);

    utleieTjenester.hentKunde(this.kunde, kunde => {
      this.kunde = kunde;
    });

    this.utleiedata.kunde_nr = this.kunde.kunde_nr.toString();

    console.log(this.kunde);
    console.log(this.utleiedata);
    console.log(sykkelValg);

    utleieTjenester.utleieSykkel(sykkelValg);

    if (utstyrTeller > 0) {
      utleieTjenester.utleieUtstyr(utstyrValg);
    }
    utleieTjenester.opprettUtleie(this.utleiedata);

    utleieTjenester.hentUtleieId(this.utleiedata, utleiedata => {
      this.utleieId = utleiedata;
    });

    utleieTjenester.koblingstabellSykkel(sykkelValg);

    if (utstyrTeller > 0) {
      utleieTjenester.koblingstabellUtstyr(utstyrValg);
    }
    history.push('/utleie/');
  }

  delete() {
    studentService.deleteStudent(this.props.match.params.id, () => history.push('/students'));
  }

  cancel() {
    history.push('/students/' + this.props.match.params.id);
  }
}

let sykkelValg = {
  tursykkel: '0',
  terreng: '0',
  downhill: '0',
  grusracer: '0',
  tandem: '0'
};
let sykkelTeller;

function GetPropertyValue(sykkelValg, dataToRetrieve) {
  return dataToRetrieve
    .split('.') // split string based on `.`
    .reduce(function(o, k) {
      return o && o[k]; // get inner property if `o` is defined else get `o` and return
    }, sykkelValg); // set initial value as object
}

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
    console.log(
      GetPropertyValue(sykkelValg, 'tursykkel'),
      GetPropertyValue(sykkelValg, 'terreng'),
      GetPropertyValue(sykkelValg, 'downhill'),
      GetPropertyValue(sykkelValg, 'grusracer'),
      GetPropertyValue(sykkelValg, 'tandem')
    );
    history.push('/utleie/');
  }

  cancel() {
    history.push('/utleie/');
  }
}

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
