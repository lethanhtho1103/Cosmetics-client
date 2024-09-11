import axios from '~/axios';

const commentService = {
  async createComment(user_id, product_id, star, content) {
    try {
      const response = await axios.post('/api/comment', {
        user_id,
        product_id,
        star,
        content,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Đánh giá thất bại');
    }
  },

  async getCommentByProductId(product_id) {
    try {
      const response = await axios.get(`/api/comment/${product_id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Thất bại');
    }
  },

  async updateComment(user_id, product_id, star, content) {
    try {
      const response = await axios.put(`/api/comment/${user_id}/${product_id}`, {
        star,
        content,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Cập nhật đánh giá thất bại');
    }
  },

  async deleteComment(user_id, product_id) {
    try {
      const response = await axios.delete(`/api/comment/${user_id}/${product_id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Xóa đánh giá thất bại');
    }
  },
};

export default commentService;
