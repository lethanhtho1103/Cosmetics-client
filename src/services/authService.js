import axios from '~/axios';

const authService = {
  async login(email, password) {
    const res = await axios.post('/api/authentication/login-user', {
      email: email,
      password: password,
    });
    return res.data;
  },
};

export default authService;
