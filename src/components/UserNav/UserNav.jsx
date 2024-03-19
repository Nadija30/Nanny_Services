import { NavLink } from "react-router-dom"
import css from './UserNav.module.css'

export const UserNav = () =>{
    const classNameFunc = ({ isActive }) =>
		`${css.link} ${isActive && css.linkActive}`;
    return <div className={css.navBar}>
                <NavLink className={classNameFunc} to="/">Home</NavLink>
				<NavLink className={classNameFunc} to="/catalog">Nannies</NavLink>
				<NavLink className={classNameFunc} to="/favorites">Favorites</NavLink>
            </div>
}