import { useState } from "react";
import { useAddNewAssetMutation } from "./assetsApiSlice";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useGetUsersQuery } from "../users/usersApiSlice";

export default function NewAssetForm() {
  const [name, setName] = useState("");
  const [invSymbol, setInvSymbol] = useState("");

  const [addNewAsset, { isLoading, isSuccess, isError, error }] =
    useAddNewAssetMutation();

  const {
    data: users,
    isLoading: isUsersLoading,
    isSuccess: isUsersLoadingSucces,
    isError: isUsersLoadingError,
    error: usersLoadingError,
  } = useGetUsersQuery();

  const canSave = [name.length, invSymbol.length].every(Boolean) && !isLoading;

  const onSaveAssetClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewAsset({ name, invSymbol });
    }
  };

  let options = <option>Loading</ option>

  if (isUsersLoadingSucces) {
    const { ids } = users;

    options = ids.map((id) => (
      <option>{users.entities[id].username}</option>
    ));
  }

  return (
    <>
      <h2>Add new Asset</h2>
      {isError && (
        <Alert variant="danger">error: {JSON.stringify(error)}</Alert>
      )}
      {`${isSuccess}`}
      <hr />
      {`${isLoading}`}
      <hr />
      {`${canSave}`}
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
            onChange={() => e => setName(e.target.value)}
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
            onChange={() => e => setInvSymbol(e.target.value)}
            required
            // isValid
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="owner">Owner: </Form.Label>
          <Form.Select
            id="owner"
            //   value={userID}
            //   onChange={onOwnerChange}
          >
            {/* <option value="">-=- select owner -=-</option> */}
            {options}
          </Form.Select>
        </Form.Group>

        <Button
          type="Submit"
          // onClick={onSavePostClicked}
          disabled={!canSave}
        >
          {/* <Spinner animation="grow" size='sm'/>  */}
          Add Asset
        </Button>
      </Form>
    </> 
  );
}
