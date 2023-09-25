import { useSelector } from "react-redux"
import { selectUserById } from "../users/usersApiSlice"
import { Link } from "react-router-dom"

export default function Owner({id}) {
    const user = useSelector(state => selectUserById(state, id))
  return (
    <>{user 
        ?  <Link to={`/users/${user.id}`}>{user.username}</Link>
        : <p className="gray">no user</p>}</>
  )
}
