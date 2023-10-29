import React from "react";
import { useGetAssetsQuery } from "./assetsApiSlice";
import Button from "react-bootstrap/esm/Button";
import Table from "react-bootstrap/esm/Table";
import AssetsRow from "./AssetsRow";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import useAuth from "../../hooks/useAuth";

export default function AssetsList() {
  const { isAdmin, isHelpDesk, id: userId } = useAuth();
  const {
    data: assets,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAssetsQuery(undefined, {
    pollingInterval: 60000, // 60s
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content = <>nothing</>;

  if (isLoading) {
    content = <Spinner />;
  }
  if (isError) {
    content = (
      <p className="errmsg">
        error: {error?.data?.message || JSON.stringify(error)}
      </p>
    );
  }
  if (isSuccess) {
    const { ids, entities } = assets;

    let filteredIds = ids;
    if (!isAdmin && !isHelpDesk) {
      // alert('no admin and no HD')
      filteredIds = filteredIds.filter((id) => entities[id].ownerID === userId);
      //   console.log('entities[id].ownerID ',entities[id].ownerID," userId ", userId);
      //   return entities[id].ownerID === userId;
      // });
    }

    const rows = filteredIds.map((assetId) => (
      <AssetsRow key={assetId} assetId={assetId} />
    ));

    content = (
      <>
        <Table striped hover>
          <thead>
            <tr>
              <td>
                <b>Name</b>
              </td>
              <td>
                <b>InventorySymbol</b>
              </td>
              {(isAdmin || isHelpDesk) && (
                <>
                  <td>
                    <b>Owner</b>
                  </td>
                  <td>
                    <b>Actions</b>
                  </td>
                </>
              )}
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </>
    );
  }

  return (
    <>
      <h2>Assets</h2>
      {isAdmin && (
        <Button as={Link} to={"/assets/new"}>
          Add New Asset
        </Button>
      )}
      <hr />
      {content}
    </>
  );
}
