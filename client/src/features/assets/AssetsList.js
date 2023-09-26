import React from "react";
import { useGetAssetsQuery } from "./assetsApiSlice";
import Button from "react-bootstrap/esm/Button";
import Table from "react-bootstrap/esm/Table";
import AssetsRow from "./AssetsRow";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

export default function AssetsList() {
  const {
    data: assets,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAssetsQuery(undefined, {
    pollingInterval: 10000, // 10s
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content = <>nothing</>

  if (isLoading) {
    content = <Spinner />
  }
  if (isError) {
    content = (
      <p className="errmsg">
        error: {error?.data?.message || JSON.stringify(error)}
      </p>
    );
  }
  if (isSuccess) {
    const { ids } = assets;

    const rows = ids.map((assetId) => (
      <AssetsRow key={assetId} assetId={assetId} />
    ));

    content = (<>
    <Table striped hover>
      <thead>
        <tr>
          <td><b>Name</b></td>
          <td><b>InventorySymbol</b></td>
          <td><b>Owner</b></td>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
    </>)
  }

  return (
    <>
      <h2>Assets</h2>
      <Button as={Link} to={'/assets/new'}>Add New Asset</Button>
      <hr />
      {content}
    </>
  );
}
