import { Routes, Route } from 'react-router-dom';
import Emplyees from './pages/Employees'
import Assets from './pages/Assets'
import Layout from './Layout';
import Home from './pages/Home';
import LogInPage from './pages/LogInPage';
import NewEmployee from './pages/NewEmployee';


function App() {
  return (
    <Routes>
      <Route path='/login' element={<LogInPage />} />
      <Route path='/' element={<Layout />}>
        <Route path='/employees' element={<Emplyees />} />
        <Route path='/employees/new' element={<NewEmployee />} />
        <Route path='/assets' element={<Assets />} />
        <Route path='/' element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;