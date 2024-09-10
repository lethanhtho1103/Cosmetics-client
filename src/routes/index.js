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
import Address from '~/pages/Address';
import Introduce from '~/pages/Introduce';

const publicRoutes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/categories/:categoryName',
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
      { path: 'address', component: Address },
      { path: 'orders', component: OrderHistory },
    ],
  },
  {
    path: '/introduce',
    component: Introduce,
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
