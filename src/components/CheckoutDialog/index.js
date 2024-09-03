import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Radio,
  FormControl,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Paper,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { baseUrl } from '~/axios';

function OrderConfirmationDialog({ open, onClose, cartItems, userAddress, onPlaceOrder }) {
  const selectedItems = cartItems.filter((item) => item.selected);
  const totalPrice = selectedItems.reduce((sum, item) => sum + item?.product_id?.price * item?.quantity, 0);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ textTransform: 'uppercase', fontWeight: 700 }}>
        Xác nhận đặt hàng
        <IconButton aria-label="close" onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={7}>
            <Paper sx={{ padding: 2, backgroundColor: '#f5f5f5' }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, textTransform: 'uppercase', fontSize: '18px' }}>
                Sản phẩm đã chọn
              </Typography>
              {selectedItems.map((item) => (
                <Box key={item?.product_id?._id} sx={{ display: 'flex', mb: 2, alignItems: 'center' }}>
                  <img
                    src={`${baseUrl}/${item?.product_id?.image}`}
                    alt={item?.product_id?.name}
                    style={{ width: '80px', height: '80px', marginRight: '16px' }}
                  />
                  <Box>
                    <Typography sx={{ fontWeight: 600 }}>{item?.product_id?.name}</Typography>
                    <Typography sx={{ color: '#545453' }}>Số lượng: {item.quantity}</Typography>
                    <Typography sx={{ color: '#545453' }}>
                      Đơn giá: {item?.product_id?.price.toLocaleString()}đ
                    </Typography>
                  </Box>
                </Box>
              ))}

              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                <Typography sx={{ fontWeight: 500, fontSize: '16px' }}>Tổng thanh toán:</Typography>
                <Typography variant="h6" sx={{ color: '#f44336', fontWeight: 700 }}>
                  {totalPrice.toLocaleString()}đ
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Right Side: Shipping Address, Payment, and Shipping Method */}
          <Grid item xs={12} md={5}>
            <Paper sx={{ padding: 2, backgroundColor: '#e0f7fa' }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, textTransform: 'uppercase' }}>
                Thông tin giao hàng
              </Typography>
              <Box className="box-content" sx={{ border: '1px solid #ccc', padding: 2, borderRadius: 2 }}>
                <strong>Lê Thành Thọ - 0972221953</strong>
                <Typography sx={{ color: '#545453', fontWeight: 500 }}>{userAddress}</Typography>
              </Box>
              <FormControl component="fieldset" sx={{ mt: 3 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, textTransform: 'uppercase', fontSize: '18px' }}>
                  Phương thức vận chuyển
                </Typography>
                <Box sx={{ border: '1px solid #f6831f', padding: 2, borderRadius: 2 }}>
                  <FormControlLabel
                    value="standard"
                    control={<Radio checked sx={{ color: '#f6831f' }} />}
                    label="Giao hàng tiêu chuẩn (3-5 ngày)"
                    sx={{
                      color: '#f6831f',
                    }}
                  />

                  <Typography sx={{ fontSize: '0.875rem', mt: 1, color: '#555' }}>
                    Dự kiến giao hàng từ 2-5 ngày, trừ Chủ Nhật, Lễ Tết. (Miễn phí giao hàng toàn quốc).
                  </Typography>
                </Box>
              </FormControl>
            </Paper>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default OrderConfirmationDialog;