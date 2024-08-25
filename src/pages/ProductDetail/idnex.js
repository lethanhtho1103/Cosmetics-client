import React, { useState } from 'react';
import UserLayout from '~/layouts/UserLayout';
import Breadcrumbs from '~/components/Breakcrumbs';
import { useParams } from 'react-router-dom';
import { Grid, Paper, Typography, Box, Rating, Button, TextField, IconButton, Container } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './ProductDetail.scss';

function ProductDetail() {
  const { nameProduct } = useParams();
  const userReview = true;
  const routes = [
    { name: 'Home', path: '/' },
    { name: nameProduct, path: '' },
  ];

  const productDetails = {
    imageUrl:
      'https://www.guardian.com.vn/media/catalog/product/cache/30b2b44eba57cd45fd3ef9287600968e/3/0/3023693ud.jpg',
    name: 'Sữa Rửa Mặt Dịu Nhẹ Cho Da Nhạy Cảm Cetaphil Gentle Skin Cleanser 500Ml',
    price: '$199.99',
    brand: 'Cetaphil',
    description:
      'Làn da dầu và mụn rất nhạy cảm nên cần được thiết kế một loại nước tẩy trang phù hợp. Với công nghệ Micellar, nước tẩy trang bí đao của CoCoon giúp làm sạch hiệu quả lớp trang điểm, bụi bẩn và dầu thừa, mang lại làn da sạch hoàn toàn và dịu nhẹ',
    specifications: {
      weight: '1kg',
      dimensions: '10x10x10 cm',
      material: 'Aluminum',
      color: 'Silver',
    },
    reviews: [
      { user: 'John Doe', comment: 'Great product!', rating: 5, time: '2 days ago', userId: 1 },
      { user: 'Jane Smith', comment: 'Good value for the price.', rating: 4, time: '1 week ago', userId: 2 },
    ],
  };

  const currentUser = { id: 1, name: 'John Doe' };

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

  const handleAddToCart = () => {
    console.log(`Added ${quantity} items to the cart.`);
  };

  const handleBuyNow = () => {
    console.log(`Purchased ${quantity} items immediately.`);
  };

  const totalReviews = productDetails.reviews.length;
  const averageRating = productDetails.reviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews;

  return (
    <UserLayout>
      <Breadcrumbs routes={routes} />
      <Container disableGutters maxWidth={false} className="container">
        <main className="page-main">
          <Paper className="product-detail-paper" sx={{ boxShadow: 'none', backgroundColor: 'transparent' }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box className="product-image">
                  <img src={productDetails.imageUrl} alt={productDetails.name} className="product-image-content" />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h4" component="h1" gutterBottom className="product-name">
                  {productDetails.name}
                </Typography>
                <Box className="product-rating">
                  <Rating value={averageRating} readOnly precision={0.5} className="rating-stars" />
                  <Typography className="rating-value">{averageRating.toFixed(1)}</Typography>
                  <Typography variant="body1" className="rating-count">
                    {totalReviews} Đánh giá
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography className="product-brand">
                    Xuất xứ: <strong>Hàn Quốc</strong>
                  </Typography>
                  <Typography className="product-brand">
                    Thương hiệu: <strong>{productDetails.brand}</strong>
                  </Typography>
                  <Typography className="product-brand">
                    Hạn sử dụng: <strong>36 tháng</strong>
                  </Typography>
                </Box>
                <Box className="price-box">
                  <span className="special-price">140,000</span>₫<span className="old-price">199,000₫</span>
                  <span className="percent-discount">
                    <span>-</span>30%
                  </span>
                </Box>
                <Typography variant="body1" paragraph className="product-description">
                  {productDetails.description}
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
                  <Button variant="contained" className="add-to-cart-btn" onClick={handleAddToCart}>
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
              <Rating value={averageRating} readOnly precision={0.5} />
              <Typography sx={{ mr: 1, fontWeight: '700', color: '#f7bf09' }}>{averageRating.toFixed(1)}</Typography>
              <Typography variant="body1" className="rating-count">
                {totalReviews} Đánh giá
              </Typography>
            </Box>
          </Box>
          <Box sx={{ pb: 2 }}>
            {productDetails.reviews.map((review, index) => (
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
                      Add Your Review
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
                      Submit Review
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
