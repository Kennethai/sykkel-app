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
              <table className="table table-striped hover" size="sm">
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
                      <input
                        name="sykkel"
                        id="sykkel1"
                        type="checkbox"
                        checked={this.state.motta}
                        onClick={this.motta}
                        onChange={this.handleInputChange}
                      />
                    </tr>
                  ))}
                </tbody>
              </table>
            </Column>
            <Column>
              <table className="table table-striped hover" size="sm">
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
                        onClick={this.motta}
                        type="checkbox"
                        checked={this.state.motta}
                        onChange={this.handleInputChange}
                      />
                    </tr>
                  ))}
                </tbody>
              </table>
            </Column>
          </div>
        </div>
      </div>
    );
  }

  // <table className="table table-striped hover" size="sm">
  //   <thead>
  //     <tr>
  //       <th> KundeNR: </th>
  //       <th> Fornavn: </th>
  //       <th> Etternavn: </th>
  //       <th> Tlf: </th>
  //       <th> SykkelID: </th>
  //       <th> Type: </th>
  //       <th> UtstyrsID: </th>
  //       <th> Type: </th>
  //     </tr>
  //   </thead>
  //   <tbody>
  //     {this.kunder.map(kundes => (
  //       <tr key={kundes.kunde_nr}>
  //         <td> {kundes.kunde_nr} </td>
  //         <td> {kundes.k_fornavn} </td>
  //         <td> {kundes.k_etternavn} </td>
  //         <td> {kundes.k_tlf} </td>
  //       </tr>
  //     ))}
  //     {this.syklene.map(sykkele => (
  //       <tr key={sykkele.sykkel_id}>
  //         <td> {sykkele.sykkel_id} </td>
  //         <td> {sykkele.sykkeltype} </td>
  //       </tr>
  //     ))}
  //     {this.utsyr.map(utstyret => (
  //       <tr key={utstyret.utsyr_id}>
  //         <td> {utstyret.utstyr_id} </td>
  //         <td> {utstyret.utstyrstype} </td>
  //       </tr>
  //     ))}
  //   </tbody>
  // </table>

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

  motta() {
    mottakTjenester.mottak(this.sykkel, sykkel => {
      this.sykkel = sykkel;
      console.log(this.sykkel);
    });
  }
}
