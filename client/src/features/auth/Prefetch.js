import { useEffect } from "react";
import { store } from "../../app/store";
import { usersApiSlice } from "../users/usersApiSlice";
import { Outlet } from "react-router-dom";
import { asstesApiSlice } from "../assets/assetsApiSlice";

export default function Prefetch() {
  useEffect(() => {
    console.log("subscribing");
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());
    const assets = store.dispatch(asstesApiSlice.endpoints.getAssets.initiate())

    return () => {
      console.log("ubsubscribing");
      users.unsubscribe();
      assets.unsubscribe();
    };
  }, []);

  return <Outlet />;
}
