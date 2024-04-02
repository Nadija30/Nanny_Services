import ReactDOM from 'react-dom';
import svg from '../../img/sprite.svg';
import css from './PopUp.module.css';

export const PopUp = ({ closePopUp, children }) => {
  const handleEscapeKey = (event) => {
    if (event.code === 'Escape') {
      closePopUp();
      document.body.style.overflow = 'scroll';
      document.removeEventListener('keydown', handleEscapeKey);
    }
  };
  document.addEventListener('keydown', handleEscapeKey);
  const handleClose = (e) => {
    if (
      e.target.dataset.type === 'backdrop' ||
      e.target.dataset.type === 'close-modal'
    ) {
      document.body.style.overflow = 'scroll';
      closePopUp();
    }
  };
  return ReactDOM.createPortal(
    <div className={css.backdrop} onClick={handleClose} data-type="backdrop">
      <div className={css.modal}>
        <svg
          className={css.close}
          onClick={handleClose}
          data-type="close-modal"
        >
          <use href={`${svg}#icon-x`}></use>
        </svg>
        <div className={css.modalWrapper}>{children}</div>
      </div>
    </div>,
    document.getElementById('popup')
  );
};
