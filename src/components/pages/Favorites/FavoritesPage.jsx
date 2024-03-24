import { useSelector } from 'react-redux';
import { CatalogFilter } from '../../CatalogFilter/CatalogFilter';
import { Container } from '../../Container/Container';
import { CatalogList } from '../../CatalogList/CatalogList';
import { selectFav } from '../../../redux/selectors';

const Favorites = () => {
  const data = useSelector(selectFav);
  console.log(data);
  return (
    <div>
      <Container>
        <CatalogFilter />
        <CatalogList data={data} />
      </Container>
    </div>
  );
};

export default Favorites;
