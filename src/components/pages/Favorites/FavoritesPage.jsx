import { useSelector } from 'react-redux';
import { CatalogFilter } from '../../CatalogFilter/CatalogFilter';
import { Container } from '../../Container/Container';
import { CatalogList } from '../../CatalogList/CatalogList';
import { selectFav } from '../../../redux/selectors';
import css from './Favorite.module.css';
import { useState } from 'react';
const Favorites = () => {
  const [filteredCards, setFilteredCards] = useState([]);
  const data = useSelector(selectFav);
  const applyFilter = (filterCriteria) => {
    let newFilteredCards = [...data];

    switch (filterCriteria) {
      case 'A to Z':
        newFilteredCards.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Z to A':
        newFilteredCards.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'less than 10$':
        newFilteredCards = newFilteredCards.filter(
          (card) => parseFloat(card.price_per_hour) < 10
        );
        newFilteredCards.sort(
          (a, b) => parseFloat(a.price_per_hour) - parseFloat(b.price_per_hour)
        );
        break;
      case 'Greater than 10$':
        newFilteredCards = newFilteredCards.filter(
          (card) => parseFloat(card.price_per_hour) > 10
        );
        newFilteredCards.sort(
          (a, b) => parseFloat(a.price_per_hour) - parseFloat(b.price_per_hour)
        );
        break;
      case 'Popular':
        newFilteredCards = newFilteredCards.filter(
          (card) =>
            card.rating < newFilteredCards[newFilteredCards.length - 1].rating
        );
        newFilteredCards.sort((a, b) => b.rating - a.rating);
        break;
      case 'Not popular':
        newFilteredCards = newFilteredCards.filter((card) => card.rating >= 4);
        newFilteredCards.sort((a, b) => a.rating - b.rating);
        break;
      default:
        break;
    }
    setFilteredCards(newFilteredCards);
  };

  return (
    <div>
      <Container>
        <CatalogFilter applyFilter={applyFilter} />
        {data.length > 0 ? (
          <CatalogList data={filteredCards.length > 0 ? filteredCards : data} />
        ) : (
          <p className={css.placeholderText}> No favorite items found.</p>
        )}
      </Container>
    </div>
  );
};

export default Favorites;
