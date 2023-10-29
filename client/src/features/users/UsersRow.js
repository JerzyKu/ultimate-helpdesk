import { useSelector } from "react-redux";
import { selectUserById } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";

export default function UsersRow({ userId }) {
  const user = useSelector((state) => selectUserById(state, userId));
  const navigate = useNavigate();

  return (
    <tr>
      <td>
        {user.firstName} {user.lastName}
      </td>
      <td>{user.username}</td>
      <td>{user.jobTitle}</td>
      <td>{user.active ? "V" : "X"}</td>
      {/* <td>{JSON.stringify(user.roles)}</td> */}
      <td>
        <Button variant="primary">
          <FontAwesomeIcon
            className="cursor-pointer"
            icon={faPenToSquare}
            onClick={() => navigate(`/users/${userId}`)}
          />
        </Button>
      </td>
    </tr>
  );
}
