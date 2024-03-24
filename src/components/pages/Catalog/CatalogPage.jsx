import { useEffect } from 'react';
import { Container } from '../../Container/Container';
import { useDispatch, useSelector } from 'react-redux';
import { CatalogList } from '../../CatalogList/CatalogList';
import { CatalogFilter } from '../../CatalogFilter/CatalogFilter';
import { selectNannies } from '../../../redux/selectors';
import { fetchAllNannies } from '../../../redux/thunk';

const CatalogPage = () => {
  const dispatch = useDispatch();

  const data = useSelector(selectNannies);
  // const filter = useSelector(selectFilter);
  const filter = 'z-to-a';
  const page = 2;

  // const [localFilter, setLocalFilter] = useState(filter);

  console.log('data from NanniesPage >>', data);
  console.log('filter from NanniesPage >>', filter);

  useEffect(() => {
    if (!data || !data.length) {
      dispatch(fetchAllNannies(filter, page));
    }
  }, [dispatch, data, filter]);

  return (
    <div>
      <Container>
        <CatalogFilter />
        <CatalogList data={data} />
      </Container>
    </div>
  );
};

export default CatalogPage;
