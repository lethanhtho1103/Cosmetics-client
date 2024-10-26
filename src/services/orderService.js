import axios from '~/axios';

const orderService = {
  async checkout(userId, products, isPayment, shipping_method, shipping_cost) {
    if (!Array.isArray(products) || products.length === 0) {
      throw new Error('Danh sách sản phẩm không hợp lệ');
    }
    try {
      const response = await axios.post('/api/order', {
        userId,
        products,
        isPayment,
        shipping_method,
        shipping_cost,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Đặt hàng thất bại');
    }
  },

  async getOrderById(userId) {
    try {
      const res = await axios.get(`/api/order/user/${userId}`);
      return res?.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Thất bại');
    }
  },
  async updateStatus(orderId, status) {
    try {
      const response = await axios.put('/api/order/update/status', {
        orderId,
        status,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Cập nhật trạng thái thất bại');
    }
  },
};

export default orderService;
