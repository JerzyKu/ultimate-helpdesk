import { Routes, Route } from 'react-router-dom';
import Emplyees from './pages/Employees'
import Assets from './pages/Assets'
import Layout from './Layout';
import Home from './pages/Home';


function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/employees' element={<Emplyees />} />
        <Route path='/assets' element={<Assets />} />
        <Route path='/' element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;