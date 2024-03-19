import { NavLink } from 'react-router-dom';
import css from './AuthNavigation.module.css';

export const AuthNav = () => {
  return (
    <div className={css.navBar}>
      <NavLink to="/login">Log In</NavLink>
      <NavLink to="/register">Registration</NavLink>
    </div>
  );
};
