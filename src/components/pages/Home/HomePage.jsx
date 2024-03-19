import { NavLink } from 'react-router-dom';
import { Container } from '../../Container/Container';
import css from './HomePage.module.css';
import sprite from '../../../img/sprite.svg';

const Home = () => {
  //   const isLoggedIn = useSelector(selectIsLoggedIn);
  // const user = useSelector(selectUser);
  return (
    <div className={css.homePage}>
      <Container>
        <div className={css.contentPage}>
          <h1 className={css.titleH1}>
            Make Life Easier <br />
            for the Family:
          </h1>
          <p className={css.titleH2}>
            Find Babysitters Online for All Occasions
          </p>
          <button className={css.button}>
            <NavLink to="/login">
              Get started{' '}
              <svg className={css.butonSvg} height={24}>
                <use href={`${sprite}#icon-Arrow`} />
              </svg>
            </NavLink>
          </button>
          <div className={css.heroInfoBlock}>
            <div className={css.heroInfoBlockSvgWrap}>
              <svg className={css.heroSvg}>
                <use href={`${sprite}#icon-fe_check`} />
              </svg>
            </div>
            <div>
              <p className={css.heroInfoBlockText}>Experienced nannies</p>
              <p className={css.heroInfoBlockNumber}>15,000</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Home;
