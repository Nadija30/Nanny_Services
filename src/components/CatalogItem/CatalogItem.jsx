/* eslint-disable react/prop-types */
import css from "./CatalogItem.module.css";
import svg from "../../img/sprite.svg";
import { useState } from "react";
export const CatalogItem = ({ data }) => {
	const [ismore, setIsmore] = useState(false);
	const [like, setLike] = useState(false);
	const originalDate = new Date(data.birthday);
	const today = new Date();
	const originalYear = originalDate.getFullYear();
	const todayYear = today.getFullYear();
	const differenceInYears = todayYear - originalYear;

	const showMore = () => {
		setIsmore(!ismore);
	};

	const handleLike = () => {
		// !isLiked
		// 	? dispatch(addCard(data))
		// 	: dispatch(removeCard(data.id));
		setLike(!like);
	};

	const characters = data.characters.join(", ");
	const rating = Math.round(data.rating * 10) / 10;
	return (
		<li className={css.card}>
			<div className={css.techWrapper}>
				<ul className={css.techlist}>
					<li className={css.techItem}>
						<svg className={css.pin}>
							<use href={`${svg}#icon-mapPin`}></use>
						</svg>
						{data.location}
					</li>
					<li className={css.techItem}>
						<svg className={css.star}>
							<use href={`${svg}#icon-star`}></use>
						</svg>
						Rating: {rating}
					</li>
					<li className={css.techItem}>
						Price / 1 hour:{" "}
						<span className={css.price}>
							{data.price_per_hour}&#36;
						</span>
					</li>
				</ul>
				{/* <svg className={css.heart}>
					<use href={`${svg}#icon-heart`}></use>
				</svg> */}
				<svg
					className={`${css.heart} ${like && css.heartActive}`}
					onClick={handleLike}
				>
					{like ? (
						<use href={`${svg}#icon-heart-active`}></use>
					) : (
						<use href={`${svg}#icon-heart`}></use>
					)}
				</svg>
			</div>
			<div className={css.imgWrapper}>
				<div className={css.online}></div>
				<img
					className={css.avatar}
					src={data.avatar_url}
					alt="avatar"
				/>
			</div>
			<div>
				<div className={css.nameWrapper}>
					<p>Nanny</p>
					<h2>{data.name}</h2>
				</div>
				<ul className={css.infoWrapper}>
					<li className={css.infoItem}>
						Age:{" "}
						<span className={css.underline}>{differenceInYears}</span>
					</li>
					<li className={css.infoItem}>
						Experience: {data.experience}
					</li>
					<li className={css.infoItem}>Kids Age: {data.kids_age}</li>
					<li className={css.infoItem}>Characters: {characters}</li>
					<li className={css.infoItem}>
						Education: {data.education}
					</li>
				</ul>
				<p>{data.about}</p>
				{!ismore && (
					<button
						className={css.more}
						type="button"
						onClick={showMore}
					>
						Read more
					</button>
				)}
				{ismore && (
					<div className={css.reviews}>
						<ul className={css.reviewsList}>
							{data.reviews.map((item, index) => (
								<li key={index}>
									<div className={css.revWrapper}>
										<div className={css.nameLogo}>
											{item.reviewer.charAt(0)}
										</div>
										<div>
											<p className={css.revName}>{item.reviewer}</p>
											<p className={css.ratingWrapper}>
												<svg className={css.star}>
													<use href={`${svg}#icon-star`}></use>
												</svg>{" "}
												<span className={css.rating}>{rating}</span>
											</p>
										</div>
									</div>
									<p>{item.comment}</p>
								</li>
							))}
						</ul>
						<button className={css.appointment} type="button">
							Make an appointment
						</button>
					</div>
				)}
			</div>
		</li>
	);
};
