import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { statusService, utstyrStatus } from './status_services';
import { Card, List, Row, Column, NavBar, Button, Form } from '../widgets';
import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

//----------STATUS----------------------
export class UstatusListe extends Component {
  //For å legge til dato i kommentar:
  date = new Date();
  dd = String(this.date.getDate()).padStart(2, '0');
  mm = String(this.date.getMonth() + 1).padStart(2, '0');
  yyyy = this.date.getFullYear();
  today = this.dd + '/' + this.mm + '/' + this.yyyy + ':' + ' ';

  // her lagrer vi det som blir skrevet inn av bruker
  status = {
    utstyrId: '',
    kommentar: this.today + '',
    u_tilstand: ''
  };

  // disse tar i mot svar fra databasen
  idUtstyr = '';
  utstyret = [];

  render() {
    return (
      <div>
        <div className="substatus">
          <NavLink to="/Status/" className="register">
            Status sykkel
          </NavLink>
          <NavLink to="/uStatus/" className="register">
            Status utstyr
          </NavLink>
        </div>
        <Card>
          <Column>
            <Form.Label>Utstyr_Id:</Form.Label>
            <Form.Input
              type="text"
              value={this.status.utstyrId}
              onChange={e => (this.status.utstyrId = e.target.value)}
            />
            <div className="form-group">
              <label htmlFor="statusMeny">Velg status:</label>
              <select
                className="form-control"
                id="statusMeny"
                onChange={e => (this.status.u_tilstand = e.target.value)}
              >
                <option value="">Velg status</option>
                <option value="Ledig">Ledig</option>
                <option value="Reperasjon">Reperasjon</option>
                <option value="Stjålet">Stjålet</option>
              </select>
            </div>
            <Form.Label>Kommentar:</Form.Label>
            <Form.Input
              type="text"
              value={this.status.kommentar}
              onChange={e => (this.status.kommentar = e.target.value)}
            />
            <div className="text-right">
              <Button.Success onClick={this.oppdater}>Oppdater</Button.Success>
            </div>
          </Column>{' '}
          <br />
          <Column>
            <Form.Label>Søk på Utstyr_Id: </Form.Label>
            <Form.Input type="text" value={this.idUtstyr} onChange={e => (this.idUtstyr = e.target.value)} />
            <div className="text-right">
              <Button.Success onClick={this.søk}>Søk</Button.Success>
            </div>
          </Column>
          <br />
          <ul>
            <div id="statusData" className="Liste">
              <Column>
                <table id="col_sykkel" className="table table-striped hover" size="sm">
                  <thead>
                    <tr>
                      <th> Utstyr_ID: </th>
                      <th> Status: </th>
                      <th> Kommentar: </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.utstyret.map(utstyr => (
                      <tr key={utstyr.utstyr_id}>
                        <td> {utstyr.utstyr_id} </td>
                        <td> {utstyr.utstyr_status} </td>
                        <td> {utstyr.kommentar} </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Column>
            </div>
          </ul>
        </Card>
      </div>
    );
  }

  mounted() {}

  // funksjon for å legge inn ny status på sykkel
  oppdater() {
    utstyrStatus.oppdaterUstatus(this.status);
    alert('Status er oppdatert');
  }

  // funksjon for å hente eksisterende historikk om sykkel
  søk() {
    utstyrStatus.søkUstatus(this.idUtstyr, utstyret => {
      this.utstyret = [];
      this.utstyret = utstyret;
      this.idUtstyr = '';
      console.log(utstyret);
      if (utstyret.length == 0) {
        alert('OBS! Finner ingen kommentar på dette utstyret!');
        this.idUtstyr = '';
      }
    });
  }
}

export class StatusListe extends Component {
  //For å legge til dato i kommentar:
  date = new Date();
  dd = String(this.date.getDate()).padStart(2, '0');
  mm = String(this.date.getMonth() + 1).padStart(2, '0');
  yyyy = this.date.getFullYear();
  today = this.dd + '/' + this.mm + '/' + this.yyyy + ':' + ' ';

  // her lagrer vi det som blir skrevet inn av bruker
  status = {
    sykkelId: '',
    kommentar: this.today + '',
    s_tilstand: ''
  };

  // disse tar i mot svar fra databasen
  idSykkel = '';
  syklene = [];

  render() {
    return (
      <div>
        <div className="substatus">
          <NavLink to="/Status/" className="register">
            Status sykkel
          </NavLink>
          <NavLink to="/uStatus/" className="register">
            Status utstyr
          </NavLink>
        </div>
        <Card>
          <Column>
            <Form.Label>Sykkel_Id:</Form.Label>
            <Form.Input
              type="text"
              value={this.status.sykkelId}
              onChange={e => (this.status.sykkelId = e.target.value)}
            />
            <div className="form-group">
              <label htmlFor="statusMeny">Velg status:</label>
              <select
                className="form-control"
                id="statusMeny"
                onChange={e => (this.status.s_tilstand = e.target.value)}
              >
                <option value="">Velg status</option>
                <option value="Ledig">Ledig</option>
                <option value="Reperasjon">Reperasjon</option>
                <option value="Stjålet">Stjålet</option>
              </select>
            </div>
            <Form.Label>Kommentar:</Form.Label>
            <Form.Input
              type="text"
              value={this.status.kommentar}
              onChange={e => (this.status.kommentar = e.target.value)}
            />
            <div className="text-right">
              <Button.Success onClick={this.oppdater}>Oppdater</Button.Success>
            </div>
          </Column>{' '}
          <br />
          <Column>
            <Form.Label>Søk på sykkel_Id: </Form.Label>
            <Form.Input type="text" value={this.idSykkel} onChange={e => (this.idSykkel = e.target.value)} />
            <div className="text-right">
              <Button.Success onClick={this.søk}>Søk</Button.Success>
            </div>
          </Column>
          <br />
          <ul>
            <div id="statusData" className="Liste">
              <Column>
                <table id="col_sykkel" className="table table-striped hover" size="sm">
                  <thead>
                    <tr>
                      <th> Sykkel_ID: </th>
                      <th> Status: </th>
                      <th> Kommentar: </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.syklene.map(sykkel => (
                      <tr key={sykkel.sykkel_id}>
                        <td> {sykkel.sykkel_id} </td>
                        <td> {sykkel.sykkel_status} </td>
                        <td> {sykkel.kommentar} </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Column>
            </div>
          </ul>
        </Card>
      </div>
    );
  }

  mounted() {}

  // funksjon for å legge inn ny status på sykkel
  oppdater() {
    statusService.oppdaterStatus(this.status);
    alert('Status er oppdatert');
  }

  // funksjon for å hente eksisterende historikk om sykkel
  søk() {
    statusService.søkStatus(this.idSykkel, syklene => {
      this.syklene = [];
      this.syklene = syklene;
      this.idSykkel = '';
      console.log(syklene);
      if (syklene.length == 0) {
        alert('OBS! Finner ingen kommentar på denne sykkelen');
        this.idSykkel = '';
      }
    });
  }
}
