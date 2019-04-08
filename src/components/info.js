import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { infoService } from './info_services';
import { Card, List, Row, Column, NavBar, Button, Form } from '../widgets';
import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

//----------INFO-----------------
export class InfoListe extends Component {
  info = {
    sykkelid: '',
    utstyrsid: ''
  };

  kunde = {
    // fornavn: '',
    // etternavn: '',
    // tlf: ''
  };

  kunder = [];

  liste = [];

  liste2 = [];
  liste3 = [];
  liste4 = [];

  utstyr = [];
  sykler = [];

  render() {
    return (
      <Card>
        <p> Fyll ut alle feltene for iformasjon om spesifikk kunde. </p>
        <Column>
          <Column>
            <Form.Label>Fornavn:</Form.Label>
            <Form.Input type="text" value={this.kunde.fornavn} onChange={e => (this.kunde.fornavn = e.target.value)} />
            <Form.Label>Etternavn:</Form.Label>
            <Form.Input
              type="text"
              value={this.kunde.etternavn}
              onChange={e => (this.kunde.etternavn = e.target.value)}
            />
            <Form.Label>Tlf:</Form.Label>
            <Form.Input type="text" value={this.kunde.tlf} onChange={e => (this.kunde.tlf = e.target.value)} />

            <div className="text-right">
              <Button.Success onClick={this.sok}>Søk</Button.Success>
            </div>
          </Column>
          <br />
          <ul>
            <div id="infoData" className="Liste" />
          </ul>
          <div id="liste1">
            <table className="table table-striped hover" size="sm">
              <thead>
                <tr>
                  <th> Utleie_id: </th>
                  <th> Fornavn: </th>
                  <th> Etternavn: </th>
                  <th> Tlf: </th>
                  <th> Uteleie: </th>
                  <th> Innlevering: </th>
                  <th> Sykler: </th>
                  <th> Utstyr: </th>
                </tr>
              </thead>
              <tbody>
                {this.liste.map((e1, i) => (
                  <tr key={e1.kunde_nr}>
                    <td> {e1.utleie_id} </td>
                    <td> {e1.k_fornavn} </td>
                    <td> {e1.k_etternavn} </td>
                    <td> {e1.k_tlf} </td>
                    <td> {e1.utleietid} </td>
                    <td> {e1.innleveringstid} </td>
                    <td> {this.liste4.length > i ? this.liste4[i].sykler : null} </td>
                    <td> {this.liste4.length > i ? this.liste4[i].utstyr : null} </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Card>
            <Row>
              <h3>
                <b>&nbsp;Alle utleier: </b>
              </h3>

              <table className="table table-striped hover" size="sm">
                <thead>
                  <tr>
                    <th> Utleie_id: </th>
                    <th> Fornavn: </th>
                    <th> Etternavn: </th>
                    <th> Tlf: </th>
                    <th> Uteleie: </th>
                    <th> Innlevering: </th>
                    <th> Sykler: </th>
                    <th> Utstyr: </th>
                  </tr>
                </thead>
                <tbody>
                  {this.liste2.map((e2, i) => (
                    <tr key={e2.kunde_nr}>
                      <td> {e2.utleie_id} </td>
                      <td> {e2.k_fornavn} </td>
                      <td> {e2.k_etternavn} </td>
                      <td> {e2.k_tlf} </td>
                      <td> {e2.utleietid} </td>
                      <td> {e2.innleveringstid} </td>
                      <td> {this.liste3.length > i ? this.liste3[i].sykler : null} </td>
                      <td> {this.liste3.length > i ? this.liste3[i].utstyr : null} </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Row>
          </Card>
        </Column>
      </Card>
    );
  }

  // <table className="table table-striped hover" size="sm">
  //   <thead>
  //     <tr>
  //       <th> utleieid: </th>
  //       <th> sykler: </th>
  //       <th> utleieid: </th>
  //       <th> utstyr: </th>
  //     </tr>
  //   </thead>
  //   <tbody>
  //     {this.utstyr.map(utstyrr => (
  //       <tr key={utstyrr.utstyr_id}>
  //         <td> {utstyrr.sutleie} </td>
  //         <td> {utstyrr.sykler} </td>
  //         <td> {utstyrr.uutleie} </td>
  //         <td> {utstyrr.utstyr} </td>
  //       </tr>
  //     ))}
  //   </tbody>
  // </table>
  //
  // <table className="table table-striped hover" size="sm">
  //   <thead>
  //     <tr>
  //       <th> Sykler: </th>
  //       <th> Pris: </th>
  //     </tr>
  //   </thead>
  //   <tbody>
  //     {this.sykler.map(sykkel => (
  //       <tr key={sykkel.sykkel_id}>
  //         <td> {sykkel.sykler} </td>
  //         <td> {sykkel.pris} </td>
  //       </tr>
  //     ))}
  //   </tbody>
  // </table>

  mounted() {
    infoService.hentAlt(this.kunde, liste2 => {
      this.liste2 = liste2;
    });
    infoService.utstyr(this.kunde, liste3 => {
      this.liste3 = liste3;
    });

    infoService.utstyr(this.kunde, utstyr => {
      this.utstyr = utstyr;
      console.log(this.utstyr);
    });

    // infoService.sykler(this.kunde, sykler => {
    //   this.sykler = sykler;
    //   console.log(this.sykler);
    // });
  }

  sok(kunde) {
    infoService.hentListe(this.kunde, liste => {
      this.liste = liste;
      console.log(this.liste);
    });
    infoService.utstyrr(this.kunde, liste4 => {
      this.liste4 = liste4;
    });

    infoService.hentKunde(this.kunde, kunder => {
      this.kunder = [];
      this.kunder = kunder;
      console.log(kunder);
      infoData.innerText = '';
      if (this.kunder == undefined) {
        alert('Du har skrevet inn en ikke-eksisterende kunde.');
      } else {
        Object.keys(this.kunder).forEach(function(key) {
          infoData.innerText += key + ' ' + kunder[key] + '\n';
        });
      }
    });
    this.kunde.fornavn = [];
    this.kunde.etternavn = [];
    this.kunde.tlf = [];
  }
}
// <td> {Number(listen.s_utleiepris) + Number(listen.u_utleiepris)} </td>
