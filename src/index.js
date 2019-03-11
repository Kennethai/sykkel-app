import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { studentService, subjectService, mottakTjenester } from './services';
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
      </NavBar>
    );
  }
}

class Home extends Component {
  render() {
    return <Card title="Welcome">Welcome to WhiteBoard</Card>;
  }
}

class Kunde extends Component {
  info = [];

  kunde = {
    fornavn: '',
    etternavn: '',
    tlf: ''
  };

  render() {
    return (
      <div>
        <Column>
          <Form.Label>Fornavn:</Form.Label>
          <Form.Input type="text" value={this.kunde.fornavn} onChange={e => (this.kunde.fornavn = e.target.value)} />
          <Form.Label>Etternavn:</Form.Label>
          <Form.Input
            type="text"
            value={this.kunde.etternavn}
            onChange={e => (this.kunde.etternavn = e.target.value)}
          />
          <Column>
            <Button.Success onClick={this.soknavn}>Søk</Button.Success>
          </Column>
          <Form.Label>Tlf:</Form.Label>
          <Form.Input type="text" value={this.kunde.tlf} onChange={e => (this.kunde.tlf = e.target.value)} />
          <Column>
            <Button.Success onClick={this.soktlf}>Søk</Button.Success>
          </Column>
          <Column>
            <Button.Success onClick={this.hentdata}>Søk</Button.Success>
          </Column>
        </Column>
        <List>
          {this.info.map(kunde => (
            <List.Item key={this.kunde.id} to={'/info/' + kunde.id} />
          ))}
        </List>
        <div id="utdata" />
      </div>
    );
  }

  soknavn() {
    mottakTjenester.hentKunde(this.kunde, () => {
      mottakTjenester.hentKunder(kunder => {
        this.kunder = kunder;
      });
    });
  }

  soktlf() {
    mottakTjenester.hentTlf(this.kunde, () => {
      mottakTjenester.hentKunder(kunder => {
        this.kunder = kunder;
      });
    });
  }
  hentdata() {
    let data = mottakTjenester.hentData(this.kunde);

    mottakTjenester.hentData(this.kunde, () => {
      mottakTjenester.hentKunder(kunder => {
        this.kunder = kunder;
      });
    });
    document.getElementById('utdata').innerHTML = data;
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
      <Route exact path="/mottak" component={Kunde} />
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
