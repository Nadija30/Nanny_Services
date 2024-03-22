import { useCallback, useEffect } from 'react';
import { handleClose } from '../../shared/utils';
import sprite from '../../img/sprite.svg';
import css from './Modal.module.css';
import ReactDOM from 'react-dom';

const modalContainer = document.getElementById('modal');

const Modal = ({ onClose, children, isOpen }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
  }, [isOpen]);
  const handleModalClose = useCallback(
    (e) => {
      document.body.style.overflow = 'visible';
      handleClose(e, onClose);
    },
    [onClose]
  );

  useEffect(() => {
    document.body.addEventListener('keydown', handleModalClose);

    return () => document.body.removeEventListener('keydown', handleModalClose);
  }, [handleModalClose]);

  return ReactDOM.createPortal(
    <div className={css.backdrop} onClick={handleModalClose}>
      <div className={css.modal}>
        <svg className={css.modalSvg} onClick={onClose} width="24" height="24">
          <use href={`${sprite}#icon-x`} />
        </svg>
        {children}
      </div>
    </div>,
    modalContainer
  );
};

export default Modal;
