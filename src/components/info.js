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

  utleie = {
    utleieid: ''
  };

  liste = [];

  liste2 = [];

  liste4 = [];
  liste5 = [];

  utstyr = [];
  sykler = [];

  render() {
    return (
      <Card>
        <Column>
          <Column>
            <p> Søk opp spesifikk kunde. </p>
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

          <div id="tabellar">
            <div id="liste1" className="container-fluid">
              <table className="table table-striped hover">
                <thead>
                  <tr>
                    <th> Utleie ID: </th>
                    <th> Fornavn: </th>
                    <th> Etternavn: </th>
                    <th> Tlf: </th>
                    <th> Ut: </th>
                    <th> Inn: </th>
                    <th> Sykler: </th>
                    <th> Utstyr: </th>
                  </tr>
                </thead>
                <tbody>
                  {this.liste.map(e1 => (
                    <tr key={e1.kunde_nr}>
                      <td> {e1.uu == null ? e1.us : e1.uu}</td>
                      <td> {e1.k_fornavn} </td>
                      <td> {e1.k_etternavn} </td>
                      <td> {e1.k_tlf} </td>
                      <td> {e1.utleietid} </td>
                      <td> {e1.innleveringstid} </td>
                      <td> {e1.sykler}</td>
                      <td> {e1.utstyr}</td>
                      <td>{e1.pris} </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <br />
            <Column>
              <p> Finn sykler og utstyr i utleien. </p>
              <Form.Label>Utleie-id:</Form.Label>
              <Form.Input
                type="number"
                value={this.utleie.utleieid}
                onChange={e => (this.utleie.utleieid = e.target.value)}
              />
              <div className="text-right">
                <Button.Success onClick={this.sok_id}>Søk</Button.Success>
              </div>
              <br />
              <div id="liste1" className="container-fluid">
                <table className="table table-striped hover" size="sm">
                  <thead>
                    <tr>
                      <th> Sykkel_id: </th>
                      <th> Utstyr_id: </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.liste4.map((li, i) => (
                      <tr key={li.utleie_id}>
                        <td> {li.sykkel_id} </td>
                        <td> {this.liste5.length > i ? this.liste5[i].utstyr_id : null} </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Column>
            <Card>
              <h3>
                <b>&nbsp;Alle utleier: </b>
              </h3>
              <div id="liste1" className="container-fluid">
                <table className="table table-striped hover" size="sm">
                  <thead>
                    <tr>
                      <th> Utleie ID: </th>
                      <th> Fornavn: </th>
                      <th> Etternavn: </th>
                      <th> Tlf: </th>
                      <th> Ut: </th>
                      <th> Inn: </th>
                      <th> Sykler: </th>
                      <th> Utstyr: </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.liste2.map(e2 => (
                      <tr key={e2.kunde_nr}>
                        <td> {e2.uu == null ? e2.us : e2.uu}</td>
                        <td> {e2.k_fornavn} </td>
                        <td> {e2.k_etternavn} </td>
                        <td> {e2.k_tlf} </td>
                        <td> {e2.utleietid} </td>
                        <td> {e2.innleveringstid} </td>
                        <td> {e2.sykler} </td>
                        <td> {e2.utstyr} </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </Column>
      </Card>
    );
  }

  mounted() {
    infoService.hentAlt(this.kunde, liste2 => {
      this.liste2 = liste2;
    });
  }

  sok_id(utleie) {
    infoService.idInfo(this.utleie, liste4 => {
      this.liste4 = liste4;
      console.log(this.liste4);
      if (this.liste4.length == 0) {
        alert('Utleie-idn du har skrevet inn eksisterer ikke.');
      }
    });
    infoService.UidInfo(this.utleie, liste5 => {
      this.liste5 = liste5;
      console.log(this.liste5);
    });
    this.utleie.utleieid = [];
  }

  sok(kunde) {
    infoService.hentListe(this.kunde, liste => {
      this.liste = liste;
      console.log(this.liste);
    });
    // infoService.utstyrr(this.kunde, liste4 => {
    //   this.liste4 = liste4;
    // });

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
