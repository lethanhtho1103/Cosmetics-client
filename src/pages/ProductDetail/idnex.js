import React, { useCallback, useEffect, useMemo, useState } from 'react';
import UserLayout from '~/layouts/UserLayout';
import Breadcrumbs from '~/components/Breakcrumbs';
import { useNavigate, useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import './ProductDetail.scss';
import productService from '~/services/productService';
import { baseUrl } from '~/axios';
import { useSelector } from 'react-redux';
import cartService from '~/services/cartService';
import { toast } from 'react-toastify';
import Comment from '~/components/Comment';
import commentService from '~/services/commentService';
import orderService from '~/services/orderService';
import { useCart } from '~/contexts/CartContext';

function ProductDetail() {
  const { nameProduct } = useParams();
  const navigate = useNavigate();
  const routes = useMemo(
    () => [
      { name: 'Trang chủ', path: '/' },
      { name: nameProduct, path: '' },
    ],
    [nameProduct],
  );
  const currentUser = useSelector((state) => state.auth.login?.currentUser);
  const { updateCart } = useCart();
  const [productDetail, setProductDetail] = useState({});
  const [reviews, setReviews] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [isShowWriteComment, setIsShowWriteComment] = useState(false);

  const handleDecrementQuantity = useCallback(() => {
    if (quantity > 1) setQuantity(quantity - 1);
  }, [quantity]);

  const handleIncrementQuantity = useCallback(() => {
    setQuantity(quantity + 1);
  }, [quantity]);

  const handleAddToCart = useCallback(
    async (productId, quantity = 1, quantityProduct) => {
      if(quantity > quantityProduct) {
        toast.info("Số lượng sản phẩm của cửa hàng không đủ.")
      }else {
        if (currentUser) {
          const userId = currentUser._id;
          const res = await cartService.addToCart(userId, productId, quantity);
          const cartRes = await cartService.getCartByUserId({ userId });
          updateCart(cartRes?.data);
          toast.success(res?.message);
        } else {
          navigate('/login');
        }
      }
     
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser, navigate, quantity],
  );

  // const handleBuyNow = useCallback(() => {
  //   console.log(`Purchased ${quantity} items immediately.`);
  // }, [quantity]);

  const handleGetProductByName = async () => {
    try {
      const res = await productService.getProductByName({ nameProduct: nameProduct.trim() });
      setProductDetail(res.data);
    } catch (error) {
      console.error('Failed to fetch product details', error);
    }
  };

  const handleGetCommentByProductId = async (productId) => {
    try {
      const res = await commentService.getCommentByProductId(productId);
      setReviews(res?.data);
    } catch (error) {
      console.error('Failed to fetch comments', error);
    }
  };

  const handleGetAllOrder = async () => {
    const userId = currentUser?._id;
    if (userId) {
      const res = await orderService.getOrderById(userId);
      if (
        res?.data?.some((order) => order?.orderDetails?.some((orderDetail) => orderDetail.product_name === nameProduct))
      ) {
        setIsShowWriteComment(true);
      }
    }
  };
  const formatNumber = (num) => num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  useEffect(() => {
    const fetchProductAndOrder = async () => {
      await Promise.all([handleGetProductByName(), handleGetAllOrder()]);
    };

    fetchProductAndOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nameProduct]);

  useEffect(() => {
    if (productDetail?._id) {
      handleGetCommentByProductId(productDetail._id);
    }
  }, [productDetail]);

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
                  <Rating
                    value={parseFloat(productDetail?.average_star)}
                    readOnly
                    precision={0.5}
                    className="rating-stars"
                  />
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
                  <Typography className="product-brand">
                    Sản phẩm: <strong>{productDetail?.quantity}</strong>
                  </Typography>
                </Box>
                <Box className="price-box-product">
                  {productDetail?.promotion?.discount_value && productDetail?.promotion?.status === 'active' ? (
                    <span className="special-price">
                      {formatNumber(productDetail?.price - (productDetail?.price * productDetail?.promotion?.discount_value/ 100))}
                    </span>
                  ) : (
                    <span className="special-price">{formatNumber(productDetail?.price)}</span>
                  )}
                  ₫
                  {productDetail?.promotion?.status === 'active' && productDetail?.promotion?.discount_value && (
                    <>
                      <span className="old-price">{formatNumber(productDetail?.price)}₫</span>
                      <span className="percent-discount">
                        <span>-</span>
                        {productDetail?.promotion?.discount_value}%
                      </span>
                    </>
                  )}
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
                    onClick={() => handleAddToCart(productDetail?._id, quantity, productDetail?.quantity)}
                    disabled={productDetail?.quantity <= 0}
                  >
                    <ShoppingCartIcon fontSize="small" className="cart-icon" />
                    Thêm vào giỏ hàng
                  </Button>
                  {/* <Button variant="contained" className="buy-btn" onClick={handleBuyNow}>
                    Mua ngay
                  </Button> */}
                </Box>
              </Grid>
            </Grid>
          </Paper>
          <Comment
            reviews={reviews}
            currentUser={currentUser}
            productDetail={productDetail}
            isShowWriteComment={isShowWriteComment}
            handleGetProductByName={handleGetProductByName}
            handleGetCommentByProductId={handleGetCommentByProductId}
          />
        </main>
      </Container>
    </UserLayout>
  );
}

export default ProductDetail;
