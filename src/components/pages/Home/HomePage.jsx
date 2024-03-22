import { Container } from '../../Container/Container';
import css from './HomePage.module.css';
import sprite from '../../../img/sprite.svg';
import { useState } from 'react';
import Modal from '../../Modal/Modal';
import LoginForm from '../../LoginForm/LoginForm';
const Home = () => {
  //   const isLoggedIn = useSelector(selectIsLoggedIn);
  // const user = useSelector(selectUser);
  const [isModalOpen, setIsModalOpen] = useState(false); // Стан для відстеження відкриття/закриття модального вікна

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className={css.homePage}>
      <Container>
        <div className={css.contentPage}>
          <h1 className={css.title}>
            Make Life Easier <br />
            for the Family:
          </h1>
          <p className={css.text}>Find Babysitters Online for All Occasions</p>
          <button className={css.button} onClick={openModal}>
            Get started{' '}
            <svg className={css.butonSvg} height={24}>
              <use href={`${sprite}#icon-Arrow`} />
            </svg>
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
        {isModalOpen && (
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <LoginForm></LoginForm>
          </Modal>
        )}
      </Container>
    </div>
  );
};

export default Home;
