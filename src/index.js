import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { Utleie, VelgSykkel, VelgUtstyr } from './components/utleie.js';
import { StatusListe } from './components/status.js';
import { UstatusListe } from './components/status.js';
import { Varelageret, Sykkel, Utstyr } from './components/varelager.js';
import { KundeListe } from './components/mottak.js';
import { InfoListe } from './components/info.js';
import createHashHistory from 'history/createHashHistory';
import { Card, List, Row, Column, NavBar, Button, Form } from './widgets';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

// oppretter navigeringsmeny på toppen av applikasjonen, på tvers av alle sidene
class Menu extends Component {
  render() {
    return (
      <table className="navTable">
        <tbody>
          <tr>
            <td className="navbutton">
              <NavLink to="/Utleie" className="NavLink_Style">
                Utleie
              </NavLink>
            </td>
            <td className="navbutton">
              <NavLink to="/Mottak" className="NavLink_Style">
                Mottak
              </NavLink>
            </td>
            <td className="navbutton">
              <NavLink to="/Varelager" className="NavLink_Style">
                Varelager
              </NavLink>
            </td>
            <td className="navbutton">
              <NavLink to="/Status" className="NavLink_Style">
                Status
              </NavLink>
            </td>
            <td className="navbutton">
              <NavLink to="/Info" className="NavLink_Style">
                Info
              </NavLink>
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
      <Route exact path="/Varelager/nyUtstyr" component={Utstyr} />
      <Route exact path="/Status" component={StatusListe} />
      <Route exact path="/uStatus" component={UstatusListe} />
      <Route exact path="/Info" component={InfoListe} />
    </div>
  </HashRouter>,
  document.getElementById('root')
);
