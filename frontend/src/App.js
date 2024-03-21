
import { Route , Routes} from 'react-router-dom';
import { Login } from './Pages/Login';
import { Home } from './Pages/Home';
import { Signup } from './Pages/Signup';
import { About } from './Pages/About';
import { AdminLogin } from './AdminPanel/AdminLogin';
import { AdminHome } from './AdminPanel/AdminHome';
import { Products } from './AdminPanel/Products';
import { AdminDashboard } from './AdminPanel/AdminDashboard';
import { AdminProfile } from './AdminPanel/AdminProfile';
import { AdminOrders } from './AdminPanel/AdminOrders';
import { AdminSaleReport } from './AdminPanel/AdminSaleReport';
import { AdminUsers } from './AdminPanel/AdminUsers';
import { AdminMessages } from './AdminPanel/AdminMessages';
import { AdminSettings } from './AdminPanel/AdminSettings';
import { Header } from './Components/Header';
import { Footer } from './Components/Footer';
import {  ShopOsama } from './Pages/Shop/ShopHead';
import { UserProfile } from './Pages/Userprofile';
import { Dispensary } from './Pages/Dispensary';
import { AdminSignup } from './AdminPanel/AdminSignup';

// const UserPageWrapper = () => {
//   return(
//     <>
//     <Header />
    
//           <Routes>
//           <Route path='/' element={<Home/>}/>
//           <Route path='/login' element={<Login />} />
//           <Route path='/signup' element={<Signup />} />
//           <Route path='/about' element={<About />} />
//           <Route path='/shop' element={<Shop />} />
//           </Routes>
//     <Footer />
//   </>
//   )
// }



function App() {



  return (
    <div>
        <Routes>

{/* Admin Dashboard Routes */}

{/* Nested Route for admin Dashboard */}
        <Route path='/admin/home' element={<AdminHome/>}>
          <Route index element={<AdminDashboard/>}/>
          <Route path='profile' element={<AdminProfile/>}/>
          <Route path='orders' element={<AdminOrders/>}/>
          <Route path='salesreport' element={<AdminSaleReport/>}/>
          <Route path='users' element={<AdminUsers/>}/>
          <Route path='messages' element={<AdminMessages/>}/>
          <Route path='settings' element={<AdminSettings/>}/>



          {/* Productssssssssssssssss */}
          
          <Route path='products' element={<Products/>}>
            {/* <Route path='admin/addproduct' element={<AddProduct/>}/> */}
          </Route>

        </Route>

        <Route path='/admin' element={<AdminLogin/>}/>
        <Route path='/adminsignup' element={<AdminSignup/>}/>

        

        </Routes>
        

        {/* <UserPageWrapper/> */}
        <Routes>

{/* User part Routes */}
              <Route path='/' element={<><Header/><Home/><Footer/></>}/>
              <Route path='/login' element={<><Header/><Login/><Footer/></>}/>
              <Route path='/signup' element={<><Header/><Signup/><Footer/></>} />
              <Route path='/about' element={<><Header/><About/><Footer/></>}/>
              <Route path='/shop' element={<><Header/><ShopOsama/><Footer/></>}/>
              <Route path='/user' element={<><Header/><UserProfile/><Footer/></>}/>
              <Route path='/dispensary' element={<><Header/><Dispensary/><Footer/></>}/>
        </Routes>


    </div>
  );
}

export default App;
