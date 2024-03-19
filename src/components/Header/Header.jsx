/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Container } from "../Container/Container";
import css from './Header.module.css'
import { UserNav } from "../UserNav/UserNav";
import { UserBar } from "../UserBar/UserBar";
// import { useEffect } from "react";

export const Header = ({location}) => {
	
	
	return (
		<div className={`${css.header} ${location === '/' ? css.home : css.catalog}`}>
			<Container>
				<nav className={css.headerWrapper}>
				<Link className={css.logo} to="/">Nanny.Sevices</Link>
				<UserNav/>
				<UserBar/>
				</nav>
			</Container>
		</div>
	);
};
