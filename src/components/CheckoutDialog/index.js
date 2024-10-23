import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import CloseIcon from '@mui/icons-material/Close';
import { baseUrl } from '~/axios';
import PayPal from '../PayPal';
import { toast } from 'react-toastify';
import orderService from '~/services/orderService';

function OrderConfirmationDialog({ open, onClose, cartItems, handleGetCart, currentUser }) {
  const [paymentMethod, setPaymentMethod] = useState('cash-on-paypal');

  const userId = currentUser?._id;

  const selectedItems = cartItems?.filter((item) => item.selected);
  const totalPrice = selectedItems?.reduce((sum, item) => {
    const product = item?.product_id;
    let price = product?.price;
    if (product?.promotion && product?.promotion.status === 'active' && product.promotion.discount_value > 0) {
      price = price - (price * product.promotion.discount_value) / 100;
    }
    return sum + price * item?.quantity;
  }, 0);

  const handleCheckout = async (isPayment) => {
    try {
      const response = await orderService.checkout(userId, selectedItems, isPayment);
      onClose();
      handleGetCart();
      toast.success(response.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ textTransform: 'uppercase', fontWeight: 700, position: 'relative' }}>
        Xác nhận đặt hàng
        <IconButton aria-label="close" onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={7}>
            <Paper sx={{ padding: 2, backgroundColor: '#f5f5f5', height: '100%' }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, textTransform: 'uppercase', fontSize: '18px' }}>
                Sản phẩm đã chọn
              </Typography>
              {selectedItems?.map((item) => {
                const product = item?.product_id;
                let price = product?.price;
                if (
                  product?.promotion &&
                  product?.promotion.status === 'active' &&
                  product.promotion.discount_value > 0
                ) {
                  price = price - (price * product.promotion.discount_value) / 100;
                }
                return (
                  <Box key={product?._id} sx={{ display: 'flex', mb: 2, alignItems: 'center' }}>
                    <img
                      src={`${baseUrl}/${product?.image}`}
                      alt={product?.name}
                      style={{ width: '80px', height: '80px', marginRight: '16px' }}
                    />
                    <Box>
                      <Typography sx={{ fontWeight: 600 }}>{product?.name}</Typography>
                      <Typography sx={{ color: '#545453' }}>Số lượng: {item.quantity}</Typography>
                      <Typography sx={{ color: '#545453' }}>Đơn giá: {price.toLocaleString()}₫</Typography>
                    </Box>
                  </Box>
                );
              })}

              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                <Typography sx={{ fontWeight: 500, fontSize: '16px' }}>Tổng thanh toán:</Typography>
                <Typography variant="h6" sx={{ color: '#f44336', fontWeight: 700 }}>
                  {totalPrice?.toLocaleString()}₫
                </Typography>
              </Box>
              <Typography variant="h6" sx={{ mb: 1, mt: 2, fontWeight: 700, textTransform: 'uppercase' }}>
                Thông tin giao hàng
              </Typography>
              <Box className="box-content" sx={{ border: '1px solid #ccc', padding: 2, borderRadius: 2, mb: 2 }}>
                <strong>
                  {currentUser?.username} {currentUser?.phone && <>&nbsp;•&nbsp; {currentUser?.phone}</>}
                </strong>
                <Typography sx={{ color: '#545453', fontWeight: 400 }}>
                  {currentUser?.ward ? (
                    <div>{`${currentUser?.address}, ${currentUser?.ward}, ${currentUser?.district}, ${currentUser?.province}`}</div>
                  ) : (
                    <div>Bạn chưa có địa chỉ giao hàng.</div>
                  )}
                </Typography>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={5}>
            <Paper sx={{ padding: 2, backgroundColor: '#e0f7fa', height: '100%' }}>
              <FormControl component="fieldset">
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, textTransform: 'uppercase', fontSize: '18px' }}>
                  Phương thức vận chuyển
                </Typography>
                <Box sx={{ border: '1px solid #f6831f', padding: 2, borderRadius: 2 }}>
                  <FormControlLabel
                    value="standard"
                    control={<Radio checked sx={{ color: '#f6831f' }} />}
                    label="Giao hàng tiêu chuẩn (3-5 ngày)"
                    sx={{ color: '#f6831f' }}
                  />
                  <Typography sx={{ fontSize: '0.875rem', mt: 1, color: '#555' }}>
                    Dự kiến giao hàng từ 2-5 ngày, trừ Chủ Nhật, Lễ Tết. (Miễn phí giao hàng toàn quốc).
                  </Typography>
                </Box>
              </FormControl>

              <Typography
                variant="h6"
                sx={{ mb: 1, mt: 3, fontWeight: 600, textTransform: 'uppercase', fontSize: '18px' }}
              >
                Phương thức thanh toán
              </Typography>

              <FormControl component="fieldset">
                <Box sx={{ mb: 1 }}>
                  <FormControlLabel
                    checked={paymentMethod === 'cash-on-delivery'}
                    onChange={() => setPaymentMethod('cash-on-delivery')}
                    control={<Radio sx={{ ml: 2 }} />}
                    label="Thanh toán khi nhận hàng"
                    sx={{ color: '#555' }}
                  />
                  <FormControlLabel
                    value="cash-on-paypal"
                    control={<Radio sx={{ ml: 2 }} />}
                    label="Thanh toán bằng PayPal"
                    checked={paymentMethod === 'cash-on-paypal'}
                    onChange={() => setPaymentMethod('cash-on-paypal')}
                    sx={{ color: '#555' }}
                  />
                </Box>
              </FormControl>

              {paymentMethod === 'cash-on-paypal' ? (
                <PayPal cost={totalPrice} handleCheckout={handleCheckout} />
              ) : (
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#f6831f',
                    color: '#fff',
                    width: '100%',
                    padding: '8px 0',
                    borderRadius: '8px',
                    '&:hover': { backgroundColor: '#d96b15' },
                  }}
                  onClick={() => handleCheckout('no')}
                >
                  ĐẶT HÀNG
                </Button>
              )}
            </Paper>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default OrderConfirmationDialog;
