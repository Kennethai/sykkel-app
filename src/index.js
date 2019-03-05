import * as React from "react";
import { Component } from "react-simplified";
import ReactDOM from "react-dom";
import { NavLink, HashRouter, Route } from "react-router-dom";
import { studentService } from "./services";
import { courseService } from "./services";

import { Card, List, Row, Column, NavBar, Button, Form } from "./widgets";

import createHashHistory from "history/createHashHistory";
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

class Menu extends Component {
  render() {
    return (
      <NavBar brand="WhiteBoard">
        <NavBar.Link to="/students">Students</NavBar.Link>
        <NavBar.Link to="/courses">Course</NavBar.Link>
      </NavBar>
    );
  }
}

class Home extends Component {
  render() {
    return <Card title="Welcome">Welcome to WhiteBoard</Card>;
  }
}

class CourseList extends Component {
  courses = [];

  render() {
    return (
      <Card title="Courses">
        <List>
          {this.courses.map(course => (
            <List.Item key={course.id} to={"/courses/" + course.id}>
              {course.name}
            </List.Item>
          ))}
        </List>
      </Card>
    );
  }

  mounted() {
    courseService.getCourses(courses => {
      this.courses = courses;
    });
  }
}

class CourseDetails extends Component {
  course = null;

  render() {
    if (!this.course) return null;

    return (
      <div>
        <Card title="Course details">
          <Row>
            <Column width={2}>Name:</Column>
            <Column>{this.course.name}</Column>
          </Row>
          <Row>
            <Column width={2}>Emne kode:</Column>
            <Column>{this.course.emne_kode}</Column>
          </Row>
        </Card>
        <Button.Light onClick={this.edit}>Edit</Button.Light>
      </div>
    );
  }

  mounted() {
    courseService.getCourse(this.props.match.params.id, course => {
      this.course = course;
    });
  }

  edit() {
    history.push("/courses/" + this.course.id + "/edit");
  }
}

class CourseEdit extends Component {
  course = null;

  render() {
    if (!this.course) return null;

    return (
      <div>
        <Card title="Edit course">
          <Form.Label>Name:</Form.Label>
          <Form.Input
            type="text"
            value={this.course.name}
            onChange={e => (this.course.name = e.target.value)}
          />
          <Form.Label>Emne-kode:</Form.Label>
          <Form.Input
            type="text"
            value={this.course.emne_kode}
            onChange={e => (this.course.emne_kode = e.target.value)}
          />
        </Card>
        <Row>
          <Column>
            <Button.Success onClick={this.save}>Save</Button.Success>
          </Column>
          <Column left>
            <Button.Success onClick={this.add}>Add</Button.Success>
          </Column>
          <Column right>
            <Button.Light onClick={this.cancel}>Cancel</Button.Light>
          </Column>
        </Row>
      </div>
    );
  }

  mounted() {
    courseService.getCourse(this.props.match.params.id, course => {
      this.course = course;
    });
  }

  save() {
    courseService.updateCourse(this.course, () => {
      history.push("/courses/" + this.props.match.params.id);
    });
  }

  cancel() {
    history.push("/courses/" + this.props.match.params.id);
  }
  add() {
    courseService.addCourse(this.course.emne_kode, this.course.name, () => {
      history.push("/courses");
    });
  }
}

class StudentList extends Component {
  students = [];

  render() {
    return (
      <Card title="Students">
        <List>
          {this.students.map(student => (
            <List.Item key={student.id} to={"/students/" + student.id}>
              {student.name}
            </List.Item>
          ))}
        </List>
      </Card>
    );
  }

  mounted() {
    studentService.getStudents(students => {
      this.students = students;
    });
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
    history.push("/students/" + this.student.id + "/edit");
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
          <Form.Input
            type="text"
            value={this.student.name}
            onChange={e => (this.student.name = e.target.value)}
          />
          <Form.Label>Email:</Form.Label>
          <Form.Input
            type="text"
            value={this.student.email}
            onChange={e => (this.student.email = e.target.value)}
          />
        </Card>
        <Row>
          <Column>
            <Button.Success onClick={this.save}>Save</Button.Success>
          </Column>
          <Column>
            <Button.Success onClick={this.add}>Add</Button.Success>
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
      history.push("/students/" + this.props.match.params.id);
    });
  }

  cancel() {
    history.push("/students/" + this.props.match.params.id);
  }
  add() {
    studentService.addStudent(this.student.name, this.student.email, () => {
      history.push("/students");
    });
  }
}

ReactDOM.render(
  <HashRouter>
    <div>
      <Menu />
      <Route exact path="/" component={Home} />
      <Route exact path="/students" component={StudentList} />
      <Route exact path="/students/:id" component={StudentDetails} />
      <Route exact path="/students/:id/edit" component={StudentEdit} />
      <Route exact path="/courses" component={CourseList} />
      <Route exact path="/courses/:id" component={CourseDetails} />
      <Route exact path="/courses/:id/edit" component={CourseEdit} />
    </div>
  </HashRouter>,
  document.getElementById("root")
);
