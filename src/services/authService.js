import axios from '~/axios';
import { loginSuccess, logOutSuccess } from '~/redux/authSlice';

const authService = {
  async login(email, password, dispatch) {
    const res = await axios.post('/api/authentication/login-user', {
      email: email,
      password: password,
    });
    return res.data;
  },
  async logOut(dispatch, id, navigate, accessToken) {
    await axios.post('/api/authentication/logout', id, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(logOutSuccess());
    navigate('/login');
  },
};

export default authService;
