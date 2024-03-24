import { useState } from 'react';
import css from './CatalogFilter.module.css';
import svg from '../../img/sprite.svg';

export const CatalogFilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPick, setIsPick] = useState('Show all');
  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };
  console.log(isPick);
  const handlePick = (e) => {
    if (e.target.nodeName !== 'LI') return;
    // if (!e.target.textContent) return;
    const value = e.target.textContent;
    setIsPick(value);
    setIsOpen(false);
  };

  const closeDropdown = (e) => {
    if (e.target.dataset.type === 'dropdown') return;
    setIsOpen(false);
  };
  document.addEventListener('click', closeDropdown);

  return (
    <div className={css.filterBar}>
      <p className={css.tag}>Filters</p>
      <div className={css.input} onClick={toggleOpen} data-type="dropdown">
        <p className={css.pick}>{isPick}</p>{' '}
        <svg className={`${css.chevron} ${isOpen ? css.chevronDown : ''}`}>
          <use href={`${svg}#icon-chevron`}></use>
        </svg>
      </div>
      {isOpen && (
        <ul
          className={css.filterList}
          onClick={handlePick}
          data-type="dropdown"
        >
          <li
            className={`${css.filterItem} ${isPick === 'A to Z' && css.active}`}
          >
            A to Z
          </li>
          <li
            className={`${css.filterItem} ${isPick === 'Z to A' && css.active}`}
          >
            Z to A
          </li>
          <li
            className={`${css.filterItem} ${
              isPick === 'Less than 10$' && css.active
            }`}
          >
            Less than 10$
          </li>
          <li
            className={`${css.filterItem} ${
              isPick === 'Greater than 10$' && css.active
            }`}
          >
            Greater than 10$
          </li>
          <li
            className={`${css.filterItem} ${
              isPick === 'Popular' && css.active
            }`}
          >
            Popular
          </li>
          <li
            className={`${css.filterItem} ${
              isPick === 'Not popular' && css.active
            }`}
          >
            Not popular
          </li>
          <li
            className={`${css.filterItem} ${
              isPick === 'popular' && css.active
            }`}
          >
            Popular
          </li>
        </ul>
      )}
    </div>
  );
};
