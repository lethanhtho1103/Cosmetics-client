import axios from '~/axios';

const contactService = {
  async createContact(name, email, phone, content) {
    try {
      const res = await axios.post('/api/contact', {
        name,
        email,
        phone,
        content,
      });
      return res.data;
    } catch (error) {
      console.error(error);
    }
  },

  async getAllContacts() {
    try {
      const res = await axios.get('/api/contact');
      return res.data;
    } catch (error) {
      console.error(error);
    }
  },
};

export default contactService;
