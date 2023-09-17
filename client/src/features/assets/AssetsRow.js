import { useSelector } from "react-redux";
import { selectAssetsById } from "./assetsApiSlice";
import { useNavigate } from "react-router-dom";

export default function AssetsRow({ assetId }) {
  const asset = useSelector((state) => selectAssetsById(state, assetId));
  const navigate = useNavigate()

  return (
    <tr className="cursor-pointer" onClick={() => navigate(`${asset.id}`)}>
      <td>{asset.name}</td>
      <td>{asset.invSymbol}</td>
      <td>{asset.ownerID}</td>
    </tr>
  );
}
