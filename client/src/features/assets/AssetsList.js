import { useSelector } from "react-redux";
import { getAssetsError, getAssetsStatus, selectAllAssets } from "./assetsSlice";

// reat-bootstrap
import Table from "react-bootstrap/Table";
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

import AssetRow from "./AssetRow";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

export default function AssetsList() {

  const assets = useSelector(selectAllAssets);
  const assetsStatus = useSelector(getAssetsStatus);
  const assetsError = useSelector(getAssetsError);

  const table = <Table hover striped>
    <thead>
      <tr>
        <th>ID</th>
        <th className="hearderStyles">Name</th>
        <th style={{}}>Inventory Number</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>{assets.map((asset) => {
      return <AssetRow key={asset._id} asset={asset} />
    })}</tbody>
  </Table>


  let content
  if (assetsStatus === 'loading') {
    content = <Spinner animation="grow" />
  } else if (assetsStatus === 'succeeded') {
    content = table
  } else if (assetsStatus === 'failed') {
    content = <Alert variant={'danger'}> {assetsError} </Alert>
  }


  return (
    <>
      <Button as={Link} to={'new'} >Add New Asset</Button>
      <hr />
      {content}
    </>
  );
}
