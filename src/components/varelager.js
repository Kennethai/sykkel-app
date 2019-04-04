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

  sykler = [];

  utstyr = [];

  render() {
    return (
      <div>
        <NavLink to="/Varelager/nySykkel">Registrer sykkel</NavLink>
        <NavLink to="/Varelager/nyUtstyr">Regitsrer utstyr</NavLink>
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

        <div id="utdata"> </div>
        <div id="utdata2"> </div>

        <div class="container-fluid">
          <div class="row">
            <Column>
              <Card title="Sykkel">
                <table class="table table-striped hover" size="sm">
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
              </Card>
            </Column>

            <Column>
              <Card title="Utstyr">
                <table class="table table-striped hover" size="sm">
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
              </Card>
            </Column>
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

  mounted() {
    varelager.hentSykkeltabell(this.sykler, sykler => {
      this.sykler = sykler;
    });

    varelager.hentUtstyrtabell(this.utstyr, utstyr => {
      this.utstyr = utstyr;
    });

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
  }
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
    beskrivelse: ''
  };

  render() {
    return (
      <div>
        <Card title="Legg inn sykkel">
          <Column>
            <div className="form-group">
              <label htmlFor="type">Type:</label>
              <select className="form-control" id="type" onChange={e => (this.sykkel.type = e.target.value)}>
                <option value=""> </option>
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

          <Column>
            <div className="form-group">
              <label htmlFor="type">Tilstand:</label>
              <select className="form-control" id="type" onChange={e => (this.sykkel.tilstand = e.target.value)}>
                <option value="" />
                <option value="Ledig">Ledig</option>
                <option value="Utleid">Utleid</option>
              </select>
            </div>
          </Column>

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
            <Button.Light onClick={this.cancel}>Cancel</Button.Light>
          </Column>
        </Row>
      </div>
    );
  }

  create() {
    regSykkel.opprettSykkel(this.sykkel);
    alert('Sykkelen er lagt til');
    history.push('/Varelager/NySykkel');
  }
  cancel() {
    history.push('/Varelager/' + this.props.match.params.id);
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

  render() {
    return (
      <div>
        <Card title="Legg inn ustyr">
          <Column>
            <div className="form-group">
              <label htmlFor="type">Type:</label>
              <select className="form-control" id="type" onChange={e => (this.utstyr.type = e.target.value)}>
                <option value="" />
                <option value="Hjelm">Hjelm</option>
                <option value="Racinghjelm">Racinghjelm</option>
                <option value="Downhillhjelm">Downhillhjelm</option>
                <option value="Barnesete">Barnesete</option>
                <option value="Sykkelveske">Sykkelveske</option>
                <option value="Racingdress">Racingdress</option>
                <option value="Drikkesekk">Drikkesekk</option>
                <option value="Sykkelvogn">Sykkelvogn</option>
              </select>
            </div>
          </Column>

          <Column>
            <div className="form-group">
              <label htmlFor="type">Passer til sykkel:</label>
              <select className="form-control" id="type" onChange={e => (this.utstyr.stype = e.target.value)}>
                <option value="" />
                <option value="Tur">Tursykkel</option>
                <option value="Terreng">Terrengsykkel</option>
                <option value="Tandem">Tandemsykkel</option>
                <option value="Downhill">Downhillsykkel</option>
                <option value="Racing">Racingsykkel</option>
              </select>
            </div>
          </Column>

          <Form.Label>Merke:</Form.Label>
          <Form.Input type="text" value={this.utstyr.merke} onChange={e => (this.utstyr.merke = e.target.value)} />

          <Form.Label>Utleiepris:</Form.Label>
          <Form.Input type="number" value={this.utstyr.pris} onChange={e => (this.utstyr.pris = e.target.value)} />

          <Column>
            <div className="form-group">
              <label htmlFor="type">Tilstand:</label>
              <select className="form-control" id="type" onChange={e => (this.utstyr.tilstand = e.target.value)}>
                <option value="" />
                <option value="Ledig">Ledig</option>
                <option value="Utleid">Utleid</option>
              </select>
            </div>
          </Column>

          <Form.Label>Sykkelens tilhørighet:</Form.Label>
          <Form.Input type="text" value={this.utstyr.sted} onChange={e => (this.utstyr.sted = e.target.value)} />
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
    regUtstyr.opprettUtstyr(this.utstyr);
    alert('Utstyret er lagt til');
    history.push('/Varelager/NyUtstyr');
  }
  cancel() {
    history.push('/Varelager/' + this.props.match.params.id);
  }
}

// ---------------------------------------------------------------------
