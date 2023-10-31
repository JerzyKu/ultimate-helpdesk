import { useState } from "react";

import { useAddNewAssetMutation } from "./assetsApiSlice";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner"; 

export default function NewAssetForm() {
  const [name, setName] = useState(""); 
  const [invSymbol, setInvSymbol] = useState("");
  const [serialNumber, setSerialNumber] = useState('')

  const [addNewAsset, { isLoading, isSuccess, isError, error }] =
    useAddNewAssetMutation();

  const canSave = [name.length, invSymbol.length].every(Boolean) && !isLoading;

  const onSaveAssetClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewAsset({ name, invSymbol, serialNumber });
    }
  };

  return (
    <>
      <h2>Add new Asset</h2>
      {isError && (
        <Alert variant="danger">error: {JSON.stringify(error)}</Alert>
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
          <Form.Label htmlFor="serialNumber">serialNumber:</Form.Label>
          <Form.Control
            type="text"
            name="serialNumber"
            id="serialNumber"
            placeholder="Enter serial number"
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
            required
            // isValid
          />
        </Form.Group>

        <Button type="Submit" disabled={!canSave}>
          {isLoading && <Spinner animation="grow" size="sm" />}
          Add Asset
        </Button>
      </Form>
    </>
  );
}
