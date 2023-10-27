import { useEffect, useState } from "react";
import { useIssueAssetMutation } from "./assetsApiSlice";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Alert from 'react-bootstrap/Alert';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandshake } from "@fortawesome/free-solid-svg-icons";

export default function IssueAsset({ asset }) {
  const [show, setShow] = useState(false);

  const [issueAsset, { isLoading, isSuccess, isError, error }] =
    useIssueAssetMutation();

  useEffect(() => {
    if (isSuccess) {
      setShow(false);
    }
  }, [isSuccess]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onIssueAssetButtonClicked = async () => {
    await issueAsset({
      userId: "653587a8fe3e9fce26d14c4b",
      assetId: asset.id,
    });
  };

  let alert = null 
  if (isError) {
    alert = (
      <Alert  variant='danger'>
          {JSON.stringify(error)}
        </Alert>
    )
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
          I will not close if you click outside me. Don not even try to press
          escape key.
          {JSON.stringify(asset)}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Abort
          </Button>
          <Button variant="primary" onClick={onIssueAssetButtonClicked}>
            {" "}
            Issue{" "}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
