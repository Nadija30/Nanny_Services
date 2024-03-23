/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { Container } from '../Container/Container';
import css from './Header.module.css';
import { UserNav } from '../UserNav/UserNav';
import { UserBar } from '../UserBar/UserBar';
import { AuthNav } from '../AuthNavigation/AuthNavigation';
import { useAuth } from '../../hooks/use-auth';

export const Header = ({ location }) => {
  const { isAutch, email } = useAuth();
  return (
    <div
      className={`${css.header} ${location === '/' ? css.home : css.catalog}`}
    >
      <Container>
        <nav className={css.headerWrapper}>
          <Link className={css.logo} to="/">
            Nanny.Services
          </Link>
          {isAutch ? (
            <>
              <UserNav />
              <UserBar />
            </>
          ) : (
            <>
              <UserNav />
              <AuthNav />
            </>
          )}
        </nav>
      </Container>
    </div>
  );
};
