
import './App.css';
import { Route , Routes} from 'react-router-dom';
import { Login } from './Pages/Login';
import { Home } from './Pages/Home';
import { Signup } from './Pages/Signup';
import { About } from './Pages/About';
//import { AdminLogin } from './AdminPanel/AdminLogin';
//import { AdminHome } from './AdminPanel/AdminHome';



function App() {
  return (
    <div>
      <Routes>
        {/* <Route path='/admin' element={<AdminLogin/>}/>
        <Route path='/admin/home' element={<AdminHome/>}/> */}
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>} />
        <Route path='/about' element={<About/>}/>
      </Routes>
    </div>
  );
}

export default App;
