import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react'
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Users from './views/User/Users';


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

function App() {

  const [currentUser, setCurrentUser] = useState();
  const [registrationToggle, setRegistrationToggle] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    client.get("/api/user")
      .then(function (res) {
        setCurrentUser(true);
      })
      .catch(function (error) {
        setCurrentUser(false);
      });
  }, []);

  function update_form_btn() {
    if (registrationToggle) {
      document.getElementById("form_btn").innerHTML = "Register";
      setRegistrationToggle(false);
    } else {
      document.getElementById("form_btn").innerHTML = "Log in";
      setRegistrationToggle(true);
    }
  }

  function submitRegistration(e) {
    e.preventDefault();
    client.post(
      "/api/register",
      {
        email: email,
        username: username,
        password: password
      }
    ).then(function (res) {
      client.post(
        "/api/login",
        {
          email: email,
          password: password
        }
      ).then(function (res) {
        setCurrentUser(true);
      });
    });
  }

  function submitLogin(e) {
    e.preventDefault();
    client.post(
      "/api/login",
      {
        email: email,
        password: password
      }
    ).then(function (res) {
      setCurrentUser(true);
    });
  }

  function submitLogout(e) {
    e.preventDefault();
    client.post(
      "/api/logout",
      { withCredentials: true }
    ).then(function (res) {
      setCurrentUser(false);
    });
  }

  if (currentUser) {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>Authentication App</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <form onSubmit={e => submitLogout(e)}>
                  <Button type="submit" variant="light">Log out</Button>
                </form>
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div className="center">
          <Users />
        </div>
      </div>
    );
  }
  return (

    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Authentication App</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <Button id="form_btn" onClick={update_form_btn} variant="light">Register</Button>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {
        registrationToggle ? (
          <Container>

            <div style={{ display: 'flex', width: '100%', justifyContent: 'center', paddingTop: '50px' }}>
              <div className="center" style={{ width: '350px', border: '1px solid #3333', borderRadius: '8px', padding: '15px' }}>

                <Form onSubmit={e => submitRegistration(e)}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label><Icon icon='ic:baseline-email' fontSize={32} style={{ paddingRight: '10px' }} />
                      Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} style={{ color: '#333', fontSize: '1rem' }} />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>
                      <Icon icon='mdi:user' fontSize={32} style={{ paddingRight: '10px' }} />
                      Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} style={{ color: '#333', fontSize: '1rem' }} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label> <Icon icon='mdi:password' fontSize={32} style={{ paddingRight: '10px' }} />
                      Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={{ color: '#333', fontSize: '1rem' }} />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </div>
            </div>
          </Container>

        ) : (
          <Container>
            <div style={{ display: 'flex', width: '100%', justifyContent: 'center', paddingTop: '50px' }}>
              <div className="center" style={{ width: '350px', border: '1px solid #3333', borderRadius: '8px', padding: '15px' }}>

                <Form onSubmit={e => submitLogin(e)}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>
                      <Icon icon='ic:baseline-email' fontSize={32} style={{ paddingRight: '10px' }} />
                      Email address
                    </Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} style={{ color: '#333', fontSize: '1rem' }} />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>
                      <Icon icon='mdi:password' fontSize={32} style={{ paddingRight: '10px' }} />
                      Password
                    </Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={{ color: '#333', fontSize: '1rem' }} />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </div>
            </div>

          </Container>

        )
      }
    </div>

  );

}

export default App;
