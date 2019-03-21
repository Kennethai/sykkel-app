import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { studentService, subjectService, mottakTjenester, varelager } from './services';
import { Card, List, Row, Column, NavBar, Button, Form } from './widgets';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

class Menu extends Component {
  render() {
    return (
      <NavBar brand="WhiteBoard">
        <NavBar.Link to="/students">Students</NavBar.Link>
        <NavBar.Link to="/subjects">Subjects</NavBar.Link>
        <NavBar.Link to="/mottak">Mottak</NavBar.Link>
        <NavBar.Link to="/varelager">Varelager</NavBar.Link>
      </NavBar>
    );
  }
}

class Home extends Component {
  render() {
    return <Card title="Welcome">Velkommen til sykkelutleie</Card>;
  }
}

class Varelageret extends Component {
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
            <Form.Input
              type="Number"
              value={this.info.sykkelid}
              onChange={e => (this.info.sykkelid = e.target.value)}
            />
          </Column>
          <Column>
            <Button.Success onClick={this.sykkel}>Søk</Button.Success>
          </Column>
          <Column>
            <Form.Label>Utstyrs-id:</Form.Label>
            <Form.Input
              type="Number"
              value={this.info.utstyrsid}
              onChange={e => (this.info.utstyrsid = e.target.value)}
            />
          </Column>
          <Column>
            <Button.Success onClick={this.utstyr}>Søk</Button.Success>
          </Column>
        </Card>

        <div id="utdata" />
        <div id="utdata2" />

