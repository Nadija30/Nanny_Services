import css from './UserBar.module.css';
import { useAuth } from '../../hooks/use-auth';
import { useDispatch } from 'react-redux';
import { removeUser } from '../../redux/userSlise';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import sprite from '../../img/sprite.svg';
import { useEffect, useState } from 'react';

export const UserBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    dispatch(removeUser());
    navigate('/');
  };
  const [displayName, setDisplayName] = useState(null);

  useEffect(() => {
    // Отримання даних про користувача з локального сховища при завантаженні компоненту
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setDisplayName(user.displayName); // Встановлення displayName з локального сховища
    }
  }, []);
  const { isAutch } = useAuth();
  return isAutch ? (
    <div className={css.blockWrap}>
      <div className={css.userBlock}>
        <div className={css.userSvgWrap}>
          <svg className={css.userSvg}>
            <use href={`${sprite}#icon-mdi_user`} />
          </svg>
        </div>
        <p className={css.userName}>{displayName}</p>
      </div>
      <button onClick={handleLogout} className={css.logOut}>
        Log out
      </button>
    </div>
  ) : (
    <NavLink to="/" />
  );
};
