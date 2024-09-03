import UserLayout from '~/layouts/UserLayout';
import { Box, Container, FormControlLabel, Grid, Typography, Checkbox, CircularProgress } from '@mui/material';
import CustomBreadcrumbs from '~/components/Breakcrumbs';
import './Cart.scss';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';
import cartEmptyIcon from '~/assets/image/cart-empty.svg';
import cartService from '~/services/cartService';
import { useSelector } from 'react-redux';
import { baseUrl } from '~/axios';
import { toast } from 'react-toastify';
import CheckoutDialog from '~/components/CheckoutDialog';

function Cart() {
  const userId = useSelector((state) => state.auth.login?.currentUser?.data?._id);
  const userAddress = useSelector((state) => state.auth.login?.currentUser?.data?.address);

  const [selectAll, setSelectAll] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const hasSelectedItems = cartItems.some((item) => item.selected);
  const loadingTimeoutRef = useRef(null);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handlePlaceOrder = () => {
    setOpenDialog(false);
    toast.success('Đặt hàng thành công!');
  };

  const debouncedUpdateCart = debounce(async (userId, productId, newQuantity) => {
    try {
      await cartService.updateCart(userId, productId, newQuantity);
    } catch (error) {
      toast.error('Cập nhật số lượng không thành công!');
    }
  }, 200);

  const handleQuantityChange = async (productId, index, delta) => {
    if (loading) return;

    setLoading(true);
    const newCartItems = [...cartItems];
    const newQuantity = newCartItems[index].quantity + delta;

    if (newQuantity > 0) {
      newCartItems[index].quantity = newQuantity;
      setCartItems(newCartItems);

      // Debounce the API call to handle rapid clicks
      debouncedUpdateCart(userId, productId, newQuantity);
    } else {
      setLoading(false);
    }

    // Clear any existing timeout to ensure only one is active at a time
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
    }

    // Set a new timeout for loading state to ensure spinner visibility
    loadingTimeoutRef.current = setTimeout(() => setLoading(false), 500); // Ensure spinner is visible for at least 500ms
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

  const handleGetCart = async () => {
    const res = await cartService.getCartByUserId({ userId });
    const initializedCartItems = res?.data?.items?.map((item) => ({
      ...item,
      selected: false, // Initialize the selected property
    }));
    setCartItems(initializedCartItems);
  };

  const handleDeleteCart = async (productId) => {
    const res = await cartService.deleteCart({ userId, productId });
    handleGetCart();
    toast.success(res?.message);
  };

  useEffect(() => {
    handleGetCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return (
    <UserLayout>
      <Container disableGutters maxWidth={false} className="container" sx={{ paddingBottom: '24px' }}>
        <CustomBreadcrumbs routes={routes} />
        <main className="page-main">
          {cartItems?.length > 0 ? (
            <Grid container>
              <Grid item className="cart-items-wrapper">
                <Box className="cart-heading-wrapper">
                  <Box className="page-title-wrapper">
                    <h1 className="page-title">Giỏ hàng</h1>
                    <span className="cart-qty">{cartItems?.length} sản phẩm</span>
                  </Box>
                  <FormControlLabel
                    control={<Checkbox checked={selectAll} onChange={handleSelectAll} />}
                    label="Chọn tất cả"
                  />
                </Box>
                <Box className="cart-items">
                  {cartItems?.map((item, index) => (
                    <Box key={item?.product_id?._id} className="cart-item">
                      <Box className="cart-item-details">
                        <img
                          src={`${baseUrl}/${item?.product_id?.image}`}
                          alt={item?.product_id?.name}
                          className="cart-item-image"
                        />
                        <Box className="cart-item-info">
                          <Link className="cart-item-info-name" to="/">
                            {item?.product_id?.name}
                          </Link>
                          <Typography className="cart-item-info-price">
                            Đơn giá: <span>{item?.product_id?.price.toLocaleString()}đ</span>
                          </Typography>
                          <Box className="quantity-controls">
                            <button
                              onClick={() => handleQuantityChange(item?.product_id?._id, index, -1)}
                              disabled={loading}
                            >
                              -
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item?.product_id?._id, index, 1)}
                              disabled={loading}
                            >
                              +
                            </button>
                          </Box>
                        </Box>
                      </Box>
                      <Box className="cart-item-actions">
                        <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                          Tạm tính:
                          <Typography sx={{ color: '#f44336', ml: '4px', fontWeight: 700 }}>
                            {(item?.product_id?.price * item?.quantity).toLocaleString()}đ
                          </Typography>
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <FormControlLabel
                            control={<Checkbox checked={item.selected} onChange={() => handleSelectItem(index)} />}
                            label=""
                            sx={{ marginRight: 0 }}
                          />
                          <Box className="remove-item" onClick={() => handleDeleteCart(item?.product_id?._id)}>
                            Xóa
                          </Box>
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
                      {cartItems?.filter((item) => item.selected).length}
                    </Typography>
                  </Typography>
                  <Typography className="order-text">
                    Tạm tính:
                    <Typography sx={{ fontWeight: 700, color: '#000' }}>
                      {cartItems
                        .filter((item) => item.selected)
                        .reduce((sum, item) => sum + item?.product_id?.price * item?.quantity, 0)
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
                        .reduce((sum, item) => sum + item?.product_id?.price * item?.quantity, 0)
                        .toLocaleString()}
                      đ
                    </Typography>
                  </Typography>
                  <button
                    className="checkout-button"
                    onClick={handleOpenDialog}
                    disabled={!hasSelectedItems}
                    style={{
                      cursor: hasSelectedItems ? 'pointer' : 'not-allowed',
                      opacity: hasSelectedItems ? 1 : 0.5,
                    }}
                  >
                    ĐẶT HÀNG
                  </button>
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
          {loading && (
            <Box className="loading-overlay">
              <CircularProgress />
            </Box>
          )}
          <CheckoutDialog
            open={openDialog}
            onClose={handleCloseDialog}
            cartItems={cartItems}
            userAddress={userAddress}
            onPlaceOrder={handlePlaceOrder}
          />
        </main>
      </Container>
    </UserLayout>
  );
}

export default Cart;
