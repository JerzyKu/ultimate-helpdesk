import { useSelector } from "react-redux";
import { selectAllAssets } from "./assetsSlice";

// reat-bootstrap
import Table from "react-bootstrap/Table";
import AddAssetForm from "./AddAssetForm";
import AssetOwner from "./AssetOwner";

export default function AssetsList() {
  const assets = useSelector(selectAllAssets);

  const assetsRows = assets.map((asset) => {
    return (
      <tr key={asset.id}>
        <td>{asset.id}</td>
        <td>{asset.name}</td>
        <td>{asset.invSymbol}</td>
        <td><AssetOwner userID={asset.ownerID}/></td>
      </tr>
    );
  });

  return (
    <>
      <AddAssetForm />
      <br/>
      <hr/>
      <br/>
      <Table hover striped>
        <thead>
          <tr>
            <th>ID</th>
            <th className="hearderStyles">Name</th>
            <th style={{}}>Inventory Number</th>
          </tr>
        </thead>
        <tbody>{assetsRows}</tbody>
      </Table>
    </>
  );
}
