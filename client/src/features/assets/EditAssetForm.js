import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import {
  useDeleteAssetMutation,
  useUpdateAssetMutation,
} from "./assetsApiSlice";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";

export default function EditAssetForm({ asset }) {
  const [name, setName] = useState(asset.name);
  const [invSymbol, setInvSymbol] = useState(asset.invSymbol);
  const [serialNumber, setSerialNumber] = useState(asset.serialNumber);

  const navigate = useNavigate();



  const [
    deleteAsset,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteAssetMutation();

  const [updateAsset, { isLoading, isSuccess, isError, error }] =
    useUpdateAssetMutation();

  useEffect(() => {
    if (isDelSuccess) {
      navigate(`/assets`);
    }
  }, [isDelSuccess, navigate]);

  const canSave = !isLoading

  const onFormUpdate = async (e) => {
    e.preventDefault();
    await updateAsset({
      id: asset.id,
      name,
      invSymbol,
      serialNumber,
    });
  };

  const onDeleteButtonClicked = async (e) => {
    e.preventDefault();
    await deleteAsset({ id: asset.id });
  };

  let deleteButton;
  deleteButton = (
    <Button
      type="button"
      variant="danger"
      onClick={onDeleteButtonClicked}
      title={'hint'}
    >
      {(isLoading) && <Spinner animation="grow" size="sm" />}
      Delete
    </Button>
  );

  return (
    <>
      {isError && (
        <Alert variant="danger">error: {JSON.stringify(error)}</Alert>
      )}
      {isDelError && (
        <Alert variant="danger">error: {JSON.stringify(delerror)}</Alert>
      )}
      {isSuccess && <Alert variant="success">Success</Alert>}
     
      <h2>Edit Asset</h2>
      <hr />
      <Form onSubmit={onFormUpdate}>
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
          <Form.Label htmlFor="invSymbol">serialNumber:</Form.Label>
          <Form.Control
            type="text"
            name="serialNumber"
            id="serialNumber"
            placeholder="Enter Serial number"
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
            // required
            // isValid
          />
        </Form.Group>

        <Button type="Submit" disabled={!canSave}>
          {(isLoading) && (
            <Spinner animation="grow" size="sm" />
          )}
          Update Asset
        </Button>
        {' '}
        {deleteButton}
      </Form>
    </>
  );
}
