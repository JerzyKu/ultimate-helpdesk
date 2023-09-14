import { useSelector } from "react-redux";
import { selectUserById } from "./usersApiSlice";

export default function UsersRow({ userId }) {
  const user = useSelector((state) => selectUserById(state, userId));

  return (
    <tr>
      <td>{user.username}</td>
      <td>{JSON.stringify(user.roles)}</td>
    </tr>
  );
}

