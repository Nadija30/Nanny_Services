import { Route, Routes, useNavigate } from 'react-router-dom';
import { lazy, useEffect } from 'react';
import { Layout } from './layout';
import './App.css';

const Home = lazy(() => import('./pages/Home/HomePage'));
const Register = lazy(() => import('./pages/Register/RegisterPage'));
const Login = lazy(() => import('./pages/Login/LoginPage'));
const Catalog = lazy(() => import('./pages/Catalog/CatalogPage'));
const Favorites = lazy(() => import('./pages/Favorites/FavoritesPage'));

const Redirect = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/', { replace: true });
  });
  return null;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />}></Route>
        <Route path="register" element={<Register />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="catalog" element={<Catalog />}></Route>
        <Route path="favorites" element={<Favorites />}></Route>
        {/* <Route path="*" element={<Home />}></Route> */}
      </Route>
      {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      <Route path="*" element={<Redirect />}></Route>
    </Routes>
  );
}

export default App;
