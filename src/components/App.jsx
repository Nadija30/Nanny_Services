import { Route, Routes, useNavigate } from 'react-router-dom';
import { lazy, useEffect } from 'react';
import { Layout } from './layout';
import './App.css';
import LoginForm from './LoginForm/LoginForm';

const Home = lazy(() => import('./pages/Home/HomePage'));
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
