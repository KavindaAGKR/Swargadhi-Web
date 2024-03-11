
import './App.css';
import { Route , Routes} from 'react-router-dom';
import { Login } from './Pages/Login';
import { Home } from './Pages/Home';
import { Signup } from './Pages/Signup';
import { About } from './Pages/About';
import { AdminLogin } from './AdminPanel/AdminLogin';
import { AdminHome } from './AdminPanel/AdminHome';
import { AddProduct } from './AdminPanel/AddProduct';
import { Products } from './AdminPanel/Products';
import { AdminDashboard } from './AdminPanel/AdminDashboard';
import { AdminProfile } from './AdminPanel/AdminProfile';
import { AdminOrders } from './AdminPanel/AdminOrders';
import { AdminSaleReport } from './AdminPanel/AdminSaleReport';
import { AdminUsers } from './AdminPanel/AdminUsers';
import { AdminMessages } from './AdminPanel/AdminMessages';
import { AdminSettings } from './AdminPanel/AdminSettings';



function App() {
  return (
    <div>
      <Routes>

{/* Admin Dashboard Routes */}

{/* Nested Route for admin Dashboard */}
        <Route path='/admin/home' element={<AdminHome/>}>
          <Route index element={<AdminDashboard/>}/>
          <Route path='admin/profile' element={<AdminProfile/>}/>
          <Route path='admin/orders' element={<AdminOrders/>}/>
          <Route path='admin/salesreport' element={<AdminSaleReport/>}/>
          <Route path='admin/users' element={<AdminUsers/>}/>
          <Route path='admin/messages' element={<AdminMessages/>}/>
          <Route path='admin/settings' element={<AdminSettings/>}/>



          {/* Productssssssssssssssss */}
          
          <Route path='admin/products' element={<Products/>}>
              
          </Route>

        </Route>

        <Route path='/admin/addproduct' element={<AddProduct/>}/>
        <Route path='/admin' element={<AdminLogin/>}/>
        
        

        


{/* User part Routes */}
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>} />
        <Route path='/about' element={<About/>}/>
      </Routes>
    </div>
  );
}

export default App;
