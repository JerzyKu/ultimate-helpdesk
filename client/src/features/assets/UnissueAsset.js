import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { faHandshakeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useUnissueAssetMutation } from './assetsApiSlice';
import { useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';


export default function UnissueAsset({asset}) {
  const [show, setShow] = useState(false);

  const [unissueAsset, { isLoading, isSuccess, isError, error }] =
  useUnissueAssetMutation();

  useEffect(() => {
    if(isSuccess){
        setShow(false)
    }
  }, [isSuccess])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onUnissueAssetButtonClicked = async () =>{
    await unissueAsset({
      id: asset.id
    })
  }

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
    <FontAwesomeIcon
        className="cursor-pointer"
        icon={faHandshakeSlash}
        />
    </Button>

    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      // keyboard={false}
    >
      <Modal.Header closeButton={false}>
        <Modal.Title>Unissue <i>{asset.name}</i> {asset.invSymbol}</Modal.Title>
      </Modal.Header>
      {alert}

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={isLoading}>
        Abort
        </Button>
        <Button variant="primary" onClick={onUnissueAssetButtonClicked} disabled={isLoading}> Unissue </Button>
      </Modal.Footer>
    </Modal>
  </>
  )
}
