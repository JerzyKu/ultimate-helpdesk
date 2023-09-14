import { useEffect } from "react";
import { store } from "../../app/store";
import { usersApiSlice } from "../users/usersApiSlice";
import { Outlet } from "react-router-dom";

export default function Prefetch() {
  useEffect(() => {
    console.log("subscribing");
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());

    return () => {
      console.log("ubsubscribing");
      users.unsubscribe();
    };
  }, []);

  return <Outlet />;
}
