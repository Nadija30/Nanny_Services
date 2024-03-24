/* eslint-disable react/prop-types */
import { CatalogItem } from '../CatalogItem/CatalogItem';
import css from './CatalogList.module.css';
import { nanoid } from 'nanoid';
export const CatalogList = ({ data, isOnFavPage }) => {
  return (
    <ul className={css.list}>
      {data.map((one) => (
        <CatalogItem one={one} key={nanoid()} isOnFavPage={isOnFavPage} />
      ))}
    </ul>
  );
};
