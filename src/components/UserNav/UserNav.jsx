import { NavLink } from 'react-router-dom';
import css from './UserNav.module.css';
import { useAuth } from '../../hooks/use-auth';

export const UserNav = () => {
  const { isAutch, email } = useAuth();
  const classNameFunc = ({ isActive }) =>
    `${css.link} ${isActive && css.linkActive}`;
  return (
    <div className={css.navBar}>
      {isAutch ? (
        <>
          <NavLink className={classNameFunc} to="/">
            Home
          </NavLink>
          <NavLink className={classNameFunc} to="/catalog">
            Nannies
          </NavLink>
          <NavLink className={classNameFunc} to="/favorites">
            Favorites
          </NavLink>
        </>
      ) : (
        <>
          <NavLink className={classNameFunc} to="/">
            Home
          </NavLink>
          <NavLink className={classNameFunc} to="/catalog">
            Nannies
          </NavLink>
        </>
      )}
    </div>
  );
};
