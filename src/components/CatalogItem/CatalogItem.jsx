/* eslint-disable react/prop-types */
import css from './CatalogItem.module.css';
import svg from '../../img/sprite.svg';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFav, removeFav } from '../../redux/slise';
import { PopUp } from '../PopUp/PopUp';
import { selectFav } from '../../redux/selectors';
import { Appointment } from '../ApoitmentForm/ApoitmentForm';
import { useAuth } from '../../hooks/use-auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const CatalogItem = ({ one, isOnFavPage }) => {
  const { isAutch } = useAuth();
  const [ismore, setIsmore] = useState(false);
  // const [like, setLike] = useState(false);
  const [ispopUp, setPopUp] = useState(false);

  const dispatch = useDispatch();

  const originalDate = new Date(one.birthday);
  const today = new Date();
  const originalYear = originalDate.getFullYear();
  const todayYear = today.getFullYear();
  const differenceInYears = todayYear - originalYear;

  // коли буде готова логінка, замінити на дані зі стейта

  // click on heart for logged user or guest
  // checking heart status
  const favs = useSelector(selectFav);
  const isLiked = favs.map((fav) => fav.id).includes(one.id);
  useEffect(() => {
    // Clear favorites when user logs out
    if (!isAutch) {
      dispatch(removeFav());
    }
  }, [isAutch, dispatch]);

  const toggleFavorite = (itemId) => {
    if (isAutch) {
      if (isOnFavPage) {
        dispatch(removeFav(one));
      } else {
        isLiked ? dispatch(removeFav(one)) : dispatch(addFav(one));
      }
      // Оновлюємо дані у локальному сховищі
      const updatedFavorites = isLiked
        ? favs.filter((fav) => fav.id !== one.id)
        : [...favs, one];
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      toast.error('This functionality is only available to authorized users.');
    }
  };
  const openPopUp = () => {
    setPopUp(true);
  };

  const closePopUp = () => {
    setPopUp(false);
  };

  // for detailes in card
  const showMore = () => {
    setIsmore(!ismore);
  };

  const characters = one.characters.join(', ');
  const rating = Math.round(one.rating * 10) / 10;
  return (
    <li className={css.card}>
      <div className={css.techWrapper}>
        <ul className={css.techlist}>
          <li className={css.techItem}>
            <svg className={css.pin}>
              <use href={`${svg}#icon-mapPin`}></use>
            </svg>
            {one.location}
          </li>
          <li className={css.techItem}>
            <svg className={css.star}>
              <use href={`${svg}#icon-star`}></use>
            </svg>
            Rating: {rating}
          </li>
          <li className={css.techItem}>
            Price / 1 hour:{' '}
            <span className={css.price}>{one.price_per_hour}$</span>
          </li>
        </ul>
        <svg className={css.heart} onClick={() => toggleFavorite(one.id)}>
          {isLiked ? (
            <use href={`${svg}#icon-heart-active`}></use>
          ) : (
            <use href={`${svg}#icon-heart`}></use>
          )}
        </svg>
      </div>
      <div className={css.imgWrapper}>
        <div className={css.online}></div>
        <img className={css.avatar} src={one.avatar_url} alt="avatar" />
      </div>
      <div>
        <div className={css.nameWrapper}>
          <p>Nanny</p>
          <h2 className={css.name}>{one.name}</h2>
        </div>
        <ul className={css.infoWrapper}>
          <li className={css.infoItem}>
            Age:{' '}
            <span className={`${css.underline} ${css.black}`}>
              {differenceInYears}
            </span>
          </li>
          <li className={css.infoItem}>
            Experience: <span className={css.black}>{one.experience}</span>
          </li>
          <li className={css.infoItem}>
            Kids Age: <span className={css.black}>{one.kids_age}</span>
          </li>
          <li className={css.infoItem}>
            Characters: <span className={css.black}>{characters}</span>
          </li>
          <li className={css.infoItem}>
            Education: <span className={css.black}>{one.education}</span>
          </li>
        </ul>
        <p className={css.about}>{one.about}</p>
        {!ismore && (
          <button className={css.more} type="button" onClick={showMore}>
            Read more
          </button>
        )}
        {ismore && (
          <div className={css.reviews}>
            <ul className={css.reviewsList}>
              {one.reviews.map((item, index) => (
                <li key={index}>
                  <div className={css.revWrapper}>
                    <div className={css.nameLogo}>
                      {item.reviewer.charAt(0)}
                    </div>
                    <div>
                      <p className={css.revName}>{item.reviewer}</p>
                      <p className={css.ratingWrapper}>
                        <svg className={css.star}>
                          <use href={`${svg}#icon-star`}></use>
                        </svg>{' '}
                        <span className={css.rating}>{rating}</span>
                      </p>
                    </div>
                  </div>
                  <p className={css.comment}>{item.comment}</p>
                </li>
              ))}
            </ul>
            <button
              className={css.appointment}
              type="button"
              onClick={openPopUp}
            >
              Make an appointment
            </button>
          </div>
        )}
      </div>
      {ispopUp && (
        <PopUp closePopUp={closePopUp}>
          <Appointment img={one.avatar_url} name={one.name} />
        </PopUp>
      )}
    </li>
  );
};
