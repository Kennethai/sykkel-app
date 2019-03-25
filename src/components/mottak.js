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

  render() {
    return (
      <div>
        <Card title="Finn kunde:">
          <Row>
            <Column>
              <Form.Label>Fornavn:</Form.Label>
              <Form.Input
                type="text"
                value={this.kunde.fornavn}
                onChange={e => (this.kunde.fornavn = e.target.value)}
              />
              <Form.Label>Etternavn:</Form.Label>
              <Form.Input
                type="text"
                value={this.kunde.etternavn}
                onChange={e => (this.kunde.etternavn = e.target.value)}
              />
              <Form.Label>Tlf:</Form.Label>
              <Form.Input type="text" value={this.kunde.tlf} onChange={e => (this.kunde.tlf = e.target.value)} />
              <Column>
                <Button.Success onClick={this.sok}>Søk</Button.Success>
              </Column>
            </Column>
          </Row>
        </Card>
        <div id="utdata" />
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
  sok(kunde) {
    mottakTjenester.hentData(this.kunde, kunde => {
      this.kunde = kunde;
      console.log(this.kunde);
      utdata.innerText = '';
      Object.keys(this.kunde).forEach(function(key) {
        utdata.innerText += key + ' ' + kunde[key] + '\n';
      });
    });
  }
}
