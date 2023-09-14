import { useSelector } from "react-redux";
// import { selectAllUsers } from "../users/usersSlice";
import { Link } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

export default function AssetOwner({ userID }) {

  const users = useSelector(selectAllUsers);
  const owner = users.find((user) => user._id === userID);
  if(!owner) {
    return "no owner"
  }
  return <p>
    Issued to <Link to={`/users/${owner?._id}`}><Badge bg="info"><FontAwesomeIcon icon={faUser}/> {owner?.username}</Badge></Link>
  </p>
}
