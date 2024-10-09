import axios from '~/axios';

const promotionService = {
  async getAllPromotions() {
    try {
      const res = await axios.get('/api/promotions');
      return res.data;
    } catch (error) {
      console.error(error);
    }
  },

  async getAllProductByPromotionId(promotion_id) {
    try {
      const res = await axios.get(`/api/products/promotions/promotion_id/${promotion_id}`);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  },
};

export default promotionService;
