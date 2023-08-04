import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addNewAsset } from "./assetsSlice";
import { selectAllUsers } from "../users/usersSlice";

import Button from "react-bootstrap/Button";
// import Spinner from "react-bootstrap/Spinner";

export default function AddAssetForm() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [invSymbol, setInvSymbol] = useState("");
  const [userID, setUserID] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const users = useSelector(selectAllUsers);

  const onNameChange = (e) => setName(e.target.value);
  const onInvSymbolChange = (e) => setInvSymbol(e.target.value);
  const onOwnerChange = (e) => setUserID(e.target.value);

  const canSave =
    [name, invSymbol].every(Boolean) && addRequestStatus === "idle";

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        dispatch(addNewAsset({ name, invSymbol, userID })).unwrap(); // return promisse: action.payload or throw error


      } catch (error) {
        console.error(`Failed to save asset: ${error}`);
      } finally {
        setAddRequestStatus("idle");
        setInvSymbol("");
        setName("");
        setUserID("");
      }


    }
  };

  const usersOptions = users.map((user) => (
    <option key={user._id} value={user._id}>
      {user.username}
    </option>
  ));

  return (
    <section>
      <h2>Add new Asset</h2>
      <form>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={onNameChange}
        />
        <label htmlFor="invSymbol">invSymbol:</label>
        <input
          type="text"
          name="invSymbol"
          id="invSymbol"
          value={invSymbol}
          onChange={onInvSymbolChange}
        />

        <label htmlFor="owner">Owner: </label>
        <select id="owner" value={userID} onChange={onOwnerChange}>
          <option value=""></option>
          {usersOptions}
        </select>

        <Button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          {/* <Spinner animation="grow" size='sm'/>  */}
          Add Asset
        </Button>
      </form>
    </section>
  );
}
