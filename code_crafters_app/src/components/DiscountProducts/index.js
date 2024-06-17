import '../../Global.css';
import like from '../../assets/img/like_white.png';
// import shopping_cart from '../../assets/img/shopping_cart_white.png';
import { Link } from 'react-router-dom';
import { ROOT_URL } from '../../index';
import Basket from '../Basket';

export default function DiscountProducts({ products, header, styles, filter }) {
	const handleCardClick = e => {
		// Если кликнули на карточку продукта внутри Link, предотвращаем всплытие события
		e.stopPropagation();
	};

	return (
		<div className={`${styles.sale_container} content_line`}>
			<div className={styles.component_header}>
				<h1>{header}</h1>

				<div className={styles.line}></div>

				<Link to='/all_sales'>
					<button>All sales</button>
				</Link>
			</div>

			{filter && filter}

			<div className={styles.cards_container}>
				{products.map(product => (
					<Link
						key={product.id}
						to={`/products/${product.id}`}
						className={styles.card}
						onClick={handleCardClick} // Обработчик клика на Link
					>
						<div
							className={styles.product_picture}
							style={{ backgroundImage: `url(${ROOT_URL + product.image})` }}
						>
							<div className={styles.discount_size}>
								-{Math.round((1 - product.discont_price / product.price) * 100)}
								%
							</div>
							<div className={styles.like_cart}>
								<img src={like} alt='like' />
								<Basket product={product} addToCart={true} />
								{/* <img src={shopping_cart} alt='cart' /> */}
							</div>
						</div>

						<div className={styles.product_description}>
							<h3>{product.title}</h3>
							<div className={styles.price}>
								<h2>${product.discont_price}</h2>
								<h5>${product.price}</h5>
							</div>
						</div>
					</Link>
				))}
			</div>

			<button className={styles.button_340}>All sales</button>
		</div>
	);
}
