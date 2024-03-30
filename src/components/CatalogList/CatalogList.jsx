import { useState } from 'react';
import { CatalogItem } from '../CatalogItem/CatalogItem';
import css from './CatalogList.module.css';
import { nanoid } from 'nanoid';
export const CatalogList = ({ data, isOnFavPage }) => {
  const [displayedItems, setDisplayedItems] = useState(3);
  const loadMore = () => {
    setDisplayedItems(displayedItems + 3); // Збільшуємо кількість відображених елементів на 3
  };
  return (
    <div className={css.listWrap}>
      <ul className={css.list}>
        {data.slice(0, displayedItems).map((one) => (
          <CatalogItem one={one} key={nanoid()} isOnFavPage={isOnFavPage} />
        ))}
      </ul>
      {data.length > displayedItems && (
        <button className={css.loadMoreButton} onClick={loadMore}>
          Load more
        </button>
      )}
    </div>
  );
};
