import css from './AuthNavigation.module.css';
import Modal from '../Modal/Modal';
import { useState } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';

export const AuthNav = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [modalHeight, setModalHeight] = useState('auto');
  const openModal = () => {
    setIsModalOpen(true);
    setModalHeight('490px');
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openRegisterModal = () => {
    setIsRegisterModalOpen(true);
    setModalHeight('580px');
  };

  const closeRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  return (
    <div className={css.navBar}>
      <button className={css.button} onClick={openModal}>
        Log In
      </button>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal} height={modalHeight}>
          <LoginForm></LoginForm>
        </Modal>
      )}
      <button className={css.button} onClick={openRegisterModal}>
        Registration
      </button>
      {isRegisterModalOpen && (
        <Modal
          isOpen={isRegisterModalOpen}
          onClose={closeRegisterModal}
          height={modalHeight}
        >
          <RegisterForm></RegisterForm>
        </Modal>
      )}
    </div>
  );
};
