import { useSelector } from "react-redux";
import { selectAssetsById } from "./assetsApiSlice";

export default function AssetsRow({ assetId }) {
  const asset = useSelector((state) => selectAssetsById(state, assetId));

  return (
    <tr className="cursor-pointer">
      <td>{asset.name}</td>
      <td>{asset.invSymbol}</td>
      <td>{asset.ownerID}</td>
    </tr>
  );
}
