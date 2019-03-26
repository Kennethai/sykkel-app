import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { Utleie, VelgSykkel, VelgUtstyr } from './components/utleie.js';
import { StatusListe } from './components/status.js';
import { Varelageret, Sykkel } from './components/varelager.js';
import { KundeListe } from './components/mottak.js';
import createHashHistory from 'history/createHashHistory';
import { Card, List, Row, Column, NavBar, Button, Form } from './widgets';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

class Menu extends Component {
  render() {
    return (
      <table>
        <tbody>
          <tr>
            <td>
              <NavBar brand="Hjem" />
            </td>
            <td>
              <NavBar.Link to="/Utleie">Utleie</NavBar.Link>
            </td>
            <td>
              <NavBar.Link to="/Mottak">Mottak</NavBar.Link>
            </td>
            <td>
              <NavBar.Link to="/Varelager">Varelager</NavBar.Link>
            </td>
            <td>
              <NavBar.Link to="/Status">Status</NavBar.Link>
            </td>
            <td>
              <NavBar.Link to="/Info">Info</NavBar.Link>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

class Home extends Component {
  render() {
    return <Card title="Velkommen">AS SykkelUtleie</Card>;
  }
}

// -----------------------HASHROUTER-----------------------------------------

// export Class
ReactDOM.render(
  <HashRouter>
    <div>
      <Menu />
      <Route exact path="/" component={Home} />
      <Route exact path="/Utleie" component={Utleie} />
      <Route exact path="/Utleie/sykkel" component={VelgSykkel} />
      <Route exact path="/Utleie/utstyr" component={VelgUtstyr} />
      <Route exact path="/Mottak" component={KundeListe} />
      <Route exact path="/Varelager" component={Varelageret} />
      <Route exact path="/Varelager/nySykkel" component={Sykkel} />
      <Route exact path="/Status" component={StatusListe} />
    </div>
  </HashRouter>,
  document.getElementById('root')
);
