import React, { useState } from 'react';
import contactService from '~/services/contactService';
import UserLayout from '~/layouts/UserLayout';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CustomBreadcrumbs from '~/components/Breakcrumbs';
import './Contact.scss';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import mapImg from '~/assets/image/map.png';
import { toast } from 'react-toastify';

function Contact() {
  const routes = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Liên hệ', path: '' },
  ];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    content: '',
  });

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = {};
    if (!validateEmail(formData.email)) {
      formErrors.email = 'Vui lòng nhập địa chỉ email hợp lệ.';
    }
    try {
      const response = await contactService.createContact(
        formData.name,
        formData.email,
        formData.phone,
        formData.content,
      );
      if (response) {
        toast.success(response.message);
        setFormData({ name: '', email: '', phone: '', content: '' });
      }
    } catch (error) {
      toast.error('Đã xảy ra lỗi khi gửi liên hệ!');
    }
  };

  return (
    <UserLayout>
      <Container disableGutters maxWidth={false} className="container">
        <CustomBreadcrumbs routes={routes} />
        <main className="page-main">
          <Box className="introduce">
            <Box className="side-bar">
              <ul className="nav-items">
                <li className="nav-item">
                  <Link to="/introduce">
                    <strong>Giới thiệu</strong>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/contact" className="active">
                    <strong>Liên hệ</strong>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/policy">
                    <strong>Chính sách</strong>
                  </Link>
                </li>
              </ul>
            </Box>
            <Box className="column-main">
              <Box sx={{ mb: 2 }}>
                <img src={mapImg} alt="no-image" width={960} />
              </Box>
              <h2>Liên hệ</h2>
              <Box>
                <Box className="info-details">
                  <ul style={{ margin: 0 }}>
                    <li>Email: thob2014791@student.ctu.edu.vn</li>
                    <li>Điện thoại: 097-222-1953</li>
                    <li>Địa chỉ: 167A, hẻm 51, đường 3/2, P. Xuân Khánh, Q. Ninh Kiều, TP. Cần Thơ.</li>
                  </ul>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <h2>Thời gian làm việc</h2>
                  <ul style={{ margin: 0 }}>
                    <li>Thứ 2 - Thứ 6: từ 8h30 - 17h30</li>
                    <li>Thứ 7, Chủ nhật và ngày lễ: Nghỉ</li>
                    <li>Thời gian tư vấn/xử lý đơn online: Thứ 2 - CN: từ 8h00 - 21h30</li>
                  </ul>
                </Box>
              </Box>

              <Box sx={{ mt: 2 }}>
                <h2>Gửi Thắc Mắc Cho Chúng Tôi</h2>
                <form onSubmit={handleSubmit}>
                  <TextField
                    label="Tên"
                    variant="outlined"
                    required
                    fullWidth
                    margin="normal"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                  <TextField
                    label="Email"
                    type="email"
                    variant="outlined"
                    required
                    fullWidth
                    margin="normal"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  <Box sx={{ display: 'flex', gap: '16px' }}>
                    <TextField
                      label="Số điện thoại"
                      variant="outlined"
                      required
                      fullWidth
                      margin="normal"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </Box>
                  <TextField
                    label="Nội dung"
                    variant="outlined"
                    required
                    multiline
                    rows={4}
                    fullWidth
                    margin="normal"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                  />
                  <button variant="contained" type="submit" className="btn-submit">
                    Gửi cho chúng tôi
                  </button>
                </form>
              </Box>
            </Box>
          </Box>
        </main>
      </Container>
    </UserLayout>
  );
}

export default Contact;
