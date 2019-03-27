import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { varelager, regSykkel } from './varelager_services';
import { Card, List, Row, Column, NavBar, Button, Form } from '../widgets';
import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

//---------------------------Varelager-------------------------------------

export class Varelageret extends Component {
  info = {
    sykkelid: '',
    utstyrsid: ''
  };

  sykler = [];

  utstyr = [];

  render() {
    return (
      <div>
        <Card title="Sykkel-/utstyrs-id">
          <Column>
            <Form.Label>Sykkel-id:</Form.Label>
            <Form.Input type="text" value={this.info.sykkelid} onChange={e => (this.info.sykkelid = e.target.value)} />
          </Column>
          <Column>
            <Button.Success onClick={this.sykkel}>Søk</Button.Success>
          </Column>
          <Column>
            <Form.Label>Utstyrs-id:</Form.Label>
            <Form.Input
              type="text"
              value={this.info.utstyrsid}
              onChange={e => (this.info.utstyrsid = e.target.value)}
            />
          </Column>
          <Column>
            <Button.Success onClick={this.utstyrk}>Søk</Button.Success>
          </Column>
        </Card>

        <Column>
          <Button.Success onClick={this.sykkeltabell}>SYKKEL</Button.Success>

          <Button.Success onClick={this.utstyrtabell}>UTSTYR</Button.Success>
        </Column>

        <div id="utdata"> </div>
        <div id="utdata2"> </div>

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
                      <th> Kommentar: </th>
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
                        <td> {sykkel.Kommentar} </td>
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
                      <th> Sykkeltilhørighet: </th>
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

  // <Card title="Utstyr">
  //   <List>
  //     {this.utstyr.map(utstyret => (
  //       <List.Item key={utstyret.utstyr_id}>
  //         ID: {utstyret.utstyr_id}, Navn: {utstyret.u_navn}, Type: {utstyret.utstyrstype}, Tilhørighet:{' '}
  //         {utstyret.u_tilhorighet}, Sykkeltilhørighet: {utstyret.u_sykkeltype}, Pris: {utstyret.u_utleiepris}{' '}
  //         Tilstand: {utstyret.u_tilstand}
  //       </List.Item>
  //     ))}
  //   </List>
  // </Card>

  // <Card title="Sykkel">
  //   <List>
  //     {this.sykler.map(sykkel => (
  //       <List.Item key={sykkel.sykkel_id}>
  //         ID: {sykkel.sykkel_id}, Navn: {sykkel.sykkelnavn}, Type: {sykkel.sykkeltype}, Pris:{' '}
  //         {sykkel.s_utleiepris}, Tilhørighet: {sykkel.s_tilhorighet}, År: {sykkel.s_aar}, Tilstand:{' '}
  //         {sykkel.s_tilstand}, Beskrivelse: {sykkel.s_beskrivelse}, Kommentar: {sykkel.Kommentar}
  //       </List.Item>
  //     ))}
  //   </List>
  // </Card>

  sykkeltabell() {
    varelager.hentSykkeltabell(this.sykler, sykler => {
      this.sykler = sykler;

      let x = document.getElementById('col_sykkel');
      let y = document.getElementById('col_utstyr');
      if (y.style.display === 'block') {
        (y.style.display = 'none'), (x.style.display = 'block');
      } else {
        x.style.display = 'block';
      }
    });
  }

  utstyrtabell() {
    varelager.hentUtstyrtabell(this.utstyr, utstyr => {
      this.utstyr = utstyr;

      let x = document.getElementById('col_utstyr');
      let y = document.getElementById('col_sykkel');
      if (y.style.display === 'block') {
        (y.style.display = 'none'), (x.style.display = 'block');
      }
    });
  }
  // varelager.hentSykkeltabell(this.info, info => {
  //   this.info = info;
  //   console.log(this.info);
  //   utdata.innerText = '';
  //   Object.keys(this.info).forEach(function(key) {
  //     utdata.innerText += key + ' ' + info[key] + '\n';
  //   });
  // });
  // varelager.hentUtstyrtabell(this.info, info => {
  //   this.info = info;
  //   console.log(this.info);
  //   Object.keys(this.info).forEach(function(key) {
  //     utdata2.innerText += key + ' ' + info[key] + '\n';
  //   });
  // });

  sykkel() {
    varelager.hentsykkel(this.info, info => {
      this.info = info;
      utdata.innerText = '';
      Object.keys(this.info).forEach(function(key) {
        utdata.innerText += key + ' ' + info[key] + '\n';
      });
    });
  }
  utstyrk() {
    varelager.hentutstyr(this.info, info => {
      this.info = info;
      console.log = this.info;
      utdata.innerText = '';
      Object.keys(this.info).forEach(function(key) {
        utdata.innerText += key + ' ' + info[key] + '\n';
      });
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
    beskrivelse: '',
    kommentar: ''
  };

  render() {
    return (
      <div>
        <Card title="Legg inn sykkel">
          <Column>
            <div className="form-group">
              <label htmlFor="type">Type:</label>
              <select className="form-control" id="type" onChange={e => (this.sykkel.type = e.target.value)}>
                <option value="Tur">Tursykkel</option>
                <option value="Terreng">Terrengsykkel</option>
                <option value="Tandem">Tandemsykkel</option>
                <option value="Downhill">Downhillsykkel</option>
                <option value="Racing">Racingsykkel</option>
              </select>
            </div>
          </Column>

          <Form.Label>Merke:</Form.Label>
          <Form.Input type="text" value={this.sykkel.merke} onChange={e => (this.sykkel.merke = e.target.value)} />

          <Form.Label>Årsklasse:</Form.Label>
          <Form.Input type="number" value={this.sykkel.aar} onChange={e => (this.sykkel.aar = e.target.value)} />

          <Form.Label>Pris:</Form.Label>
          <Form.Input type="text" value={this.sykkel.pris} onChange={e => (this.sykkel.pris = e.target.value)} />

          <Form.Label>Tilstand:</Form.Label>
          <Form.Input
            type="text"
            value={this.sykkel.tilstand}
            onChange={e => (this.sykkel.tilstand = e.target.value)}
          />

          <Form.Label>Sykkelens tilhørighet:</Form.Label>
          <Form.Input type="text" value={this.sykkel.sted} onChange={e => (this.sykkel.sted = e.target.value)} />

          <Form.Label>Sykkelbeskrivelse/dimensjoner:</Form.Label>
          <Form.Input
            type="text"
            value={this.sykkel.beskrivelse}
            onChange={e => (this.sykkel.beskrivelse = e.target.value)}
          />

          <Form.Label>Kommentar til sykkel :</Form.Label>
          <Form.Input
            type="text"
            value={this.sykkel.kommentar}
            onChange={e => (this.sykkel.kommentar = e.target.value)}
          />
        </Card>
        <Row>
          <Column>
            <Button.Success onClick={this.create}>Lagre</Button.Success>
          </Column>
          <Column right>
            <Button.Light onClick={this.cancel}>Cancel</Button.Light>
          </Column>
        </Row>
      </div>
    );
  }

  create() {
    regSykkel.opprettSykkel(this.sykkel);
    history.push('/subjects/');
  }
}

// ---------------------------------------------------------------------
