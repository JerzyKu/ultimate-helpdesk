import { useEffect, useState } from "react";
import { useIssueAssetMutation } from "./assetsApiSlice";
import { useGetUsersQuery } from "../users/usersApiSlice";
import Select from "react-select";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandshake } from "@fortawesome/free-solid-svg-icons";

export default function IssueAsset({ asset }) {
  const [show, setShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [issueAsset, { isLoading, isSuccess, isError, error }] =
    useIssueAssetMutation();

  const {
    data: users,
    isLoading: isUsersLoading,
    isSuccess: isUsersLoadingSucces,
    isError: isUsersLoadingError,
    error: usersLoadingError,
  } = useGetUsersQuery();

  useEffect(() => {
    if (isSuccess) {
      setShow(false);
    }
  }, [isSuccess]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onIssueAssetButtonClicked = async () => {
    if (selectedUser) {
      await issueAsset({
        userId: selectedUser.value,
        assetId: asset.id,
      });
    }
  };

  let options;
  if (isUsersLoading) {
    options = { value: "Loandig", label: "Loandig" };
  }
  if (isUsersLoadingSucces) {
    const { ids } = users;
    options = ids.map((id) => ({
      value: users.entities[id].id,
      label: users.entities[id].username,
    }));
    // <option key={id} value={id} default>
    //   {users.entities[id].username}
    // </option>
  }

  let alert = null;
  if (isError) {
    alert = <Alert variant="danger">{JSON.stringify(error)}</Alert>;
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <FontAwesomeIcon className="cursor-pointer" icon={faHandshake} />
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        // keyboard={false}
      >
        <Modal.Header closeButton={false}>
          <Modal.Title>
            Issue <i>{asset.name}</i> {asset.invSymbol}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {alert}
          <Select
            defaultValue={selectedUser}
            onChange={setSelectedUser}
            options={options}
            placeholder={"Select user..."}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Abort
          </Button>
          <Button variant="primary" onClick={onIssueAssetButtonClicked}>
            Issue
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
