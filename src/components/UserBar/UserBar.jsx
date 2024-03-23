import css from './UserBar.module.css';
import { useAuth } from '../../hooks/use-auth';
import { useDispatch } from 'react-redux';
import { removeUser } from '../../redux/userSlise';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import sprite from '../../img/sprite.svg';

export const UserBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(removeUser());
    navigate('/');
  };

  const { isAutch, name } = useAuth();
  return isAutch ? (
    <div className={css.blockWrap}>
      <div className={css.userBlock}>
        <div className={css.userSvgWrap}>
          <svg className={css.userSvg}>
            <use href={`${sprite}#icon-mdi_user`} />
          </svg>
        </div>
        <p className={css.userName}>{name}</p>
      </div>
      <button onClick={handleLogout} className={css.logOut}>
        Log out
      </button>
    </div>
  ) : (
    <NavLink to="/" />
  );
};
