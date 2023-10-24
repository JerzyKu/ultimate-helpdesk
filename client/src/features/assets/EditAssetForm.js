import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useGetUsersQuery } from "../users/usersApiSlice";
import {
  useDeleteAssetMutation,
  useUpdateAssetMutation,
} from "./assetsApiSlice";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";

export default function EditAssetForm({ asset }) {
  const [name, setName] = useState(asset.name);
  const [invSymbol, setInvSymbol] = useState(asset.invSymbol);
  const [userID, setUserID] = useState(asset?.ownerID ?? "none");
  const [serialNumber, setSerialNumber] = useState(asset.serialNumber);

  const navigate = useNavigate();

  const {
    data: users,
    isLoading: isUsersLoading,
    isSuccess: isUsersLoadingSucces,
    isError: isUsersLoadingError,
    error: usersLoadingError,
  } = useGetUsersQuery();

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
  }, [isDelSuccess]);

  let options;
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

  const canSave = !isLoading || !isUsersLoading;

  const onFormUpdate = async (e) => {
    e.preventDefault();
    await updateAsset({
      id: asset.id,
      name,
      invSymbol,
      ownerID: userID,
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
      // disabled
      variant="danger"
      onClick={onDeleteButtonClicked}
    >
      {(isUsersLoading || isLoading) && <Spinner animation="grow" size="sm" />}
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
      {/* <hr />
      {`${JSON.stringify(asset)}`} */}
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

        <Form.Group className="mb-3">
          <Form.Label htmlFor="owner">Owner: </Form.Label>
          <Form.Select
            id="owner"
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
          >
            {options}
            <option value={"none"}>none</option>
          </Form.Select>
        </Form.Group>

        <Button type="Submit" disabled={!canSave}>
          {(isUsersLoading || isLoading) && (
            <Spinner animation="grow" size="sm" />
          )}
          Update Asset
        </Button>

        {deleteButton}
      </Form>
    </>
  );
}
