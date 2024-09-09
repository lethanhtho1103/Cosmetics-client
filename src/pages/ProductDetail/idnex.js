import React, { useEffect, useState } from 'react';
import UserLayout from '~/layouts/UserLayout';
import Breadcrumbs from '~/components/Breakcrumbs';
import { useNavigate, useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './ProductDetail.scss';
import productService from '~/services/productService';
import { baseUrl } from '~/axios';
import { useSelector } from 'react-redux';
import cartService from '~/services/cartService';
import { toast } from 'react-toastify';

function ProductDetail() {
  const { nameProduct } = useParams();
  const navigate = useNavigate();
  const [productDetail, setProductDetail] = useState({});
  const userReview = true;
  const routes = [
    { name: 'Trang chủ', path: '/' },
    { name: nameProduct, path: '' },
  ];

  const currentUser = useSelector((state) => state.auth.login?.currentUser?.data);

  // const currentUser = { id: 1, name: 'John Doe' };

  const [editingReviewId, setEditingReviewId] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleEditClick = (review) => {
    setEditingReviewId(review.userId);
    setRating(review.rating);
    setComment(review.comment);
  };

  const handleUpdateReview = () => {
    console.log('Updated review:', { rating, comment });
    setEditingReviewId(null);
  };

  const handleDeleteReview = (reviewId) => {
    console.log('Deleted review with ID:', reviewId);
  };

  const handleSubmitReview = () => {
    console.log('Submitted review:', { rating, comment });
  };

  const handleDecrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = async (productId, quantity = 1) => {
    if (currentUser) {
      const userId = currentUser._id;
      const res = await cartService.addToCart(userId, productId, quantity);
      toast.success(res?.message);
    } else {
      navigate('/login');
    }
  };

  const handleBuyNow = () => {
    console.log(`Purchased ${quantity} items immediately.`);
  };

  const handleGetProductByName = async () => {
    const res = await productService.getProductByName({ nameProduct });
    setProductDetail(res.data);
  };

  useEffect(() => {
    handleGetProductByName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nameProduct]);

  return (
    <UserLayout>
      <Container disableGutters maxWidth={false} className="container">
        <Breadcrumbs routes={routes} />
        <main className="page-main">
          <Paper className="product-detail-paper" sx={{ boxShadow: 'none', backgroundColor: 'transparent' }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box className="product-image">
                  <img
                    src={`${baseUrl}/${productDetail?.image}`}
                    alt={productDetail?.name}
                    className="product-image-content"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h4" component="h1" gutterBottom className="product-name">
                  {productDetail?.name}
                </Typography>
                <Box className="product-rating">
                  <Rating value={productDetail?.average_star} readOnly precision={0.5} className="rating-stars" />
                  <Typography className="rating-value">{productDetail?.average_star}</Typography>
                  <Typography variant="body1" className="rating-count">
                    {productDetail?.comment_count} Đánh giá
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography className="product-brand">
                    Xuất xứ: <strong>{productDetail?.origin}</strong>
                  </Typography>
                  <Typography className="product-brand">
                    Thương hiệu: <strong>{productDetail?.trademark}</strong>
                  </Typography>
                  <Typography className="product-brand">
                    Hạn sử dụng: <strong>{productDetail?.expiry} tháng</strong>
                  </Typography>
                </Box>
                <Box className="price-box-product">
                  <span className="special-price">140,000</span>₫<span className="old-price">199,000₫</span>
                  <span className="percent-discount">
                    <span>-</span>30%
                  </span>
                </Box>
                <Typography variant="body1" paragraph className="product-description">
                  {productDetail?.description}
                </Typography>
                <Box className="product-actions">
                  <Box className="quantity-selector">
                    <IconButton size="small" onClick={handleDecrementQuantity}>
                      <RemoveIcon fontSize="small" />
                    </IconButton>
                    <Typography className="quantity-value">{quantity}</Typography>
                    <IconButton size="small" onClick={handleIncrementQuantity}>
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  <Button
                    variant="contained"
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(productDetail?._id, quantity)}
                  >
                    <ShoppingCartIcon fontSize="small" className="cart-icon" />
                    Thêm vào giỏ
                  </Button>
                  <Button variant="contained" className="buy-btn" onClick={handleBuyNow}>
                    Mua ngay
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
          {/* Rest of the component remains the same */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: '20px', mt: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 700, margin: '0 16px 0 0' }}>
              ĐÁNH GIÁ CỦA KHÁCH HÀNG
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: '-2px' }}>
              <Rating value={productDetail?.average_star} readOnly precision={0.5} />
              <Typography sx={{ mr: 1, fontWeight: '700', color: '#f7bf09' }}>{productDetail?.average_star}</Typography>
              <Typography variant="body1" className="rating-count">
                {productDetail?.comment_count} Đánh giá
              </Typography>
            </Box>
          </Box>
          <Box sx={{ pb: 2 }}>
            {productDetail?.reviews?.map((review, index) => (
              <Paper key={index} sx={{ p: 2, mb: 3, boxShadow: 1 }} className="comment-user">
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="subtitle1" sx={{ mr: 2 }}>
                      <strong>{review.user}</strong>
                    </Typography>
                    <Rating value={review.rating} readOnly size="small" />
                  </Box>
                  {review.userId === currentUser.id && (
                    <Box>
                      <IconButton size="small" sx={{ color: '#303f9f' }} onClick={() => handleEditClick(review)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton sx={{ color: 'red' }} size="small" onClick={() => handleDeleteReview(review.userId)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  )}
                </Box>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                  {review.time}
                </Typography>
                <Typography variant="body1">{review.comment}</Typography>
                {editingReviewId === review.userId && (
                  <Box sx={{ mt: 2 }}>
                    <Rating value={rating} onChange={(event, newValue) => setRating(newValue)} />
                    <TextField
                      fullWidth
                      multiline
                      minRows={3}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      variant="outlined"
                      sx={{ mt: 2 }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                      <Button sx={{ color: '#fff' }} variant="contained" onClick={handleUpdateReview}>
                        Lưu
                      </Button>
                    </Box>
                  </Box>
                )}
                {!userReview && (
                  <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" gutterBottom>
                      Đánh giá
                    </Typography>
                    <Rating value={rating} onChange={(event, newValue) => setRating(newValue)} />
                    <TextField
                      fullWidth
                      multiline
                      minRows={3}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      variant="outlined"
                      placeholder="Write your review here..."
                      sx={{ mt: 2 }}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ mt: 2 }}
                      onClick={handleSubmitReview}
                      disabled={rating === 0 || comment.trim() === ''}
                    >
                      Lưu đánh giá
                    </Button>
                  </Box>
                )}
              </Paper>
            ))}
          </Box>
        </main>
      </Container>
    </UserLayout>
  );
}

export default ProductDetail;
