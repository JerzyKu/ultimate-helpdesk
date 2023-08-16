import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './features/auth/Home';
import LogInPage from './pages/LogInPage';
import Account from './pages/Account';
import Register from './pages/Register';
import AssetsList from './features/assets/AssetsList';
import SingleAssetPage from './features/assets/SingleAssetPage';
import EditAssetForm from './features/assets/EditAssetForm';
import NotFound from './components/NotFound';
import AddAssetForm from './features/assets/AddAssetForm';
import Userslist from './features/users/UsersList';
import SingleUserPage from './features/users/SingleUserPage';


function App() {
  return (
    <Routes>
      <Route path='/login' element={<LogInPage />} />
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />

        <Route path='assets' >
          <Route index element={<AssetsList />} />
          <Route path='new' element={<AddAssetForm />} />
          <Route path='edit/:id' element={<EditAssetForm />} />
          <Route path=':id' element={<SingleAssetPage />} />
        </Route>

        <Route path='users' >
          <Route index element={<Userslist />} />
          <Route path=':id' element={<SingleUserPage />} />
        </Route>

        <Route path='account' element={<Account />} />
        <Route path='register' element={<Register />} />
      </Route>
      <Route path='*'  element={<NotFound />}/>
    </Routes>
  );
}

export default App;