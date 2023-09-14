import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./features/auth/Home";
import LogInPage from "./pages/LogInPage";
import Account from "./pages/Account";
import Register from "./pages/Register";
import NotFound from "./components/NotFound";
import Userslist from "./features/users/UsersList";
import Prefetch from "./features/auth/Prefetch";
import EditUser from "./features/users/EditUser";
import NewUserForm from "./features/users/NewUserForm";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LogInPage />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        <Route element={<Prefetch />}>
          <Route path="users">
            <Route index element={<Userslist />} />
            <Route path=':id' element={<EditUser />} />
            <Route path='new' element={<NewUserForm />} />
          </Route>
        </Route>

        <Route path="account" element={<Account />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
