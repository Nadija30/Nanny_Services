/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { Container } from '../Container/Container';
import css from './Header.module.css';
import { UserNav } from '../UserNav/UserNav';
import { UserBar } from '../UserBar/UserBar';
// import { useEffect } from "react";

export const Header = ({ location }) => {
  // const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <div
      className={`${css.header} ${location === '/' ? css.home : css.catalog}`}
    >
      <Container>
        <nav className={css.headerWrapper}>
          <Link className={css.logo} to="/">
            Nanny.Services
          </Link>
          {/* {isLoggedIn ? <UserNav />: <AuthNav />} */}
          <UserNav />
          <UserBar />
        </nav>
      </Container>
    </div>
  );
};
