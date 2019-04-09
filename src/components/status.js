import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { statusService } from './status_services';
import { Card, List, Row, Column, NavBar, Button, Form } from '../widgets';
import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

//----------STATUS----------------------
export class StatusListe extends Component {
  //For å legge til dato i kommentar:
  date = new Date();
  dd = String(this.date.getDate()).padStart(2, '0');
  mm = String(this.date.getMonth() + 1).padStart(2, '0');
  yyyy = this.date.getFullYear();
  today = this.dd + '/' + this.mm + '/' + this.yyyy + ':' + ' ';

  status = {
    sykkelId: '',
    kommentar: this.today + '', //this.today henter dagens dato og legger dette inn automatisk i input-feltet til "kommentar"
    s_tilstand: ''
  };

  idSykkel = '';

  syklene = [];

  render() {
    return (
      <Card>
        <div>
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
                {' '}
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
              {' '}
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
        </div>
      </Card>
    );
  }

  mounted() {}

  oppdater() {
    statusService.oppdaterStatus(this.status);
    alert('Status er oppdatert');
    //this.status.sykkelId = '';
    //  this.status.s_tilstand.value = '';
    //this.status.kommentar = this.today + '';
  }

  søk() {
    //data lagres i idSykkel, og hentes fra databasen
    statusService.søkStatus(this.idSykkel, syklene => {
      //blanker ut, tilfelle det ligger noe der fra før.
      this.syklene = [];
      //Legger inn info lagret i syklene
      this.syklene = syklene;
      //Blanker ut input-feltet når funksjonen er gjort
      this.idSykkel = '';
      //Benyttet til feilsøking underveis.
      console.log(syklene);
      //Hvis det ikke er noen kommentar lagt inn på sykkelid, kommer det en alert om det, og input-feltet blir også blanket ut
      if (syklene.length == 0) {
        alert('OBS! Finner ingen kommentar på denne sykkelen');
        this.idSykkel = '';
      }
    });
  }
}
