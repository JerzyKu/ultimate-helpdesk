import { useSelector } from "react-redux";
import { selectUserById } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";


export default function UsersRow({ userId }) {
  const user = useSelector((state) => selectUserById(state, userId));
  const navigate = useNavigate();
  

  const onClickRow = () => {
    navigate(`/users/${userId}`)
  }

  return (
    <tr onClick={onClickRow} className="cursor-pointer">
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.jobTitle}</td>
      <td>{user.username}</td>
      <td>{JSON.stringify(user.roles)}</td>
    </tr>
  );
}

