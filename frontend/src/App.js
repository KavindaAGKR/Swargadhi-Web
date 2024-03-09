
import { Route,Routes } from 'react-router-dom';
import './App.css';
import { Home } from './Pages/Home';
import { Login } from './Pages/Login';
import { Signup } from './Pages/Signup';

function App() {
  return (
    <div className="App">
      

      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/Signup' element={<Signup/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
