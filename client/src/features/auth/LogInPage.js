import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import usePersist from "../../hooks/usePersist";

import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation, faFrog } from "@fortawesome/free-solid-svg-icons";
import { useLoginMutation } from "./authApiSlice";
import { setCredentials } from "./authSlice";
import { useDispatch } from "react-redux";

export default function LogInPage() {
  const loginRef = useRef();

  const [persist, setPersist] = usePersist();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    loginRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMsg("");
  }, [username, password]);

  if (isLoading) return <p>Loading...</p>;

  const handleSubmit = async (e) => {
    // alert({ username, password })
    e.preventDefault();

    try {
      const { accessToken } = await login({ username, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setPassword("");
      setUsername("");
      navigate("/");
    } catch (err) {
      if (!err.status) {
        setErrorMsg("No Server Response.");
      } else if (err.status === 400) {
        setErrorMsg("Missing Username or Password.");
      } else if (err.status === 401) {
        setErrorMsg("Unauthorized.");
      } else {
        setErrorMsg(err.data?.message);
      }
    }
  };

  const handleTogglePersist = () => setPersist((prev) => !prev);

  return (
    <Container style={{ maxWidth: "400px", margin: "0 auto" }} className="mt-5">
      <h1>
        <FontAwesomeIcon icon={faFrog} bounce style={{ color: "#0b3805" }} />{" "}
        Ultimate HD
      </h1>
      {errorMsg && (
        <Alert variant={"danger"}>
          <FontAwesomeIcon icon={faCircleExclamation} /> {errorMsg}
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            ref={loginRef}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="off"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="m-3" controlId="persist">
          <Form.Check
            type="checkbox"
            label="Trust this device."
            checked={persist}
            id="persist"
            onChange={handleTogglePersist}
          />
        </Form.Group>

        <Button variant="success" className="ps-4 pe-4" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
}
