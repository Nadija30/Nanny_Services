import { useEffect, useState } from 'react';
import css from './CatalogFilter.module.css';
import svg from '../../img/sprite.svg';

export const CatalogFilter = ({ applyFilter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPick, setIsPick] = useState('Show all');

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handlePick = (e) => {
    if (e.target.nodeName !== 'LI') return;
    const value = e.target.textContent;
    setIsPick(value);
    setIsOpen(false);
    applyFilter(value); // Викликаємо функцію зовнішнього компонента з вибраним критерієм
  };

  useEffect(() => {
    const closeDropdown = (e) => {
      if (e.target.dataset.type === 'dropdown') return;
      setIsOpen(false);
    };

    document.addEventListener('click', closeDropdown);

    return () => {
      document.removeEventListener('click', closeDropdown);
    };
  }, []);

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
          <li className={css.filterItem}>Show all</li>
          <li className={css.filterItem}>A to Z</li>
          <li className={css.filterItem}>Z to A</li>
          <li className={css.filterItem}>Less than 10$</li>
          <li className={css.filterItem}>Greater than 10$</li>
          <li className={css.filterItem}>Popular</li>
          <li className={css.filterItem}>Not popular</li>
        </ul>
      )}
    </div>
  );
};
