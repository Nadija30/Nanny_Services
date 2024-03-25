import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import { lazy, useEffect } from 'react';
import { Layout } from './layout';
import './App.css';
import { useAuth } from '../hooks/use-auth';

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

function PrivateRoute({ element }) {
  const { isAutch } = useAuth();

  return isAutch ? element : <Navigate to="/" replace />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />}></Route>
        <Route path="catalog" element={<Catalog />}></Route>
        <Route
          path="favorites"
          element={<PrivateRoute element={<Favorites />} />}
        />
      </Route>
      <Route path="*" element={<Redirect />}></Route>
    </Routes>
  );
}

export default App;
