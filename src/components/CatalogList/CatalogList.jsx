/* eslint-disable react/prop-types */
import { CatalogItem } from "../CatalogItem/CatalogItem";
import css from "./CatalogList.module.css";
import { nanoid } from "nanoid";
export const CatalogList = ({ data }) => {
	return (
		<ul className={css.list}>
			{data.map((item) => (
				<CatalogItem key={nanoid()} data={item} />
			))}
		</ul>
	);
};
