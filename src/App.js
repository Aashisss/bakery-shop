import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Homepage';
import Profile from './pages/Profile';
import Register from './pages/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import Cart from './pages/admin/AddToCart'; // Updated import path
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminEditProduct from './pages/admin/AdminEditProduct';
import ChangePassword from './pages/admin/changepassword';
import AdminRoutes from './protected_routes/AdminRoutes';
import UserRoutes from './protected_routes/UserRoutes';
import EditProfile from './pages/EditProfile';
import FavoritesPage from './pages/FavoritesPage';
import { useState, useEffect } from 'react';
import { getFavoritesApi } from './apis/Api';

function App() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    if (storedUserData) {
      getFavoritesApi(storedUserData._id).then((res) => {
        setFavorites(res.data.favorites);
      });
    }
  }, []);

  return (
    <Router>
      <Navbar favoritesCount={favorites.length} />
      <ToastContainer />
      <Routes>
        <Route path='/home' element={<Home favorites={favorites} setFavorites={setFavorites} />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/favorites' element={<FavoritesPage favorites={favorites} />} />
        <Route element={<UserRoutes />}>
          <Route path='/changepassword' element={<ChangePassword />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/editprofile' element={<EditProfile />} />
          <Route path='/cart' element={<Cart />} />
        </Route>
        <Route element={<AdminRoutes />}>
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path='/admin/edit/:id' element={<AdminEditProduct />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
