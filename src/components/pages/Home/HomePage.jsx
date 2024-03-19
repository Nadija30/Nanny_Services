import { Container } from "../../Container/Container";
import css from "./HomePage.module.css";

const Home = () => {
	return (
		<div className={css.homePage}>
			<Container>
				<div className={css.homePageWrapper}></div>
			</Container>
		</div>
	);
};

export default Home;
