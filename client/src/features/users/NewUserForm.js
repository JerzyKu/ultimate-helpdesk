import React, { useEffect, useState } from "react";
import { useAddNewUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";

//fontAwsome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

//ReactBootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,14}$/;

export default function NewUserForm() {
  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [firstName, setFirstName] = useState(undefined);
  const [lastName, setLastName] = useState(undefined);
  const [jobTitle, setJobTitle] = useState(undefined);
  const [email, setemail] = useState(undefined);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess) {
      setUsername("");
      setPassword("");
      //   setRoles([])
      navigate("/users");
    }
  }, [isSuccess, navigate]);

  const canSave = [validUsername, validPassword].every(Boolean) && !isLoading;

  const onSaveUseClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewUser({
        username,
        password,
        firstName,
        lastName,
        email,
        jobTitle,
      });
    }
  };
  const content = (
    <>
      {isError && (
        <Alert variant="danger">error: {JSON.stringify(error)}</Alert>
      )}
      <h2>New User</h2>
      <Form className="form" onSubmit={onSaveUseClicked}>
        <Form.Group className="mb-3" controlId="firstName">
          <Form.Label>First Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter First Name"
            autoComplete="off"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="lastName">
          <Form.Label>Last Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Last Name"
            autoComplete="off"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="jobTitle">
          <Form.Label>Job Title:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter jobTitle"
            autoComplete="off"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>email:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            autoComplete="off"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            isValid={validUsername}
            isInvalid={!validUsername}
            type="text"
            placeholder="Enter Username."
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Form.Text className="text-muted">[3-20 letters]</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            isValid={validPassword}
            isInvalid={!validPassword}
            type="password"
            placeholder="Enter password."
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Text className="text-muted">[4-12 chars incl !@#$%]</Form.Text>
        </Form.Group>

        <Button
          className="icon-button"
          title="Save"
          disabled={!canSave}
          type="Submit"
        >
          <FontAwesomeIcon icon={faSave} /> Save New User
        </Button>
      </Form>
    </>
  );

  return content;
}
