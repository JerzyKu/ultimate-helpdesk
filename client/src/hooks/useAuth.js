import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import jwtDecode from "jwt-decode";

export default function useAuth() {
  const token = useSelector(selectCurrentToken);

  let isAdmin = false 
  let isHelpDesk = false

 

  if (token) {
    const decoded = jwtDecode(token);
    const { username, roles, firstName } = decoded.UserInfo;

    isAdmin = roles.includes('Admin')

    return { username, roles, firstName, isAdmin, isHelpDesk };
  }

  return { username: "", roles:[], firstName: '', isAdmin, isHelpDesk };
}
