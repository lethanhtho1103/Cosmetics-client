import axios from '~/axios';
import { logOutSuccess } from '~/redux/authSlice';

const authService = {
  async login(email, password) {
    const res = await axios.post('/api/authentication/login-user', {
      email,
      password,
    });
    return res.data;
  },
  async register(formData) {
    const res = await axios.post('/api/authentication/register', formData);
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
