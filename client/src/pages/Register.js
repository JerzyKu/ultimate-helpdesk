import React, { useEffect, useRef, useState } from "react";
// import axios from "../api/axios";

//react bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

export default function Register() {
  const usernameRef = useRef();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("zaq1@WSX");
  const [errMsg, setErrMsg] = useState('')

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('')
  }, [user,pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // const response = await axios.post('/register', {user, pwd})
        // console.log(response);
        setUser('')
        setPwd('')
    } catch (error) {
        console.log(error);
        setErrMsg(JSON.stringify(error.message))
    }
  };

  return (
    <>
      <h2>Create New User</h2>
      {errMsg && <Alert variant='danger'>{errMsg}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>username: </Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            ref={usernameRef}
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label>password: </Form.Label>
          <Form.Control
            type="text"
            placeholder="password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
        </Form.Group>
        <Button variant="success" className="ps-4 pe-4" type="submit">
          Create
        </Button>
      </Form>
    </>
  );
}
