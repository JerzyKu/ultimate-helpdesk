import { Routes, Route } from 'react-router-dom';
import Emplyees from './features/employees/Employees'
import Layout from './Layout';
import Home from './features/auth/Home';
import LogInPage from './pages/LogInPage';
import NewEmployee from './features/employees/NewEmployee';
import Account from './pages/Account';
import NewAsset from './features/assets/NewAsset';
import Register from './pages/Register';
import AssetsList from './features/assets/AssetsList';
import UsersList from './pages/UsersList';
import SingleAssetPage from './features/assets/SingleAssetPage';
import EditAssetForm from './features/assets/EditAssetForm';


function App() {
  return (
    <Routes>
      <Route path='/login' element={<LogInPage />} />
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />

        <Route path='employees' >
          <Route index element={<Emplyees />} />
          <Route path='new' element={<NewEmployee />} />
        </Route>

        <Route path='assets' >
          <Route index element={<AssetsList />} />
          <Route path='new' element={<NewAsset />} />
          <Route path='edit/:id' element={<EditAssetForm />} />
          <Route path=':id' element={<SingleAssetPage />} />
        </Route>

        <Route path='users' >
          <Route index element={<UsersList />} />
        </Route>

        <Route path='account' element={<Account />} />
        <Route path='register' element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;