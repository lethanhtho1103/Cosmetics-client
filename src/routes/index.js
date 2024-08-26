import Cart from '~/pages/Cart';
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import OAuthCallback from '~/pages/OAuthCallback/OAuthCallback';
import ProductDetail from '~/pages/ProductDetail/idnex';
import Register from '~/pages/Register';

const publicRoutes = [
  {
    path: '/',
    component: Home,
    // isLogin: true,
  },
  {
    path: 'product-detail/:nameProduct',
    component: ProductDetail,
  },
  {
    path: '/cart',
    component: Cart,
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
