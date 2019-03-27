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
    fornavn: '',
    etternavn: '',
    tlf: ''
  };

  infoList = [];

  render() {
    return (
      <Card>
        <Column>
          <Form.Label>Sykkel-id:</Form.Label>
          <Form.Input type="text" value={this.info.sykkelid} onChange={e => (this.info.sykkelid = e.target.value)} />

          <div class="text-right">
            <Button.Success onClick={this.sok1}>Søk</Button.Success>
          </div>

          <Form.Label>Utstyrs-id:</Form.Label>
          <Form.Input type="text" value={this.info.utstyrsid} onChange={e => (this.info.utstyrsid = e.target.value)} />
          <div class="text-right">
            <Button.Success onClick={this.sok2}>Søk</Button.Success>
          </div>

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

            <div class="text-right">
              <Button.Success onClick={this.sok}>Søk</Button.Success>
            </div>
          </Column>

          <br />
          <ul>
            <div id="infoData" class="Liste" />
          </ul>
        </Column>
      </Card>
    );
  }

  mounted() {}

  sok1() {
    infoService.hentSykkel(this.info, info => {
      this.infoList = info;
      infoData.innerText = '';
      Object.keys(this.infoList).forEach(function(key) {
        infoData.innerText += key + ' ' + info[key] + '\n';
      });
    });
  }

  sok2() {
    infoService.hentUtstyr(this.info, info => {
      this.infoList = info;
      console.log = this.info;
      infoData.innerText = '';
      Object.keys(this.infoList).forEach(function(key) {
        infoData.innerText += key + ' ' + info[key] + '\n';
      });
    });
  }

  sok(kunde) {
    mottakTjenester.hentData(this.kunde, kunde => {
      this.kunde = kunde;
      console.log(this.kunde);
      infoData.innerText = '';
      Object.keys(this.kunde).forEach(function(key) {
        infoData.innerText += key + ' ' + kunde[key] + '\n';
      });
    });
  }
}
