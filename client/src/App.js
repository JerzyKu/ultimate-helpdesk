import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import NotFound from "./components/NotFound";

import EditUser from "./features/users/EditUser";
import Userslist from "./features/users/UsersList";
import NewUserForm from "./features/users/NewUserForm";

import EditAsset from "./features/assets/EditAsset";
import AssetsList from "./features/assets/AssetsList";
import NewAssetForm from "./features/assets/NewAssetForm";

import Home from "./features/auth/Home";
import Account from "./features/auth/Account";
import Prefetch from "./features/auth/Prefetch";
import LogInPage from "./features/auth/LogInPage";
import RequireAuth from "./features/auth/RequireAuth";
import PersistLogin from "./features/auth/PersistLogin";

import { ROLES } from "./config/roles";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LogInPage />} />
      <Route path="/" element={<Layout />}>
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
            <Route element={<Prefetch />}>
              <Route index element={<Home />} />
              <Route path="users">
                <Route index element={<Userslist />} />
                <Route path=":id" element={<EditUser />} />
                <Route path="new" element={<NewUserForm />} />
              </Route>
              {/* end of users */}
              <Route path="assets">
                <Route index element={<AssetsList />} />
                <Route path=":id" element={<EditAsset />} />
                <Route path="new" element={<NewAssetForm />} />
              </Route>
              <Route path="account" element={<Account />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            {/* end of Prefetch */}
          </Route>
          {/* end of RequireAuth*/}
        </Route>
        {/* end of PersistLogin*/}
      </Route>
    </Routes>
  );
}

export default App;
