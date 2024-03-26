import { useEffect, useState } from 'react';
import { Container } from '../../Container/Container';
import { useDispatch, useSelector } from 'react-redux';
import { CatalogList } from '../../CatalogList/CatalogList';
import { CatalogFilter } from '../../CatalogFilter/CatalogFilter';
import { selectNannies } from '../../../redux/selectors';
import { fetchAllNannies } from '../../../redux/thunk';

const CatalogPage = () => {
  const dispatch = useDispatch();
  const [filteredCards, setFilteredCards] = useState([]); // Стейт для зберігання відфільтрованих карток
  const [dataLoaded, setDataLoaded] = useState(false);

  const applyFilter = (filterCriteria) => {
    console.log('Applying filter:', filterCriteria);
    let newFilteredCards = [...data]; // Клонуємо список всіх карток

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
        ); // сортування за зростанням
        break;
      case 'Greater than 10$':
        newFilteredCards = newFilteredCards.filter(
          (card) => parseFloat(card.price_per_hour) > 10
        );
        newFilteredCards.sort(
          (a, b) => parseFloat(a.price_per_hour) - parseFloat(b.price_per_hour)
        ); // Сортування за зростанням ціни
        break;
      case 'Popular':
        newFilteredCards = newFilteredCards.filter(
          (card) =>
            card.rating < newFilteredCards[newFilteredCards.length - 1].rating
        );
        newFilteredCards.sort((a, b) => b.rating - a.rating);
        break;
      case 'Not popular':
        newFilteredCards = newFilteredCards.filter((card) => card.rating >= 4); // Фільтрувати за рейтингом 4 і вище
        newFilteredCards.sort((a, b) => a.rating - b.rating); // Сортувати за зростанням рейтингу
        break;
      default:
        // Якщо фільтр "Show all" або інший фільтр не потребує фільтрації,
        // залиште список карток без змін
        break;
    }
    console.log('Filtered cards:', newFilteredCards);
    setFilteredCards(newFilteredCards); // Встановлюємо відфільтровані картки в стейт
  };

  const data = useSelector(selectNannies);
  const filter = 'z-to-a';
  const page = 2;

  useEffect(() => {
    if (!dataLoaded) {
      dispatch(fetchAllNannies(filter, page));
      setDataLoaded(true);
    }
  }, [dispatch, dataLoaded, filter, page]);

  return (
    <div>
      <Container>
        <CatalogFilter applyFilter={applyFilter} />
        <CatalogList data={filteredCards.length > 0 ? filteredCards : data} />
      </Container>
    </div>
  );
};

export default CatalogPage;
