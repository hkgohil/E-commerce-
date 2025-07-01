import './App.css'
import AdminLayout from './components/admin-view/layout';
import AuthLayout from './components/auth/layout'
import ShoppingLayout from './components/shopping-view/layout';
import Admindashboard from './pages/auth/admin-view/dashboard';
import AdminFeatures from './pages/auth/admin-view/features';
import AdminOrders from './pages/auth/admin-view/orders';
import AdminProducts from './pages/auth/admin-view/products';
import Authlogin from './pages/auth/login'
import AuthRegister from './pages/auth/register'
import { Routes, Route } from 'react-router-dom';
import NotFound from './pages/not-found';
import Shoppinghome from './pages/Shopping-view/home';
import Shoppinglisting from './pages/Shopping-view/listing';
import ShoppingCheckout from './pages/Shopping-view/checkout';
import Shoppingaccount from './pages/Shopping-view/account';
import CheckAuth from './components/common/check-auth';
import UnAuthPage from './pages/unauth-page';
import { useSelector, useDispatch } from 'react-redux';
import { checkAuth } from './store/auth-slice';
import { useEffect } from 'react';
import { Skeleton } from './components/ui/skeleton';

function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth()).catch(() => {});
  }, [dispatch]);

  if (isLoading) return <Skeleton className="w-[800] bg-black h-[600px]" />;

  console.log(isLoading, user);

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route path="/auth" element={ 
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>
          }>
          <Route path="login" element={<Authlogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>
        <Route path="/admin" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout/>
          </CheckAuth>
        }>
         <Route path="dashboard" element={<Admindashboard/>}/>
         <Route path="orders" element={<AdminOrders/>}/>
         <Route path="products" element={<AdminProducts/>}/>
        <Route path="features" element={<AdminFeatures/>}/>
        </Route>
        <Route path="/shop" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout/>
          </CheckAuth>
        }>
         <Route path="home" element={<Shoppinghome/>}/>
          <Route path="listing" element={<Shoppinglisting/>}/>
           <Route path="checkout" element={<ShoppingCheckout/>}/>
            <Route path="account" element={<Shoppingaccount/>}/>
        </Route>
        <Route path="*" element={<NotFound/>}/>
        <Route path="/unauth-page" element={<UnAuthPage/>}/>
      </Routes>
    </div>
  )
}

export default App
