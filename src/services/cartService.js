import axios from '~/axios';

const cartService = {
  async getCartByUserId({ userId }) {
    try {
      const res = await axios.get(`/api/cart/${userId}`);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  },
  async deleteCart({ userId, productId }) {
    try {
      const res = await axios.delete('/api/cart', {
        data: {
          // Chuyển dữ liệu vào bên trong `data`
          userId,
          productId,
        },
      });
      return res.data;
    } catch (error) {
      console.error(error);
    }
  },
};

export default cartService;
