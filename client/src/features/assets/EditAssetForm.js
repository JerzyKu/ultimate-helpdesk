import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useGetUsersQuery } from "../users/usersApiSlice";

export default function EditAssetForm({ asset }) {
  const [name, setName] = useState(asset.name);
  const [invSymbol, setInvSymbol] = useState(asset.invSymbol);
  const [userID, setUserID] = useState(asset?.ownerID);

  const {
    data: users,
    isLoading: isUsersLoading,
    isSuccess: isUsersLoadingSucces,
    isError: isUsersLoadingError,
    error: usersLoadingError,
  } = useGetUsersQuery();

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
      <h2>Edit Asset</h2>
      <hr />
        {`${JSON.stringify(asset)}`}
      <hr />
      <Form>
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
            <option value={""}>none</option>
          </Form.Select>
        </Form.Group>

        <Button
          type="Submit"
          //   disabled={!canSave}
        >
          {/* {isLoading && <Spinner animation="grow" size="sm" />} */}
          Add Asset
        </Button>
      </Form>
    </>
  );
}
