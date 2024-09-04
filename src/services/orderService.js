import axios from '~/axios';

const orderService = {
  async checkout(userId, products, isPayment) {
    if (!Array.isArray(products) || products.length === 0) {
      throw new Error('Danh sách sản phẩm không hợp lệ');
    }
    try {
      const response = await axios.post('/api/order', {
        userId,
        products,
        isPayment,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Đặt hàng thất bại');
    }
  },
};

export default orderService;
