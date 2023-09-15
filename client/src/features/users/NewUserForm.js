import React, { useEffect, useState } from "react";
import { useAddNewUserMutation } from "./usersApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";

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

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess) {
      setUsername('')
      setPassword('')
    //   setRoles([])
      navigate('/users')
    }
  }, [isSuccess, navigate])

  const canSave = [validUsername, validPassword].every(Boolean) && !isLoading

  const onSaveUseClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
        await addNewUser({username, password})
    }
  };
  const content = (
    <>
      {isError && (
        <Alert variant="danger">error: {JSON.stringify(error)}</Alert>
      )}
      <h2>New User</h2>
      <Form className="form" onSubmit={onSaveUseClicked}>
        <Form.Group className="mb-3" controlId="user">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            isValid={validUsername}
            isInvalid={!validUsername}
            type="text"
            placeholder="John"
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
            placeholder="Password"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Text className="text-muted">[4-12 chars incl !@#$%]</Form.Text>
        </Form.Group>

        <Button className="icon-button" title="Save" disabled={!canSave} type="Submit">
          <FontAwesomeIcon icon={faSave} /> Save New User
        </Button>
      </Form>
    </>
  );

  return content;
}
