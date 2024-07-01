import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from './Header.module.css';
import ThemeButton from './ThemeButton/index';
import logo from '../../assets/img/logo.png';
import like from '../../assets/img/like.png';
import like_darkTheme from '../../assets/img/like_darkTheme.png';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { RxHamburgerMenu } from 'react-icons/rx';
import { RxCross2 } from 'react-icons/rx';
import Basket from '../Basket/index';
import { closeModalAction, openModalAction } from '../../store/modalReducer';
import axios from 'axios';
import DailyDealModal from '../ModalWindow/DailyDealModal';
import { ROOT_URL } from '../..';

export default function Header() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [product, setProduct] = useState(null);
	const navigate = useNavigate();
	const isLight = useSelector(state => state.theme.isLight);

	const handleBasketClick = () => {
		navigate('/shopping_cart', { state: { from: 'Header' } });
	};

	const openModal = e => {
		e.preventDefault();
		axios
			.get(`${ROOT_URL}products/all`)
			.then(response => {
				const products = response.data;
				const randomProduct =
					products[Math.floor(Math.random() * products.length)];
				setProduct(randomProduct);
				setIsModalOpen(true);
			})
			.catch(error => {
				console.error('Error fetching products:', error);
			});
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const handlePopupMenu = () => {
		setIsPopupOpen(!isPopupOpen);
	};

	return (
		<header className={`${s.container} ${s.content_line}`}>
			<div className={s.header_left}>
				<Link to='/'>
					<img src={logo} alt='logo' />
				</Link>

				<ThemeButton className={s.theme_button} />
			</div>

			<div className={s.header_center}>
				<Link to='#' onClick={openModal}>
					<div className={s.discount}>1 day discount!</div>
				</Link>

				<nav>
					<ul className={s.nav_menu}>
						<NavLink to='/'>
							<li>Main Page</li>
						</NavLink>
						<NavLink to='/all_categories'>
							<li>Categories</li>
						</NavLink>
						<NavLink to='/all_products'>
							<li>All Products</li>
						</NavLink>
						<NavLink to='/all_sales'>
							<li>All Sales</li>
						</NavLink>
					</ul>
				</nav>
			</div>

			<div className={s.header_right}>
				<NavLink to='/liked_products'>
					<img src={isLight ? like : like_darkTheme} alt='like' />
				</NavLink>
				<NavLink to='/shopping_cart' className={s.shopping_cart}>
					<Basket onClick={handleBasketClick} />
				</NavLink>

				{/* <RxHamburgerMenu className={s.burger} /> */}

				<div className={`${s.modal_menu} ${isPopupOpen ? s.active : ''}`}>
					<RxCross2
						className={`${s.cross} ${isPopupOpen ? s.active : ''}`}
						onClick={handlePopupMenu}
					/>
					<nav>
						<ul className={`${s.nav_menu} ${isPopupOpen ? s.active : ''}`}>
							<NavLink to='/'>
								<li>Main Page</li>
							</NavLink>
							<NavLink to='/all_categories'>
								<li>Categories</li>
							</NavLink>
							<NavLink to='/all_products'>
								<li>All Products</li>
							</NavLink>
							<NavLink to='/all_sales'>
								<li>All Sales</li>
							</NavLink>
						</ul>
					</nav>
					<div
						className={`${s.discount} ${isPopupOpen ? s.active : ''}`}
						onClick={openModal}
					>
						1 day discount!
					</div>
				</div>
				<RxHamburgerMenu className={s.burger} onClick={handlePopupMenu} />
			</div>

			<DailyDealModal
				isOpen={isModalOpen}
				onRequestClose={closeModal}
				product={product}
			/>
		</header>
	);
}
