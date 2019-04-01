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
  kunde = {
    fornavn: '',
    etternavn: '',
    tlf: ''
  };

  syklene = [];
  utstyr = [];

  checkedSykkel = {};

  render() {
    return (
      <div>
        <Card title="Mottak:">
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
                        onChange={e => (this.col_utstyr = e.target.value)}
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

  mounted(kunde) {
    // mottakTjenester.hentData(this.kunde, kunde => {
    //   this.kunde = kunde;
    // });
    // Object.keys(this.info).forEach(function(key) {
    //   console.log(key, this.info[key]);
    // });
    // Object.keys(kunde).forEach(function(key) {
    //   console.log(key, kunde[key]);
    // });
  }
  sok() {
    mottakTjenester.hentSykkel(this.kunde, syklene => {
      this.syklene = syklene;
    });
    mottakTjenester.hentUtstyr(this.kunde, utstyr => {
      this.utstyr = utstyr;
    });

    mottakTjenester.hentKunde(this.kunde, kunde => {
      this.kunde = kunde;
      utdata.innerText = '';
      Object.keys(this.kunde).forEach(function(key) {
        utdata.innerText += key + ' ' + kunde[key] + '\n';
      });
    });
  }

  motta(sykkel_id) {
    mottakTjenester.mottak(this.checkedSykkel[sykkel_id], checkedSykkel => {
      this.checkedSykkel = checkedSykkel;
      console.log(this.checkSykkel[sykkel_id]);
    });
  }
  check(sykkel_id) {
    if (this.checkedSykkel[sykkel_id]) this.checkedSykkel[sykkel_id] = false;
    else this.checkedSykkel[sykkel_id] = true;
    for (let sykkel_id of Object.keys(this.checkedSykkel)) console.log(sykkel_id, this.checkedSykkel[sykkel_id]);
    // this.checkedsykkel.push(this.syklene[sectionRowIndex].sykkel.sykkel_id);
  }
}
