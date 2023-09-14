import { useSelector } from "react-redux";
import {
  selectAssetsIds,
  useGetAssetsQuery,
} from "./assetsSlice";
 
// reat-bootstrap
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

import AssetRow from "./AssetRow";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

export default function AssetsList() {
  const {
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetAssetsQuery()

  const assetsIds = useSelector(selectAssetsIds);

  const table = (
    <Table hover striped>
      <thead>
        <tr>
          <th className="hearderStyles">Name</th>
          <th style={{}}>Inventory Number</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {assetsIds.map((assetId) => {
          return <AssetRow key={assetId} assetId={assetId} />;
        })}
      </tbody>
    </Table>
  );

  let content;
  if (isLoading) {
    content = <Spinner animation="grow" />;
  } else if (isSuccess) {
    content = table;
  } else if (isError) {
    content = <Alert variant={"danger"}> {error} </Alert>;
  }

  return (
    <>
      <Button as={Link} to={"new"}>
        Add New Asset
      </Button>
      <hr />
      {content}
    </>
  );
}