        <Card title="Sykkel">
          <List>
            {this.sykler.map(sykkel => (
              <List.Item key={sykkel.sykkel_id}>
                ID: {sykkel.sykkel_id}, Navn: {sykkel.sykkelnavn}, Type: {sykkel.sykkeltype}, Pris:{' '}
                {sykkel.s_utleiepris}, Tilhørighet: {sykkel.s_tilhorighet}, År: {sykkel.s_aar}, Tilstand:{' '}
                {sykkel.s_tilstand}, Beskrivelse: {sykkel.s_beskrivelse}, Kommentar: {sykkel.Kommentar}
              </List.Item>
            ))}
          </List>
        </Card>
        <Card title="Utstyr">
          <List>
            {this.utstyr.map(utstyret => (
              <List.Item key={utstyret.utstyr_id}>
                ID: {utstyret.utstyr_id}, Navn: {utstyret.u_navn}, Type: {utstyret.utstyrstype}, Tilhørighet:{' '}
                {utstyret.u_tilhorighet}, Sykkeltilhørighet: {utstyret.u_sykkeltype}, Pris: {utstyret.u_utleiepris}{' '}
                Tilstand: {utstyret.u_tilstand}
              </List.Item>
            ))}
          </List>
        </Card>
      </div>
    );
  }

  mounted() {
    // MALIN
    varelager.hentSykkeltabell(this.sykler, sykler => {
      this.sykler = sykler;
      console.log(this.sykler);
    });

    varelager.hentUtstyrtabell(this.utstyr, utstyr => {
      this.utstyr = utstyr;
      console.log(this.utstyr);
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

  utstyr() {
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

//----Mottak------------------------------

class KundeListe extends Component {
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

// STUDENTS -----------------------------------------
class StudentList extends Component {
  students = [];

  render() {
    return (
      <div>
        <Card title="Students">
          <List>
            {this.students.map(student => (
              <List.Item key={student.id} to={'/students/' + student.id}>
                {student.name}
              </List.Item>
            ))}
          </List>
        </Card>
        <Button.Light onClick={this.add}>Add</Button.Light>
      </div>
    );
  }

  mounted() {
    studentService.getStudents(students => {
      this.students = students;
    });
  }
  add() {
    history.push('/students/add');
  }
}

class StudentDetails extends Component {
  student = null;

  render() {
    if (!this.student) return null;

    return (
      <div>
        <Card title="Student details">
          <Row>
            <Column width={2}>Name:</Column>
            <Column>{this.student.name}</Column>
          </Row>
          <Row>
            <Column width={2}>Email:</Column>
            <Column>{this.student.email}</Column>
          </Row>
        </Card>
        <Button.Light onClick={this.edit}>Edit</Button.Light>
      </div>
    );
  }

  mounted() {
    studentService.getStudent(this.props.match.params.id, student => {
      this.student = student;
    });
  }

  edit() {
    history.push('/students/' + this.student.id + '/edit');
  }
}

class StudentEdit extends Component {
  student = null;

  render() {
    if (!this.student) return null;

    return (
      <div>
        <Card title="Edit student">
          <Form.Label>Name:</Form.Label>
          <Form.Input type="text" value={this.student.name} onChange={e => (this.student.name = e.target.value)} />
          <Form.Label>Email:</Form.Label>
          <Form.Input type="text" value={this.student.email} onChange={e => (this.student.email = e.target.value)} />
        </Card>
        <Row>
          <Column>
            <Button.Success onClick={this.save}>Save</Button.Success>
          </Column>
          <Column>
            <Button.Light onClick={this.delete}>Delete</Button.Light>
          </Column>
          <Column right>
            <Button.Light onClick={this.cancel}>Cancel</Button.Light>
          </Column>
        </Row>
      </div>
    );
  }

  mounted() {
    studentService.getStudent(this.props.match.params.id, student => {
      this.student = student;
    });
  }

  save() {
    studentService.updateStudent(this.student, () => {
      history.push('/students/' + this.props.match.params.id);
    });
  }

  delete() {
    studentService.deleteStudent(this.props.match.params.id, () => history.push('/students'));
  }

  cancel() {
    history.push('/students/' + this.props.match.params.id);
  }
}

class StudentNew extends Component {
  newStudent = {
    name: '',
    email: ''
  };

  render() {
    return (
      <div>
        <Card title="New student">
          <Form.Label>Name:</Form.Label>
          <Form.Input
            type="text"
            value={this.newStudent.name}
            onChange={e => (this.newStudent.name = e.target.value)}
          />
          <Form.Label>Email:</Form.Label>
          <Form.Input
            type="text"
            value={this.newStudent.email}
            onChange={e => (this.newStudent.email = e.target.value)}
          />
        </Card>
        <Row>
          <Column>
            <Button.Success onClick={this.create}>Save</Button.Success>
          </Column>
          <Column right>
            <Button.Light onClick={this.cancel}>Cancel</Button.Light>
          </Column>
        </Row>
      </div>
    );
  }

  mounted() {
    studentService.getStudent(this.props.match.params.id, student => {
      this.student = student;
    });
  }

  create() {
    studentService.createStudent(this.newStudent, () => {
      studentService.getStudents(students => {
        this.students = students;
      });
    });
    history.push('/students/');
  }

  cancel() {
    history.push('/students/');
  }
}
// SUBJECTS -------------------------------------
class SubjectList extends Component {
  subjects = [];

  render() {
    return (
      <div>
        <Card title="Subjects">
          <List>
            {this.subjects.map(subject => (
              <List.Item key={subject.id} to={'/subjects/' + subject.id}>
                {subject.name}
              </List.Item>
            ))}
          </List>
        </Card>
        <Button.Light onClick={this.add}>Add</Button.Light>
      </div>
    );
  }

  mounted() {
    subjectService.getSubjects(subjects => {
      this.subjects = subjects;
    });
  }
  add() {
    history.push('/subjects/add');
  }
}

class SubjectDetails extends Component {
  subject = null;

  render() {
    if (!this.subject) return null;

    return (
      <div>
        <Card title="Subject details">
          <Row>
            <Column width={2}>Name:</Column>
            <Column>{this.subject.name}</Column>
          </Row>
          <Row>
            <Column width={2}>Code:</Column>
            <Column>{this.subject.kode}</Column>
          </Row>
        </Card>
        <Button.Light onClick={this.edit}>Edit</Button.Light>
      </div>
    );
  }

  mounted() {
    subjectService.getSubject(this.props.match.params.id, subject => {
      this.subject = subject;
    });
  }

  edit() {
    history.push('/subjects/' + this.subject.id + '/edit');
  }
}

class SubjectEdit extends Component {
  subject = null;

  render() {
    if (!this.subject) return null;

    return (
      <div>
        <Card title="Edit subject">
          <Form.Label>Name:</Form.Label>
          <Form.Input type="text" value={this.subject.name} onChange={e => (this.subject.name = e.target.value)} />
          <Form.Label>Code:</Form.Label>
          <Form.Input type="text" value={this.subject.kode} onChange={e => (this.subject.kode = e.target.value)} />
        </Card>
        <Row>
          <Column>
            <Button.Success onClick={this.save}>Save</Button.Success>
          </Column>
          <Column>
            <Button.Light onClick={this.delete}>Delete</Button.Light>
          </Column>
          <Column right>
            <Button.Light onClick={this.cancel}>Cancel</Button.Light>
          </Column>
        </Row>
      </div>
    );
  }

  mounted() {
    subjectService.getSubject(this.props.match.params.id, subject => {
      this.subject = subject;
    });
  }

  save() {
    subjectService.updateSubject(this.subject, () => {
      history.push('/subjects/' + this.props.match.params.id);
    });
  }

  delete() {
    subjectService.deleteSubject(this.props.match.params.id, () => history.push('/students'));
  }

  cancel() {
    history.push('/subjects/' + this.props.match.params.id);
  }
}

class SubjectNew extends Component {
  newSubject = {
    name: '',
    kode: ''
  };

  render() {
    return (
      <div>
        <Card title="New subject">
          <Form.Label>Name:</Form.Label>
          <Form.Input
            type="text"
            value={this.newSubject.name}
            onChange={e => (this.newSubject.name = e.target.value)}
          />
          <Form.Label>Code:</Form.Label>
          <Form.Input
            type="text"
            value={this.newSubject.kode}
            onChange={e => (this.newSubject.kode = e.target.value)}
          />
        </Card>
        <Row>
          <Column>
            <Button.Success onClick={this.create}>Save</Button.Success>
          </Column>
          <Column right>
            <Button.Light onClick={this.cancel}>Cancel</Button.Light>
          </Column>
        </Row>
      </div>
    );
  }

  mounted() {
    studentService.getStudent(this.props.match.params.id, student => {
      this.student = student;
    });
  }

  create() {
    subjectService.createSubject(this.newSubject, () => {
      subjectService.getSubjects(subjects => {
        this.subjects = subjects;
      });
    });
    history.push('/subjects/');
  }

  cancel() {
    history.push('/subjects/');
  }
}

// ---------------------------------------------------------------------

ReactDOM.render(
  <HashRouter>
    <div>
      <Menu />
      <Route exact path="/" component={Home} />
      <Route exact path="/varelager" component={Varelageret} />
      <Route exact path="/mottak" component={KundeListe} />
      <Route exact path="/students" component={StudentList} />
      <Route exact path="/students/:id" component={StudentDetails} />
      <Route exact path="/students/:id/edit" component={StudentEdit} />
      <Route exact path="/students/add" component={StudentNew} />
      <Route exact path="/subjects" component={SubjectList} />
      <Route exact path="/subjects/:id" component={SubjectDetails} />
      <Route exact path="/subjects/:id/edit" component={SubjectEdit} />
      <Route exact path="/subjects/add" component={SubjectNew} />
    </div>
  </HashRouter>,
  document.getElementById('root')
);
