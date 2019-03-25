import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { utleieTjenester, studentService, subjectService } from './services';
import { Card, List, Row, Column, NavBar, Button, Form } from './widgets';
import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

class Menu extends Component {
  render() {
    return (
      <NavBar brand="WhiteBoard">
        <NavBar.Link to="/students">Students</NavBar.Link>
        <NavBar.Link to="/subjects">Subjects</NavBar.Link>
        <NavBar.Link to="/utleie">Utleie</NavBar.Link>
      </NavBar>
    );
  }
}

class Home extends Component {
  render() {
    return <Card title="Welcome">Welcome to WhiteBoard</Card>;
  }
}

let selgerdata = {
  selger_id: '007',
  avdeling: '2'
};

let kundeNr = {};

class Utleie extends Component {
  kunde = {
    fornavn: '',
    etternavn: '',
    epost: '',
    tlf: ''
  };

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
            <label htmlFor="utlevering">Utlevering:</label>
            <select
              className="form-control"
              id="utlevering"
              value={this.utleiedata.utlevering}
              onChange={e => (this.utleiedata.utlevering = e.target.value)}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="innlevering">Innlevering:</label>
            <select
              className="form-control"
              id="innlevering"
              value={this.utleiedata.innlevering}
              onChange={e => (this.utleiedata.innlevering = e.target.value)}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
        </Column>
        <Column>
          <Form.Label>Leie fra:</Form.Label>
          <Form.Input type="time" onChange={e => (this.utleiedata.fraKl = e.target.value)} />
          <Form.Input
            type="date"
            value={this.utleiedata.fradato}
            onChange={e => (this.utleiedata.fradato = e.target.value)}
            pattern=".{10,10}"
            required
          />
          <Form.Label>Leie til:</Form.Label>
          <Form.Input type="time" onChange={e => (this.utleiedata.tilKl = e.target.value)} />
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
          <NavLink to="/utleie/utstyr">Velg utstyr</NavLink>
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
    Object.keys(sykkelValg).forEach(function(key) {
      sykkelArea.value += key + ' ' + sykkelValg[key] + '\n';
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
      kundeNr = this.kunde.kunde_nr;
    });
    this.utleiedata.kunde_nr = kundeNr;
    this.utleiedata.antall_sykler = sykkelTeller;
    console.log(kundeNr);
    console.log(sykkelValg);
    utleieTjenester.utleieSykkel(sykkelValg);
    utleieTjenester.opprettUtleie(this.utleiedata, () => {
      utleieTjenester.hentUtleieData(utleiedata => {
        this.utleiedata = utleiedata;
      });
    });
    history.push('/utleie/');
  }

  delete() {
    studentService.deleteStudent(this.props.match.params.id, () => history.push('/students'));
  }

  cancel() {
    history.push('/students/' + this.props.match.params.id);
  }
}

let kundeLagring = {
  fornavn: '',
  etternavn: '',
  epost: '',
  tlf: ''
};

let utleiedataLagring = {
  selger_id: selgerdata.selger_id,
  avdeling: selgerdata.avdeling,
  utlevering: '',
  innlevering: '',
  fradato: '',
  tildato: '',
  fraKl: '',
  tilKl: '',
  antall_sykler: '',
  kunde_nr: ''
};

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

class VelgSykkel extends Component {
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
  hjelm: '0',
  veske: '0',
  barnevogn: '0'
};

class VelgUtstyr extends Component {
  render() {
    return (
      <div>
        <Column>
          <Form.Label>Hjelm:</Form.Label>
          <Form.Input type="number" onChange={e => (utstyrValg.hjelm = e.target.value)} />
          <Form.Label>Veske:</Form.Label>
          <Form.Input type="number" onChange={e => (utstyrValg.veske = e.target.value)} />
          <Form.Label>Barnevogn:</Form.Label>
          <Form.Input type="number" onChange={e => (utstyrValg.barnevogn = e.target.value)} />
        </Column>
        <Row>
          <Button.Success onClick={this.create}>Legg inn</Button.Success>
          <Button.Light onClick={this.cancel}>Tilbake</Button.Light>
        </Row>
      </div>
    );
  }

  create() {
    history.push('/utleie/');
  }

  cancel() {
    history.push('/utleie/');
  }
}

// ---------------------------------------------------------------------
// import { Utleie, VelgSykkel } from './components/utleie.js'
// export Class
ReactDOM.render(
  <HashRouter>
    <div>
      <Menu />
      <Route exact path="/" component={Home} />
      <Route exact path="/utleie" component={Utleie} />
      <Route exact path="/utleie/sykkel" component={VelgSykkel} />
      <Route exact path="/utleie/utstyr" component={VelgUtstyr} />
    </div>
  </HashRouter>,
  document.getElementById('root')
);
