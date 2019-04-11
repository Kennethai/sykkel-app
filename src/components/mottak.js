import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { mottakTjenester } from './mottak_services';
import { Card, List, Row, Column, NavBar, Button, Form } from '../widgets';
import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

//----Mottak------------------------------

export class KundeListe extends Component {
  kunde = [];

  kunder = [];

  syklene = [];
  utstyr = [];

  checkedSykkel = {};
  checkedUtstyr = {};

  //For å hente ut dagens dato
  date = new Date();
  dd = String(this.date.getDate()).padStart(2, '0');
  mm = String(this.date.getMonth() + 1).padStart(2, '0');
  yyyy = this.date.getFullYear();
  today = this.dd + '/' + this.mm + '/' + this.yyyy + ':' + ' ';

  //Ny kommentar som skal legges inn i spørringen.
  ny_kommentar = this.today + ' Levert';

  render() {
    //Oversikt over det som skjer i return, ettersom det ikke kan kommenteres inn i return.
    //Her søkes kunden opp.
    //Knapp for å søke opp kunde med utleid utstyr og sykler.
    //Tabellen med utleide sykler og checkbokser.
    //Tabellen med utleide utstyr og checkbokser.

    return (
      <div>
        <Card>
          <p> Fyll ut alle feltene! </p>
          <Row>
            <Column>
              <Form.Label>Fornavn:</Form.Label>
              <Form.Input
                type="text"
                id="for"
                value={this.kunde.fornavn}
                onChange={e => (this.kunde.fornavn = e.target.value)}
              />
              <Form.Label>Etternavn:</Form.Label>
              <Form.Input
                type="text"
                id="etter"
                value={this.kunde.etternavn}
                onChange={e => (this.kunde.etternavn = e.target.value)}
              />
              <Form.Label>Tlf:</Form.Label>
              <Form.Input
                type="number"
                id="tlf"
                value={this.kunde.tlf}
                onChange={e => (this.kunde.tlf = e.target.value)}
              />
              <div className="text-right">
                <Button.Success onClick={this.sok}>Søk</Button.Success>
              </div>
            </Column>
          </Row>
          <ul>
            <div className="Liste" id="utdata" />
          </ul>
        </Card>
        <div className="container-fluid">
          <div className="row">
            <Column>
              <table id="col_sykkel" className="table table-striped hover" size="sm">
                <thead>
                  <tr>
                    <th> SykkelID: </th>
                    <th> Type: </th>
                    <th> Utleiedato: </th>
                  </tr>
                </thead>
                <tbody>
                  {this.syklene.map(sykkel => (
                    <tr key={sykkel.sykkel_id}>
                      <td> {sykkel.sykkel_id} </td>
                      <td> {sykkel.sykkeltype} </td>
                      <td> {sykkel.utleietid} </td>
                      <input name="sykkel" id="sykkel1" type="checkbox" onChange={() => this.check(sykkel.sykkel_id)} />
                    </tr>
                  ))}
                </tbody>
              </table>
            </Column>
            <Column>
              <table id="col_utstyr" className="table table-striped hover" size="sm">
                <thead>
                  <tr>
                    <th> UtstyrID: </th>
                    <th> Type: </th>
                    <th> Utleiedato: </th>
                  </tr>
                </thead>
                <tbody>
                  {this.utstyr.map(utstyret => (
                    <tr key={utstyret.utstyr_id}>
                      <td> {utstyret.utstyr_id} </td>
                      <td> {utstyret.utstyrstype} </td>
                      <td> {utstyret.utleietid} </td>
                      <input
                        name="utstyr"
                        id="utstyr1"
                        type="checkbox"
                        checked={this.state.motta}
                        onChange={() => this.utstyr_check(utstyret.utstyr_id)}
                      />
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="text-right">
                <Button.Success onClick={this.motta}>Mottatt</Button.Success>
              </div>
            </Column>
          </div>
        </div>
      </div>
    );
  }

  //Her kjøres funksjonen for å hente ut tabellene for utleiede sykler og utstyr.
  sok() {
    mottakTjenester.hentSykkel(this.kunde, syklene => {
      this.syklene = syklene;
    });
    mottakTjenester.hentUtstyr(this.kunde, utstyr => {
      this.utstyr = utstyr;
    });

    //Her hentes kunde og kjøres ut i en div dersom kundne eksisterer. Hvis ikke kjører alert.
    mottakTjenester.hentKunde(this.kunde, kunder => {
      this.kunder = [];
      this.kunder = kunder;
      console.log(kunder);
      utdata.innerText = '';
      if (this.kunder == undefined) {
        alert('Du har skrevet inn en ikke-eksisterende kunde.');
      } else {
        Object.keys(this.kunder).forEach(function(key) {
          utdata.innerText += key + ' ' + kunder[key] + '\n';
        });
      }
    });

    //Motta-knappen oppdaterer tabellene slik at man kan se utstyr og sykler som gjenstår.
  }
  motta(sykkel_id) {
    mottakTjenester.hentSykkel(this.kunde, syklene => {
      this.syklene = syklene;
    });
    mottakTjenester.hentUtstyr(this.kunde, utstyr => {
      this.utstyr = utstyr;
    });
  }

  //Her sjekker man av boksene og velger hva som skal når man sjekker og av-sjekker boksene for sykler.
  check(sykkel_id, ny_kommentar) {
    if (this.checkedSykkel[sykkel_id]) this.checkedSykkel[sykkel_id] = false;
    else this.checkedSykkel[sykkel_id] = true;
    for (let sykkel_id of Object.keys(this.checkedSykkel)) console.log(sykkel_id, this.checkedSykkel[sykkel_id]);

    for (let sykkel_id of Object.keys(this.checkedSykkel)) {
      if (this.checkedSykkel[sykkel_id] != false) {
        mottakTjenester.mottak(sykkel_id, this.ny_kommentar);
        console.log(sykkel_id);
      } else {
        mottakTjenester.IKKEmottak(sykkel_id, this.ny_kommentar);
        console.log(sykkel_id);
      }
    }
  }

  //Her sjekker man av boksene og velger hva som skal når man sjekker og av-sjekker boksene for utstyr.
  utstyr_check(utstyr_id, ny_kommentar) {
    if (this.checkedUtstyr[utstyr_id]) this.checkedUtstyr[utstyr_id] = false;
    else this.checkedUtstyr[utstyr_id] = true;
    for (let utstyr_id of Object.keys(this.checkedUtstyr)) console.log(utstyr_id, this.checkedUtstyr[utstyr_id]);

    for (let utstyr_id of Object.keys(this.checkedUtstyr)) {
      if (this.checkedUtstyr[utstyr_id] != false) {
        mottakTjenester.Umottak(utstyr_id, this.ny_kommentar);
        console.log(utstyr_id);
      } else {
        mottakTjenester.uIKKEmottak(utstyr_id, this.ny_kommentar);
        console.log(utstyr_id);
      }
    }
  }
}
