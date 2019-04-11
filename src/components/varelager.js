import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { varelager, regSykkel, regUtstyr } from './varelager_services';
import { Card, List, Row, Column, NavBar, Button, Form } from '../widgets';
import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

//---------------------------Varelager-------------------------------------

export class Varelageret extends Component {
  info = {
    sykkelid: '',
    utstyrsid: ''
  };

  merinfo = [];

  sykler = [];

  utstyr = [];

  render() {
    //Oversikt over det som skjer i return, ettersom det ikke kan kommenteres inn i return.
    //Søke på sykkel_id
    //Knapp for å søke
    //Søke på sykkel_id
    //knapp for å søke
    //Div for å skrive ut info om sykkel og utstyr
    //Tabell for alle eksisterende sykler
    //Tabell for alle eksisterende utstyr

    return (
      <div>
        <div className="register_menu">
          <NavLink to="/Varelager/nySykkel" className="register">
            Registrer sykkel
          </NavLink>
          <NavLink to="/Varelager/nyUtstyr" className="register">
            Registrer utstyr
          </NavLink>
        </div>
        <Card>
          <Column>
            <Form.Label>Sykkel-id:</Form.Label>
            <Form.Input
              type="number"
              value={this.info.sykkelid}
              onChange={e => (this.info.sykkelid = e.target.value)}
            />
          </Column>
          <Column>
            <div className="text-right">
              <Button.Success onClick={this.sykkel}>Søk</Button.Success>
            </div>
          </Column>
          <Column>
            <Form.Label>Utstyrs-id:</Form.Label>
            <Form.Input
              type="number"
              value={this.info.utstyrsid}
              onChange={e => (this.info.utstyrsid = e.target.value)}
            />
          </Column>
          <Column>
            <div className="text-right">
              <Button.Success onClick={this.utstyrk}>Søk</Button.Success>
            </div>
          </Column>
        </Card>
        <div className="Midtstille">
          <Button.Success onClick={this.sykkeltabell}> SYKKEL </Button.Success>&nbsp;&nbsp;
          <Button.Success onClick={this.utstyrtabell}> UTSTYR </Button.Success>
        </div>
        <br />
        <ul>
          <div className="Liste" id="utdata">
            {' '}
          </div>
          <div id="utdata2"> </div>
        </ul>
        <div className="container-fluid">
          <div className="row">
            <div id="col_sykkel">
              <Column>
                <h4>
                  <b>Sykler:</b>
                </h4>
                <table className="table table-striped hover" size="sm">
                  <thead>
                    <tr>
                      <th> ID: </th>
                      <th> Navn: </th>
                      <th> Type: </th>
                      <th> Pris: </th>
                      <th> Tilhørighet: </th>
                      <th> År: </th>
                      <th> Tilstand: </th>
                      <th> Beskrivelse: </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.sykler.map(sykkel => (
                      <tr key={sykkel.sykkel_id}>
                        <td> {sykkel.sykkel_id} </td>
                        <td> {sykkel.sykkelnavn} </td>
                        <td> {sykkel.sykkeltype} </td>
                        <td> {sykkel.s_utleiepris} </td>
                        <td> {sykkel.s_tilhorighet} </td>
                        <td> {sykkel.s_aar} </td>
                        <td> {sykkel.s_tilstand} </td>
                        <td> {sykkel.s_beskrivelse} </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Column>
            </div>
            <div id="col_utstyr">
              <Column>
                <h4>
                  <b> Utstyr:</b>
                </h4>
                <table className="table table-striped hover" size="sm">
                  <thead>
                    <tr>
                      <th> ID: </th>
                      <th> Navn: </th>
                      <th> Type: </th>
                      <th> Tilhørighet: </th>
                      <th> Passer: </th>
                      <th> Pris: </th>
                      <th> År: </th>
                      <th> Tilstand: </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.utstyr.map(utstyret => (
                      <tr key={utstyret.utstyr_id}>
                        <td> {utstyret.utstyr_id} </td>
                        <td> {utstyret.u_navn} </td>
                        <td> {utstyret.utstyrstype} </td>
                        <td> {utstyret.u_tilhorighet} </td>
                        <td> {utstyret.u_sykkeltype} </td>
                        <td> {utstyret.u_utleiepris} </td>
                        <td> {utstyret.s_tilstand} </td>
                        <td> {utstyret.u_tilstand} </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Column>
            </div>
          </div>
        </div>
      </div>
    );
  }

  //knapp for å vise tabellen for alle sykler
  sykkeltabell() {
    varelager.hentSykkeltabell(this.sykler, sykler => {
      this.sykler = sykler;
      console.log(this.sykler);

      let x = document.getElementById('col_sykkel');
      let y = document.getElementById('col_utstyr');
      if (y.style.display === 'block') {
        (y.style.display = 'none'), (x.style.display = 'block');
      } else {
        x.style.display = 'block';
      }
    });
  }

  //knapp for å vise tabellen for alle utstyr
  utstyrtabell() {
    varelager.hentUtstyrtabell(this.utstyr, utstyr => {
      this.utstyr = utstyr;

      let x = document.getElementById('col_utstyr');
      let y = document.getElementById('col_sykkel');
      if (y.style.display === 'block') {
        (y.style.display = 'none'), (x.style.display = 'block');
      } else {
        x.style.display = 'block';
      }
    });
  }

  //knapp for å vise informasjon om en spsifikk sykkel
  sykkel() {
    varelager.hentsykkel(this.info, merinfo => {
      this.merinfo = [];
      this.merinfo = merinfo;
      utdata.innerText = '';
      //sjekker om sykkelen eksisterer eller alerter, hvis den eksisterer kjøres informasjonen ut.
      if (this.merinfo == undefined) {
        alert('Sykkel med denne IDn finnes ikke!');
      } else {
        Object.keys(this.merinfo).forEach(function(key) {
          utdata.innerText += key + ' ' + merinfo[key] + '\n';
        });
      }
    });
  }

  //knapp for å vise informasjon om et spsifikk utstyr
  utstyrk() {
    varelager.hentutstyr(this.info, merinfo => {
      this.merinfo = [];
      this.merinfo = merinfo;
      utdata.innerText = '';
      //sjekker om utstyret eksisterer eller alerter, hvis det eksisterer kjøres informasjonen ut.
      if (this.merinfo == undefined) {
        alert('Utstyr med denne IDn finnes ikke!');
      } else {
        Object.keys(this.merinfo).forEach(function(key) {
          utdata.innerText += key + ' ' + merinfo[key] + '\n';
        });
      }
    });
  }
}

export class Sykkel extends Component {
  sykkel = {
    type: '',
    merke: '',
    aar: '',
    pris: '',
    tilstand: '',
    sted: '',
    beskrivelse: ''
  };

  sykkelPriser = {
    Tursykkel: 100,
    Terreng: 120,
    Downhill: 150,
    Grusracer: 200,
    Tandem: 175
  };

  render() {
    return (
      <div>
        <div className="register_menu">
          <NavLink to="/Varelager/nySykkel" className="register">
            Registrer sykkel
          </NavLink>
          <NavLink to="/Varelager/nyUtstyr" className="register">
            Registrer utstyr
          </NavLink>
        </div>
        <Card title="Legg inn sykkel">
          <div className="form-group">
            <label htmlFor="type">Type:</label>
            <select className="form-control" id="type" onChange={e => (this.sykkel.type = e.target.value)}>
              <option value="" selected disabled hidden>
                Velg sykkeltype her
              </option>
              <option value="Tursykkel">Tursykkel</option>
              <option value="Terreng">Terrengsykkel</option>
              <option value="Tandem">Tandemsykkel</option>
              <option value="Downhill">Downhillsykkel</option>
              <option value="Grusracer">Racingsykkel</option>
            </select>
          </div>

          <Form.Label>Merke:</Form.Label>
          <Form.Input type="text" value={this.sykkel.merke} onChange={e => (this.sykkel.merke = e.target.value)} />

          <Form.Label>Årsklasse:</Form.Label>
          <Form.Input type="number" value={this.sykkel.aar} onChange={e => (this.sykkel.aar = e.target.value)} />

          <div className="form-group">
            <label htmlFor="type">Tilstand:</label>
            <select className="form-control" id="type" onChange={e => (this.sykkel.tilstand = e.target.value)}>
              <option value="" selected disabled hidden>
                Velg sykkelstatus her
              </option>
              <option value="Ledig">Ledig</option>
              <option value="Utleid">Utleid</option>
            </select>
          </div>

          <Form.Label>Sykkelens tilhørighet:</Form.Label>
          <Form.Input type="text" value={this.sykkel.sted} onChange={e => (this.sykkel.sted = e.target.value)} />

          <Form.Label>Sykkelbeskrivelse/dimensjoner:</Form.Label>
          <Form.Input
            type="text"
            value={this.sykkel.beskrivelse}
            onChange={e => (this.sykkel.beskrivelse = e.target.value)}
          />
        </Card>
        <Row>
          <Column>
            <Button.Success onClick={this.create}>Lagre</Button.Success>
          </Column>
          <Column right>
            <Button.Light onClick={this.cancel}>Tilbake</Button.Light>
          </Column>
        </Row>
      </div>
    );
  }

  create() {
    this.sykkel.pris = this.sykkelPriser[this.sykkel.type];

    regSykkel.opprettSykkel(this.sykkel);
    alert('Sykkelen er lagt til');
    history.push('/Varelager/NySykkel');
  }
  cancel() {
    history.push('/Varelager');
  }
}

export class Utstyr extends Component {
  utstyr = {
    type: '',
    stype: '',
    sted: '',
    pris: '',
    tilstand: '',
    merke: ''
  };

  utstyrPriser = {
    Hjelm: 10,
    Sykkelveske: 20,
    Sykkelvogn: 100,
    Barnesete: 50,
    Drikkesekk: 70
  };

  render() {
    return (
      <div>
        <div className="register_menu">
          <NavLink to="/Varelager/nySykkel" className="register">
            Registrer sykkel
          </NavLink>
          <NavLink to="/Varelager/nyUtstyr" className="register">
            Registrer utstyr
          </NavLink>
        </div>
        <Card title="Legg inn utstyr">
          <div className="form-group">
            <label htmlFor="type">Type:</label>
            <select className="form-control" id="type" onChange={e => (this.utstyr.type = e.target.value)}>
              <option value="" selected disabled hidden>
                Velg utstyrstype her
              </option>
              <option value="Hjelm">Hjelm</option>
              <option value="Barnesete">Barnesete</option>
              <option value="Sykkelveske">Sykkelveske</option>
              <option value="Drikkesekk">Drikkesekk</option>
              <option value="Sykkelvogn">Sykkelvogn</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="type">Passer til sykkel:</label>
            <select className="form-control" id="type" onChange={e => (this.utstyr.stype = e.target.value)}>
              <option value="" selected disabled hidden>
                Velg hvilke sykkeltype utstyret passer til
              </option>
              <option value="Alle">Alle</option>
              <option value="Tur">Tursykkel</option>
              <option value="Terreng">Terrengsykkel</option>
              <option value="Tandem">Tandemsykkel</option>
              <option value="Downhill">Downhillsykkel</option>
              <option value="Racing">Racingsykkel</option>
            </select>
          </div>

          <Form.Label>Merke:</Form.Label>
          <Form.Input type="text" value={this.utstyr.merke} onChange={e => (this.utstyr.merke = e.target.value)} />

          <div className="form-group">
            <label htmlFor="type">Tilstand:</label>
            <select className="form-control" id="type" onChange={e => (this.utstyr.tilstand = e.target.value)}>
              <option value="" selected disabled hidden>
                Velg utstyrstatus her
              </option>
              <option value="Ledig">Ledig</option>
              <option value="Utleid">Utleid</option>
            </select>
          </div>

          <Form.Label>Sykkelens tilhørighet:</Form.Label>
          <Form.Input type="text" value={this.utstyr.sted} onChange={e => (this.utstyr.sted = e.target.value)} />
        </Card>
        <Row>
          <Column>
            <Button.Success onClick={this.create}>Lagre</Button.Success>
          </Column>
          <Column right>
            <Button.Light onClick={this.cancel}>Tilbake</Button.Light>
          </Column>
        </Row>
      </div>
    );
  }

  create() {
    this.utstyr.pris = this.utstyrPriser[this.utstyr.type];
    regUtstyr.opprettUtstyr(this.utstyr);
    alert('Utstyret er lagt til');
    history.push('/Varelager/NyUtstyr');
  }
  cancel() {
    history.push('/Varelager/');
  }
}
