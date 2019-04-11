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
  utlevering: '',
  innlevering: '',
  fradato: '',
  tildato: '',
  fraKl: '',
  tilKl: '',
  kunde_nr: ''
};

// forhåndsbestemte priser (bør flyttes til eget dokument ved videre arbeid)
let sykkelPriser = {
  Tursykkel: 100,
  Terreng: 120,
  Downhill: 150,
  Grusracer: 200,
  Tandem: 175
};

let utstyrPriser = {
  Hjelm: 10,
  Sykkelveske: 20,
  Sykkelvogn: 100,
  Barnesete: 50,
  Drikkesekk: 70
};

export class Utleie extends Component {
  //henter inn mellomlagring ved innlasting av siden
  kunde = kundeLagring;
  utleiedata = utleiedataLagring;
  kommentar = '';

  //For å legge til dato i kommentar:
  date = new Date();
  dd = String(this.date.getDate()).padStart(2, '0');
  mm = String(this.date.getMonth() + 1).padStart(2, '0');
  yyyy = this.date.getFullYear();
  today = this.dd + '/' + this.mm + '/' + this.yyyy + ':' + ' ';

  prisBeregningSykkel =
    Number(GetPropertyValue(sykkelValg, 'Tursykkel')) * sykkelPriser.Tursykkel +
    Number(GetPropertyValue(sykkelValg, 'Terreng')) * sykkelPriser.Terreng +
    Number(GetPropertyValue(sykkelValg, 'Downhill')) * sykkelPriser.Downhill +
    Number(GetPropertyValue(sykkelValg, 'Grusracer')) * sykkelPriser.Grusracer +
    Number(GetPropertyValue(sykkelValg, 'Tandem')) * sykkelPriser.Tandem;

  prisBeregningUtstyr =
    Number(GetPropertyValue(utstyrValg, 'Hjelm')) * utstyrPriser.Hjelm +
    Number(GetPropertyValue(utstyrValg, 'Sykkelveske')) * utstyrPriser.Sykkelveske +
    Number(GetPropertyValue(utstyrValg, 'Sykkelvogn')) * utstyrPriser.Sykkelvogn +
    Number(GetPropertyValue(utstyrValg, 'Barnesete')) * utstyrPriser.Barnesete +
    Number(GetPropertyValue(utstyrValg, 'Drikkesekk')) * utstyrPriser.Drikkesekk;

  totalPris = this.prisBeregningSykkel + this.prisBeregningUtstyr * rabatt;

  render() {
    return (
      <div>
        <Column>
          <form id="søk_kunde">
            <Form.Label>Søk opp eksisterende kunde på telefonnummer:</Form.Label>
            <Form.Input
              type="text"
              value={this.kunde.tlf}
              onChange={e => (this.kunde.tlf = e.target.value)}
              pattern=".{8,11}"
              placeholder="123 45 678"
              required
            />
            <Button.Success id="color_button" onClick={this.search}>
              Legg inn
            </Button.Success>
          </form>
        </Column>
        <br />
        <br />
        <Column>
          <h4>Ny kunde</h4>
          <form id="ny_kunde">
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

            <div className="form-group">
              <label>Utlevering:</label>
              <select className="form-control" onChange={e => (this.utleiedata.utlevering = e.target.value)}>
                <option value="" selected disabled hidden>
                  Velg utleveringssted her
                </option>
                <option value="Rallarvegen">Rallarvegen</option>
                <option value="Haugastøl">Haugastøl</option>
                <option value="Finse">Finse</option>
              </select>
            </div>

            <div className="form-group">
              <label>Innlevering:</label>
              <select className="form-control" onChange={e => (this.utleiedata.innlevering = e.target.value)}>
                <option value="" selected disabled hidden>
                  Velg innleveringssted her
                </option>
                <option value="Haugastøl" defaultValue>
                  Haugastøl
                </option>
                <option value="Finse">Finse</option>
                <option value="Rallarvegen">Rallarvegen</option>
              </select>
            </div>

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
          </form>
        </Column>
        <Column>
          <NavLink to="/utleie/sykkel" onClick={this.lagring}>
            Velg sykkel
          </NavLink>
          <br />
        </Column>

        <Column>
          <NavLink to="/utleie/utstyr" onClick={this.lagring}>
            Velg utstyr
          </NavLink>
        </Column>

        <Column>
          <div className="form-group">
            <label htmlFor="sykkelArea">Bestilling:</label>
            <br />
            <textarea className="Liste" rows="5" id="sykkelArea" />
          </div>
        </Column>

        <Row>
          <Column>
            <div className="text-center">
              <Button.Light onClick={this.resetForm}>Tøm Skjema</Button.Light>
            </div>
            <div className="text-right">
              <Button.Success onClick={this.create}>Legg inn</Button.Success>
            </div>
          </Column>
        </Row>
        <br />
      </div>
    );
  }

