import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import jwtDecode from "jwt-decode";

export default function useAuth() {
  const token = useSelector(selectCurrentToken);
 

  if (token) {
    const decoded = jwtDecode(token);
    const { username, roles, firstName } = decoded.UserInfo;
    console.log(decoded.UserInfo);

   

    return { username, roles, firstName };
  }

  return { username: "", roles:[], firstName: '' };
}
