import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";

export default function AssetOwner({userID}) {
  const users = useSelector(selectAllUsers);
  const owner = users.find((user) => user.id === userID);
  console.log('owner', owner);
  return <>{owner ? owner.name : "ready to issue"};</>;
}
