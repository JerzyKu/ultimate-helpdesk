import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { assetAdded } from "./assetsSlice";
import { selectAllUsers } from "../users/usersSlice";

export default function AddAssetForm() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [invSymbol, setInvSymbol] = useState("");
  const [userID, setUserID] = useState("");

  const users = useSelector(selectAllUsers);

  const onNameChange = (e) => setName(e.target.value);
  const onInvSymbolChange = (e) => setInvSymbol(e.target.value);
  const onOwnerChange = (e) => setUserID(e.target.value);

  const onSavePostClicked = () => {
    if (name && invSymbol) {
      dispatch(assetAdded(name, invSymbol, userID));

      setInvSymbol("");
      setName("");
    }
  };

  const canSave = Boolean(name) && Boolean(invSymbol) && Boolean(userID);

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.username}
    </option>
  ));

  return (
    <section>
      {/* {JSON.stringify(users)} */}
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

        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  );
}
