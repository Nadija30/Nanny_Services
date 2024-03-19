import { useEffect, useState } from "react";
import { fetchData } from "../../../firebase/fetch";
import { Container } from "../../Container/Container";
import { CatalogList } from "../../CatalogList/CatalogList";
import { CatalogFilter } from "../../CatalogFilter/CatalogFilter";

const Catalog = () => {
	const [items, setItems] = useState([]);

	const fetchDataFromAPI = async () => {
		try {
			const data = await fetchData();
			console.log(data)
			setItems(data);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

    useEffect(() => {
        fetchDataFromAPI();
    }, [])
	return <div>
		<Container>
			<CatalogFilter/>
			<CatalogList data={items} />
		</Container>
		</div>;
};

export default Catalog;
