import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage/index';
import AllProductsPage from './pages/AllProductsPage/index';
import DiscountedItemsPage from './pages/DiscountedItemsPage/index';
import ProductsFromCategoryPage from './pages/AllCategoriesPage/ProductsFromCategoryPage/index';
import ProductItemPage from './pages/ProductItemPage/index';
import ShoppingCartPage from './pages/ShoppingCartPage/index';
import LikedProductsPage from './pages/LikedProductsPage/index';
import NotFoundPage from './pages/NotFoundPage/index';
import Layout from './Layout';
import AllCategoriesPage from './pages/AllCategoriesPage/index'; 


export const router = createBrowserRouter([
	{
		element: <Layout />,
		children: [
			{ path: '/', element: <HomePage /> },
		/* { path: '/categories', element: <CategoriesPage /> },*/	
			{ path: '/all_products', element: <AllProductsPage /> },
			{ path: '/all_sales', element: <DiscountedItemsPage /> },
			{ path: '/products', element: <ProductsFromCategoryPage /> },
			{ path: '/products/product_item', element: <ProductItemPage /> },
			{ path: '/shopping_cart', element: <ShoppingCartPage /> },
			{ path: '/liked_products', element: <LikedProductsPage /> },
			{ path: '/all_categories', element: <AllCategoriesPage /> }, 

			{
				path: '*',
				element: <NotFoundPage />,
			},
		],
	},
]);
