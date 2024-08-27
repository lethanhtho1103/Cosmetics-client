import axios from '~/axios';

const shopService = {
  async getAllShops() {
    try {
      const res = await axios.get('/api/shop');
      return res.data;
    } catch (error) {
      console.error(error);
    }
  },
};

export default shopService;
