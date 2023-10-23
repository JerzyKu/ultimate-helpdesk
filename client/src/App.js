import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Account from "./components/Account";
import NotFound from "./components/NotFound";

import Userslist from "./features/users/UsersList";
import EditUser from "./features/users/EditUser";
import NewUserForm from "./features/users/NewUserForm";

import AssetsList from "./features/assets/AssetsList";
import NewAssetForm from "./features/assets/NewAssetForm";
import EditAsset from "./features/assets/EditAsset";

import Home from "./features/auth/Home";
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
          <Route
            element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
          >
            <Route element={<Prefetch />}>
              <Route index element={<Home />} />
              <Route path="users">
                <Route index element={<Userslist />} />
                <Route path=":id" element={<EditUser />} />
                <Route path="new" element={<NewUserForm />} />
              </Route>{" "}
              {/* users */}
              <Route path="assets">
                <Route index element={<AssetsList />} />
                <Route path=":id" element={<EditAsset />} />
                <Route path="new" element={<NewAssetForm />} />
              </Route>
            </Route>{" "}
            {/* Prefetch */}
          </Route>

          <Route path="account" element={<Account />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
