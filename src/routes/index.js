import Account from '~/pages/Account';
import AccountInfo from '~/pages/AccountInfo';
import Cart from '~/pages/Cart';
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import OrderHistory from '~/pages/OrderHistory';
import OAuthCallback from '~/pages/OAuthCallback/OAuthCallback';
import Product from '~/pages/Product';
import ProductDetail from '~/pages/ProductDetail/idnex';
import Register from '~/pages/Register';

const publicRoutes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/:categoryName',
    component: Product,
  },
  {
    path: '/product-detail/:nameProduct',
    component: ProductDetail,
  },

  {
    path: '/cart',
    component: Cart,
    isLogin: true,
  },
  {
    path: '/account',
    component: Account,
    isLogin: true,
    children: [
      { path: '', component: AccountInfo },
      { path: 'orders', component: OrderHistory },
    ],
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/oauth-callback/:token',
    component: OAuthCallback,
  },
];

export { publicRoutes };
