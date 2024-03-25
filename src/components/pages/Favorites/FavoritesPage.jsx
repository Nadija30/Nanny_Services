import { useSelector } from 'react-redux';
import { CatalogFilter } from '../../CatalogFilter/CatalogFilter';
import { Container } from '../../Container/Container';
import { CatalogList } from '../../CatalogList/CatalogList';
import { selectFav } from '../../../redux/selectors';
import css from './Favorite.module.css';
const Favorites = () => {
  const data = useSelector(selectFav);
  console.log(data);
  return (
    <div>
      <Container>
        <CatalogFilter />
        {data.length > 0 ? (
          <CatalogList data={data} />
        ) : (
          <p className={css.placeholderText}> No favorite items found.</p>
        )}
      </Container>
    </div>
  );
};

export default Favorites;