  mounted() {
    // fyller inn tekstfeltet med antall utlånt utstyr
    sykkelArea.value += 'SYKLER\n';
    Object.keys(sykkelValg).forEach(function(key) {
      sykkelArea.value += key + ': ' + sykkelValg[key] + '\n';
    });
    sykkelArea.value += '\nUTSTYR\n';
    Object.keys(utstyrValg).forEach(function(key) {
      sykkelArea.value += key + ': ' + utstyrValg[key] + '\n';
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
      utleieTjenester.opprettUtleie(this.utleiedata);
      // henter utleie_id fra db
      utleieTjenester.hentUtleieId(this.utleiedata, utleiedata => {
        utleieId = utleiedata.utleie_id;

        //sender info om utlånet til db

        this.kommentar = this.today + 'Utlånt av ' + this.kunde.k_fornavn + ' ' + this.kunde.k_etternavn;

        let ids = [];
        utleieTjenester.velgSykkel(sykkelValg, results => {
          if (results != undefined) {
            for (var i = 0; i < results.length; i++) {
              ids.push(results[i].sykkel_id);
              console.log(results[i].sykkel_id);
            }
          }

          // registrerer sykler for utlån i db
          for (var i = 0; i < ids.length; i++) {
            console.log('Oppdaterer kommentar for sykkel ' + ids[i] + '.');
            utleieTjenester.utleieSykkel(utleieId, ids[i], this.kommentar);
          }

          // registrerer utstyr for utlån i db, dersom det blir lånt tilleggsutstyr
          if (utstyrTeller > 0) {
            let u_ids = [];
            utleieTjenester.velgUtstyr(utstyrValg, results => {
              if (results != undefined) {
                for (var i = 0; i < results.length; i++) {
                  u_ids.push(results[i].utstyr_id);
                  console.log(results[i].utstyr_id);
                }
              }

              console.log(u_ids.toString());

              for (var i = 0; i < u_ids.length; i++) {
                utleieTjenester.utleieUtstyr(utleieId, u_ids[i], this.kommentar);
              }
            });
          }
        });
      });
    });
    alert('Utleie registert\nTotal pris kr ' + this.totalPris);
  }

  // tømmer skjemaet og all mellomlagring
  resetForm() {
    søk_kunde.reset();
    ny_kunde.reset();
    this.kunde = [];
    this.utleiedata = [];
    kundeLagring = {
      fornavn: '',
      etternavn: '',
      epost: '',
      tlf: ''
    };
    utleiedataLagring = {
      utlevering: '',
      innlevering: '',
      fradato: '',
      tildato: '',
      fraKl: '',
      tilKl: '',
      kunde_nr: ''
    };
    sykkelValg = {};
  }

  // søker opp og lagrer informasjon om eksisterende kunde for bruk i nytt utleie
  search() {
    utleieTjenester.hentKunde(this.kunde, kunde => {
      this.kunde = kunde;
      this.kunde.fornavn = this.kunde.k_fornavn;
      this.kunde.etternavn = this.kunde.k_etternavn;
      this.kunde.epost = this.kunde.k_epost;
      this.kunde.tlf = this.kunde.k_tlf;
    });
  }
}

// antall sykler av valgt type
let sykkelValg = {
  Tursykkel: '',
  Terreng: '',
  Downhill: '',
  Grusracer: '',
  Tandem: ''
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
          <Form.Input type="number" onChange={e => (sykkelValg.Tursykkel = e.target.value)} />
          <Form.Label>Terreng:</Form.Label>
          <Form.Input type="number" onChange={e => (sykkelValg.Terreng = e.target.value)} />
          <Form.Label>Downhill:</Form.Label>
          <Form.Input type="number" onChange={e => (sykkelValg.Downhill = e.target.value)} />
          <Form.Label>Racing:</Form.Label>
          <Form.Input type="number" onChange={e => (sykkelValg.Grusracer = e.target.value)} />
          <Form.Label>Tandem:</Form.Label>
          <Form.Input type="number" onChange={e => (sykkelValg.Tandem = e.target.value)} />
          <br />
          <Row>
            <Button.Success onClick={this.create}>Legg inn</Button.Success>
            <Button.Light onClick={this.cancel}>Tilbake</Button.Light>
          </Row>
        </Column>
      </div>
    );
  }

  // valgte antall blir lagret ved input, her oppdaterer vi telleren og sender brukeren tilbake for å fortsette innsending av skjema
  create() {
    sykkelTeller =
      Number(GetPropertyValue(sykkelValg, 'Tursykkel')) +
      Number(GetPropertyValue(sykkelValg, 'Terreng')) +
      Number(GetPropertyValue(sykkelValg, 'Downhill')) +
      Number(GetPropertyValue(sykkelValg, 'Grusracer')) +
      Number(GetPropertyValue(sykkelValg, 'Tandem'));
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
          <br />
          <Row>
            <Button.Success onClick={this.create}>Legg inn</Button.Success>
            <Button.Light onClick={this.cancel}>Tilbake</Button.Light>
          </Row>
        </Column>
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

// her lager vi mengden rabatt som skal gis basert på telleren av totalt antall sykler
let rabatt = '';

if (sykkelTeller > 3 && sykkelTeller < 6) {
  rabatt = 0.9; // 4 sykler eller mer gir 10% rabatt
} else {
  if (sykkelTeller > 5) {
    rabatt = 0.75; // 6 sykler eller mer gir 25% rabatt
  } else {
    rabatt = 1;
  }
}
