import { useSelector } from "react-redux";
import { selectAssetsById } from "./assetsApiSlice";
import { useNavigate } from "react-router-dom";
import Owner from "./Owner";
import Button from "react-bootstrap/Button";
import IssueAsset from "./IssueAsset";
import UnissueAsset from "./UnissueAsset";

//font awsome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";

export default function AssetsRow({ assetId }) {
  const asset = useSelector((state) => selectAssetsById(state, assetId));
  const navigate = useNavigate();
  const { isAdmin, isHelpDesk } = useAuth();

  return (
    <tr>
      <td>{asset.name}</td>
      <td>{asset.invSymbol}</td>
      {(isAdmin || isHelpDesk) && (
        <>
          <td>
            <Owner id={asset.ownerID} />
          </td>
          <td>
            {isAdmin && (
              <Button variant="primary">
                <FontAwesomeIcon
                  className="cursor-pointer"
                  icon={faPenToSquare}
                  onClick={() => navigate(`${asset.id}`)}
                />
              </Button>
            )}
            {!asset.ownerID ? (
              <IssueAsset asset={asset} />
            ) : (
              <UnissueAsset asset={asset} />
            )}
          </td>
        </>
      )}
    </tr>
  );
}
