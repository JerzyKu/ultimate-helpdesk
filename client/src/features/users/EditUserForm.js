import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";
import { useDeleteUserMutation, useUpdateUserMutation } from "./usersApiSlice";
import Select from "react-select";
import { ROLES } from "../../config/roles";

const PWD_REGEX = /^[A-z0-9!@#$%]{4,14}$/;

export default function EditUserForm({ user }) {
  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();

  const [
    deleteUser,
    { isSuccess: idDelSuccess, isError: isDelError, error: delError },
  ] = useDeleteUserMutation();

  const navigate = useNavigate();

  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [jobTitle, setJobTitle] = useState(user?.jobTitle);
  const [email, setemail] = useState(user?.email);
  const [active, setActive] = useState(user.active);
  const [roles, setRoles] = useState(
    user.roles.map((el) => ({
      value: el,
      label: el,
    }))
  );

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (idDelSuccess) {
      navigate("/users");
    }
  }, [idDelSuccess, navigate]);

  const canUpdate = true; //[validUsername, validPassword].every(Boolean) && !isLoading

  const onUpdateUseClicked = async (e) => {
    const selectedRoles = roles.map((el) => el.value);

    console.log(selectedRoles);

    e.preventDefault();
    if (canUpdate) {
      await updateUser({
        id: user.id,
        password,
        firstName,
        lastName,
        jobTitle,
        email,
        active,
        roles: selectedRoles,
      });
    }
  };

  const rolesOptions = Object.values(ROLES).map((el) => ({
    value: el,
    label: el,
  }));

  const onDeleteButtonClicked = () => {
    deleteUser({ id: user.id });
  };

  let deleteAlertAlert = null;
  if (isDelError) {
    deleteAlertAlert = <Alert variant="danger">error: {JSON.stringify(delError)}</Alert>;
  }

  const content = (
    <>
      {deleteAlertAlert}
      {isError && (
        <Alert variant="danger">error: {JSON.stringify(error)}</Alert>
      )}
      {isSuccess && <Alert variant="success">Success</Alert>}
      <h2>Edit User</h2>
      <Form className="form" onSubmit={onUpdateUseClicked}>
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
            placeholder="Enter Job Title"
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

        <Form.Group className="mb-3" controlId="Username">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            // isValid={validUsername}
            // isInvalid={!validUsername}
            type="text"
            placeholder="John"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled
          />
          {/* <Form.Text className="text-muted">[3-20 letters]</Form.Text> */}
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            isValid={validPassword}
            isInvalid={password && !validPassword}
            type="password"
            placeholder="Enter password (ony if you want to change)."
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Text className="text-muted">[4-12 chars incl !@#$%]</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="roles">
          <Form.Label>Roles:</Form.Label>
          <Select
            defaultValue={roles}
            // value={roles}
            isMulti
            name="roles"
            options={rolesOptions}
            onChange={setRoles}
          />
        </Form.Group>

        <Form.Check
          className="mb-3"
          type="checkbox"
          id="active"
          label="Is Active"
          checked={active}
          onChange={() => setActive((prev) => !prev)}
        />

        <Button
          className="icon-button"
          title="Save"
          // disabled={!canSave}
          type="Submit"
        >
          <FontAwesomeIcon icon={faSave} /> Update User
        </Button>{" "}

        <Button
          className="icon-button"
          title="Delete"
          variant="danger"
          onClick={onDeleteButtonClicked}
          // disabled={}
        >
          <FontAwesomeIcon icon={faTrash} /> Delete User
        </Button>
      </Form>
    </>
  );

  return content;
}
