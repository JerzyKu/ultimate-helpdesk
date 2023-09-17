import { useEffect, useState } from "react";

import { useAddNewAssetMutation } from "./assetsApiSlice";
import { useGetUsersQuery } from "../users/usersApiSlice";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

export default function NewAssetForm() {
  const [name, setName] = useState("test");
  const [invSymbol, setInvSymbol] = useState("test");
  const [userID, setUserID] = useState("");

  const [addNewAsset, { isLoading, isSuccess, isError, error }] =
    useAddNewAssetMutation();

  const {
    data: users,
    isLoading: isUsersLoading,
    isSuccess: isUsersLoadingSucces,
    isError: isUsersLoadingError,
    error: usersLoadingError,
  } = useGetUsersQuery();

  useEffect(() => {
    setUserID(users.entities[users.ids[0]].id)
    // eslint-disable-next-line
  },[isUsersLoadingSucces])

  const canSave = [name.length, invSymbol.length].every(Boolean) && !isLoading;

  const onSaveAssetClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewAsset({ name, invSymbol, userID });
    }
  };

  let options
  if (isUsersLoading) {
    options = <option>Loading</option>;
  }
  if (isUsersLoadingSucces) {
    const { ids } = users;
    options = ids.map((id) => (
      <option key={id} value={id} default>
        {users.entities[id].username}
      </option>
    ));
  }

  return (
    <>
      <h2>Add new Asset</h2>
      {isError && (
        <Alert variant="danger">error: {JSON.stringify(error)}</Alert>
      )}
      {isUsersLoadingError && (
        <Alert variant="danger">
          error: {JSON.stringify(usersLoadingError)}
        </Alert>
      )}
      {isSuccess && <Alert variant="success">Asset Added</Alert>}
      <hr />
      <Form onSubmit={onSaveAssetClicked}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="name">Name: </Form.Label>
          <Form.Control
            type="text"
            name="name"
            id="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            // isInvalid
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="invSymbol">invSymbol:</Form.Label>
          <Form.Control
            type="text"
            name="invSymbol"
            id="invSymbol"
            placeholder="Enter inventory number"
            value={invSymbol}
            onChange={(e) => setInvSymbol(e.target.value)}
            required
            // isValid
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="owner">Owner: </Form.Label>
          <Form.Select
            id="owner"
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
          >
            {options}
            <option value={''}>none</option>
          </Form.Select>
        </Form.Group>

        <Button type="Submit" disabled={!canSave}>
          {isLoading && <Spinner animation="grow" size="sm" />}
          Add Asset
        </Button>
      </Form>
    </>
  );
}
