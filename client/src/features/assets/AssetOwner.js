import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";

export default function AssetOwner({userID}) {
  // console.log(userID);
  const users = useSelector(selectAllUsers);
  const owner = users.find((user) => user._id === userID);
  // console.log('owner', owner);
  return <>{owner ? `Issued to ${owner.username}` : "ready to issue"}</>;
}
