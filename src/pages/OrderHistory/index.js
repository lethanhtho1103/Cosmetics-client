import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import noOrderImg from '~/assets/image/no_order.png';
import { useSelector } from 'react-redux';
import orderService from '~/services/orderService';
import { baseUrl } from '~/axios';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import cartService from '~/services/cartService';
// import { Dialog, DialogActions, DialogContent, DialogTitle, Rating, TextField } from '@mui/material';
// import commentService from '~/services/commentService';

function OrderHistory() {
  const [tabIndex, setTabIndex] = useState(0);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);

  const userId = useSelector((state) => state.auth.login?.currentUser?._id);
  const formatNumber = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const formatDate = (date) => format(new Date(date), 'dd/MM/yyyy HH:mm:ss');

  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleGetAllOrder = async () => {
    if (userId) {
      const res = await orderService.getOrderById(userId);
      setOrders(res?.data);
    }
  };
  // const [openReviewDialog, setOpenReviewDialog] = useState(false);
  // const [currentOrderDetails, setCurrentOrderDetails] = useState(null);
  // const [rating, setRating] = useState(0);
  // const [comment, setComment] = useState('');
  // const handleClickOpenReviewDialog = (orderDetails) => {
  //   console.log(orderDetails);
  //   setCurrentOrderDetails(orderDetails);
  //   setOpenReviewDialog(true);
  // };

  // const handleCloseReviewDialog = () => {
  //   setOpenReviewDialog(false);
  //   setRating(0);
  //   setComment('');
  // };

  // const handleSubmitReview = async () => {
  //   if (rating === 0 || comment.trim() === '') return;
  //   try {
  //     for (const detail of currentOrderDetails) {
  //       const productId = detail.product_id;
  //       await commentService.createComment(userId, productId, rating, comment);
  //     }
  //     toast.success('Đánh giá đã được lưu.');
  //   } catch (error) {
  //     console.error(error);
  //     toast.error('Có lỗi xảy ra khi lưu đánh giá.');
  //   }

  //   handleCloseReviewDialog();
  // };

  useEffect(() => {
    handleGetAllOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  useEffect(() => {
    const newFilteredOrders = filterOrdersByStatus();
    setFilteredOrders(newFilteredOrders);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orders, tabIndex]);

  const filterOrdersByStatus = () => {
    switch (tabIndex) {
      case 1:
        return orders.filter((order) => order.status === 'pending');
      case 2:
        return orders.filter((order) => order.status === 'shipped');
      case 3:
        return orders.filter((order) => order.status === 'delivered');
      case 4:
        return orders.filter((order) => order.status === 'denied');
      default:
        return orders;
    }
  };

  const handleReceivedOrder = async (orderId) => {
    const status = 'delivered';
    await orderService.updateStatus(orderId, status);
    await handleGetAllOrder();
    toast.success('Nhận đơn hàng thành công.');
  };

  const handleCancelOrder = async (orderId) => {
    const status = 'denied';
    await orderService.updateStatus(orderId, status);
    await handleGetAllOrder();
    toast.success('Đơn hàng đã được hủy.');
  };

  const handleBuyAgain = async (orderId) => {
    try {
      const order = orders.find((order) => order._id === orderId);
      if (!order) return;
      for (const orderDetail of order.orderDetails) {
        await cartService.addToCart(userId, orderDetail.product_id, orderDetail.quantity);
      }
      navigate('/cart', { replace: true });
      toast.success('Sản phẩm đã được thêm vào giỏ hàng.');
    } catch (error) {
      console.error(error);
      toast.error('Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng.');
    }
  };

  return (
    <Box sx={{ padding: '0px 20px 20px' }}>
      <Tabs value={tabIndex} onChange={handleChange} aria-label="Order Status Tabs" sx={{ marginBottom: '20px' }}>
        <Tab label="Tất cả" />
        <Tab label="Chờ xác nhận" />
        <Tab label="Chờ giao hàng" />
        <Tab label="Hoàn thành" />
        <Tab label="Đã hủy" />
      </Tabs>

      {filteredOrders.length > 0 ? (
        <Box>
          {filteredOrders.map((order) => (
            <Card variant="outlined" sx={{ marginBottom: '24px' }} key={order._id}>
              <CardContent>
                <Grid container>
                  <Grid
                    item
                    xs={12}
                    container
                    justifyContent="space-between"
                    sx={{ padding: 0, borderBottom: '1px solid #e0e0e0', paddingBottom: '12px', mb: '6px' }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography variant="h6" sx={{ color: 'white', padding: '0px 6px', backgroundColor: '#e67e23' }}>
                        Orange
                      </Typography>
                      <Typography variant="h6" sx={{ ml: 2, color: '#0000008a', fontSize: '16px' }}>
                        Ngày đặt: {formatDate(order?.order_date)}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {order?.status === 'delivered' ? (
                        <Typography
                          variant="body2"
                          sx={{ color: '#26aa99', mr: '4px', display: 'flex', alignItems: 'center' }}
                        >
                          <LocalShippingOutlinedIcon sx={{ mr: '4px' }} />
                          Giao hàng thành công |
                        </Typography>
                      ) : (
                        ''
                      )}
                      <Typography variant="body2" sx={{ color: 'red', fontWeight: 500, textTransform: 'uppercase' }}>
                        {order?.status === 'pending'
                          ? 'Chờ xác nhận'
                          : order?.status === 'shipped'
                          ? 'Chờ giao hàng'
                          : order?.status === 'delivered'
                          ? 'Hoàn thành'
                          : order?.status === 'denied'
                          ? 'Đã hủy'
                          : ''}
                      </Typography>
                    </Box>
                  </Grid>
                  {order?.orderDetails?.map((orderDetail, index) => (
                    <Link
                      to={`http://localhost:3000/product-detail/${orderDetail?.product_name}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <Grid item xs={12} container sx={{ marginTop: '12px', mb: '12px' }} key={index}>
                        <Grid item xs={12} md={2}>
                          <img
                            src={`${baseUrl}/${orderDetail?.product_image}`}
                            alt={orderDetail?.product_name}
                            style={{ width: '90%', borderRadius: '4px' }}
                          />
                        </Grid>
                        <Grid item xs={12} md={10}>
                          <Typography variant="body1" sx={{ fontWeight: 500, width: '90%', color: '#000 !important' }}>
                            {orderDetail?.product_name}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography
                              variant="body2"
                              sx={{ mt: '6px ', color: '#0000008a !important', display: 'flex', alignItems: 'center' }}
                            >
                              Số lượng:
                              <Typography sx={{ color: '#000 !important', fontWeight: 500, ml: '4px' }}>
                                x{orderDetail?.quantity}
                              </Typography>
                            </Typography>
                            <Typography sx={{ color: '#000 !important' }}>
                              {formatNumber(orderDetail?.unit_price)}₫
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              marginTop: '10px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                            }}
                          >
                            <Button
                              variant="outlined"
                              size="small"
                              disabled
                              sx={{
                                fontSize: '12px',
                                '&.Mui-disabled': {
                                  color: '#26aa99 !important',
                                  borderColor: '#26aa99',
                                },
                              }}
                            >
                              {order?.shipping_method === 'express' ? 'Giao hàng nhanh' : 'Giao hàng tiêu chuẩn'}
                            </Button>
                            <Typography sx={{ color: '#000 !important' }}>
                              {formatNumber(order?.shipping_cost)}₫
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </Link>
                  ))}
                  <Grid
                    item
                    xs={12}
                    sx={{ textAlign: 'right', paddingTop: '12px', marginTop: '12px', borderTop: '1px solid #e0e0e0' }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        color: 'red',
                        marginBottom: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        flex: 1,
                        justifyContent: 'flex-end',
                        fontWeight: '500',
                      }}
                    >
                      <svg width="16" height="17" viewBox="0 0 253 263" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M126.5 0.389801C126.5 0.389801 82.61 27.8998 5.75 26.8598C5.08763 26.8507 4.43006 26.9733 3.81548 27.2205C3.20091 27.4677 2.64159 27.8346 2.17 28.2998C1.69998 28.7657 1.32713 29.3203 1.07307 29.9314C0.819019 30.5425 0.688805 31.198 0.689995 31.8598V106.97C0.687073 131.07 6.77532 154.78 18.3892 175.898C30.003 197.015 46.7657 214.855 67.12 227.76L118.47 260.28C120.872 261.802 123.657 262.61 126.5 262.61C129.343 262.61 132.128 261.802 134.53 260.28L185.88 227.73C206.234 214.825 222.997 196.985 234.611 175.868C246.225 154.75 252.313 131.04 252.31 106.94V31.8598C252.31 31.1973 252.178 30.5414 251.922 29.9303C251.667 29.3191 251.292 28.7649 250.82 28.2998C250.35 27.8358 249.792 27.4696 249.179 27.2225C248.566 26.9753 247.911 26.852 247.25 26.8598C170.39 27.8998 126.5 0.389801 126.5 0.389801Z"
                          fill="#ee4d2d"
                        ></path>
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M207.7 149.66L119.61 107.03C116.386 105.472 113.914 102.697 112.736 99.3154C111.558 95.9342 111.772 92.2235 113.33 88.9998C114.888 85.7761 117.663 83.3034 121.044 82.1257C124.426 80.948 128.136 81.1617 131.36 82.7198L215.43 123.38C215.7 120.38 215.85 117.38 215.85 114.31V61.0298C215.848 60.5592 215.753 60.0936 215.57 59.6598C215.393 59.2232 215.128 58.8281 214.79 58.4998C214.457 58.1705 214.063 57.909 213.63 57.7298C213.194 57.5576 212.729 57.4727 212.26 57.4798C157.69 58.2298 126.5 38.6798 126.5 38.6798C126.5 38.6798 95.31 58.2298 40.71 57.4798C40.2401 57.4732 39.7735 57.5602 39.3376 57.7357C38.9017 57.9113 38.5051 58.1719 38.1709 58.5023C37.8367 58.8328 37.5717 59.2264 37.3913 59.6604C37.2108 60.0943 37.1186 60.5599 37.12 61.0298V108.03L118.84 147.57C121.591 148.902 123.808 151.128 125.129 153.884C126.45 156.64 126.797 159.762 126.113 162.741C125.429 165.72 123.755 168.378 121.363 170.282C118.972 172.185 116.006 173.221 112.95 173.22C110.919 173.221 108.915 172.76 107.09 171.87L40.24 139.48C46.6407 164.573 62.3785 186.277 84.24 200.16L124.49 225.7C125.061 226.053 125.719 226.24 126.39 226.24C127.061 226.24 127.719 226.053 128.29 225.7L168.57 200.16C187.187 188.399 201.464 170.892 209.24 150.29C208.715 150.11 208.2 149.9 207.7 149.66Z"
                          fill="#fff"
                        ></path>
                      </svg>
                      <span style={{ color: 'black', margin: '0 4px' }}>Thành tiền:</span>{' '}
                      {formatNumber(order?.total_price)}₫
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      {order?.status === 'accepted' && (
                        <Typography
                          variant="body2"
                          sx={{ width: '45%', textAlign: 'left', color: '#0000008a', fontSize: '12px' }}
                        >
                          Vui lòng chỉ nhấn "Đã nhận được hàng" khi đơn hàng đã được giao đến bạn và sản phẩm nhận được
                          không có vấn đề nào.
                        </Typography>
                      )}
                      {order?.status === 'denied' && (
                        <Typography
                          variant="body2"
                          sx={{ width: '45%', textAlign: 'left', color: '#0000008a', fontSize: '12px' }}
                        >
                          Đơn hàng đã bị hủy.
                        </Typography>
                      )}

                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flex: 1 }}>
                        {order?.status === 'pending' && (
                          <Button variant="contained" color="error" onClick={() => handleCancelOrder(order._id)}>
                            Hủy đơn
                          </Button>
                        )}

                        {order?.status === 'shipped' && (
                          <Button
                            variant="contained"
                            color="primary"
                            sx={{ color: '#fff' }}
                            onClick={() => handleReceivedOrder(order._id)}
                          >
                            Đã nhận được hàng
                          </Button>
                        )}

                        {order?.status === 'delivered' && (
                          <>
                            {/* <Button
                              variant="outlined"
                              sx={{ marginRight: '10px', color: 'var(--primary-color)' }}
                              onClick={() => handleClickOpenReviewDialog(order?.orderDetails)}
                            >
                              Đánh giá
                            </Button> */}
                            <Button
                              variant="contained"
                              color="primary"
                              sx={{ color: '#fff' }}
                              onClick={() => handleBuyAgain(order._id)}
                            >
                              Mua lại
                            </Button>
                          </>
                        )}

                        {order?.status === 'denied' && (
                          <Button
                            variant="contained"
                            color="primary"
                            sx={{ color: '#fff' }}
                            onClick={() => handleBuyAgain(order._id)}
                          >
                            Mua lại
                          </Button>
                        )}
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
        <Box textAlign="center" sx={{ marginTop: '56px', mb: '20px' }}>
          <img src={noOrderImg} alt="no-order" />
          <Typography variant="body1" sx={{ marginBottom: '20px' }}>
            Bạn chưa có đơn hàng nào.
          </Typography>
          <Link to="http://localhost:3000/" className="btn-buy">
            Mua sắm ngay
          </Link>
        </Box>
      )}
      {/* <Dialog open={openReviewDialog} onClose={handleCloseReviewDialog}>
        <DialogTitle>Viết Đánh giá</DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 4 }}>
            <Rating value={rating} onChange={(event, newValue) => setRating(newValue)} />
            <TextField
              fullWidth
              multiline
              minRows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              variant="outlined"
              placeholder="Viết đánh giá của bạn tại đây..."
              sx={{ mt: 2 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            sx={{ mt: 2, color: '#fff' }}
            onClick={handleSubmitReview}
            disabled={rating === 0 || comment?.trim() === ''}
          >
            Lưu đánh giá
          </Button>
          <Button onClick={handleCloseReviewDialog}>Hủy</Button>
        </DialogActions>
      </Dialog> */}
    </Box>
  );
}

export default OrderHistory;
