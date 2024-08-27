import UserLayout from '~/layouts/UserLayout';
import { Box, Container, FormControlLabel, Grid, Typography, Checkbox } from '@mui/material';
import CustomBreadcrumbs from '~/components/Breakcrumbs';
import './Cart.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import cartEmptyIcon from '~/assets/image/cart-empty.svg';

function Cart() {
  const [selectAll, setSelectAll] = useState(false);
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Tinh Chất Skin1004 Madagascar Centella Ampoule ',
      price: 488000,
      quantity: 2,
      selected: false,
      image:
        'https://www.guardian.com.vn/media/catalog/product/cache/8cdab6df920e0b94284cbfe2b9c345a4/t/h/thumbnail_3021692_k6dhxtt6fkkqqged.jpg',
    },
    {
      id: 2,
      name: 'Thực Phẩm Bảo Vệ Sức Khỏe Xuân Nguyên Hà Thủ Ô 5 Trong 1 Dạng Viên 250Gr',
      price: 218000,
      quantity: 1,
      selected: false,
      image:
        'https://www.guardian.com.vn/media/catalog/product/cache/8cdab6df920e0b94284cbfe2b9c345a4/t/h/thumbnail_3021692_k6dhxtt6fkkqqged.jpg',
    },
  ]);

  const handleQuantityChange = (index, delta) => {
    const newCartItems = [...cartItems];
    const newQuantity = newCartItems[index].quantity + delta;
    if (newQuantity > 0) {
      newCartItems[index].quantity = newQuantity;
      setCartItems(newCartItems);
    }
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    const newCartItems = cartItems.map((item) => ({
      ...item,
      selected: newSelectAll,
    }));
    setCartItems(newCartItems);
  };

  const handleSelectItem = (index) => {
    const newCartItems = [...cartItems];
    newCartItems[index].selected = !newCartItems[index].selected;
    setCartItems(newCartItems);
    setSelectAll(newCartItems.every((item) => item.selected));
  };

  const routes = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Giỏ hàng', path: '/cart' },
  ];

  return (
    <UserLayout>
      <Container disableGutters maxWidth={false} className="container" sx={{ paddingBottom: '24px' }}>
        <CustomBreadcrumbs routes={routes} />
        <main className="page-main">
          {cartItems.length > 0 ? (
            <Grid container>
              <Grid item className="cart-items-wrapper">
                <Box className="cart-heading-wrapper">
                  <Box className="page-title-wrapper">
                    <h1 className="page-title">Giỏ hàng</h1>
                    <span className="cart-qty">{cartItems.length} sản phẩm</span>
                  </Box>
                  <FormControlLabel
                    control={<Checkbox checked={selectAll} onChange={handleSelectAll} />}
                    label="Chọn tất cả"
                  />
                </Box>
                <Box className="cart-items">
                  {cartItems.map((item, index) => (
                    <Box key={item.id} className="cart-item">
                      <Box className="cart-item-details">
                        <img src={item.image} alt={item.name} className="cart-item-image" />
                        <Box className="cart-item-info">
                          <Link className="cart-item-info-name" to="/">
                            {item.name}
                          </Link>
                          <Typography className="cart-item-info-price">
                            Đơn giá: <span>{item.price.toLocaleString()}đ</span>
                          </Typography>
                          <Box className="quantity-controls">
                            <button onClick={() => handleQuantityChange(index, -1)}>-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => handleQuantityChange(index, 1)}>+</button>
                          </Box>
                        </Box>
                      </Box>
                      <Box className="cart-item-actions">
                        <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                          Tạm tính:
                          <Typography sx={{ color: '#f44336', ml: '4px', fontWeight: 700 }}>
                            {(item.price * item.quantity).toLocaleString()}đ
                          </Typography>
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <FormControlLabel
                            control={<Checkbox checked={item.selected} onChange={() => handleSelectItem(index)} />}
                            label=""
                            sx={{ marginRight: 0 }}
                          />
                          <Box className="remove-item">Xóa</Box>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Grid>
              <Grid item className="check-out">
                <Box className="order-summary">
                  <Typography sx={{ pb: '8px', borderBottom: '1px solid #f0efed', mb: 2 }} variant="h6">
                    Thông Tin Đơn Hàng
                  </Typography>
                  <Typography
                    className="order-text"
                    sx={{
                      mt: 2,
                    }}
                  >
                    Tổng sản phẩm đã chọn:{' '}
                    <Typography sx={{ fontWeight: 700, color: '#000' }}>
                      {cartItems.filter((item) => item.selected).length}
                    </Typography>
                  </Typography>
                  <Typography className="order-text">
                    Tạm tính:
                    <Typography sx={{ fontWeight: 700, color: '#000' }}>
                      {cartItems
                        .filter((item) => item.selected)
                        .reduce((sum, item) => sum + item.price * item.quantity, 0)
                        .toLocaleString()}
                      đ
                    </Typography>
                  </Typography>
                  <Typography className="order-text">
                    Mã giảm giá: <Typography sx={{ fontWeight: 700, color: '#000' }}>0đ</Typography>
                  </Typography>
                  <Typography className="order-text">
                    Tổng thanh toán:
                    <Typography className="total-price">
                      {cartItems
                        .filter((item) => item.selected)
                        .reduce((sum, item) => sum + item.price * item.quantity, 0)
                        .toLocaleString()}
                      đ
                    </Typography>
                  </Typography>
                  <button className="checkout-button">ĐẶT HÀNG</button>
                </Box>
              </Grid>
            </Grid>
          ) : (
            <>
              <h1 className="cart-title">GIỎ HÀNG</h1>
              <Typography className="cart-item-count">Có 0 sản phẩm</Typography>
              <Box className="cart-empty">
                <img src={cartEmptyIcon} alt="cart-empty" />
                <Typography className="cart-item-count">Giỏ hàng của bạn đang trống</Typography>
                <Link to="/">Tiếp tục mua hàng</Link>
              </Box>
            </>
          )}
        </main>
      </Container>
    </UserLayout>
  );
}

export default Cart;