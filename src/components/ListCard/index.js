import { Box, Card, CardActionArea, CardContent, CardMedia, Rating } from '@mui/material';
import { Link } from 'react-router-dom';
import './ListCard.scss';

function ListCard() {
  return (
    <Box sx={{ marginTop: '24px' }}>
      <div className="product-items">
        <Card className="product-item">
          <CardActionArea>
            <Link href="/" sx={{ display: 'block' }}>
              <Box sx={{ padding: '8px' }}>
                <CardMedia
                  component="img"
                  height="227"
                  image="https://www.guardian.com.vn/media/catalog/product/cache/8abedaa231e51c424533dabd39634738/t/h/thumbnail_3019079_dbhnfakpoqfmtrd0.jpg"
                  alt="green iguana"
                  sx={{ borderRadius: '4px' }}
                />
              </Box>
            </Link>
            <CardContent sx={{ padding: '8px 12px' }}>
              <Link href="/" className="product-item-brand-link">
                LifeBuoy
              </Link>
              <Link href="/" className="product-item-name-link">
                Nước Tẩy Trang Simple Cấp Ẩm Nhẹ Nhàng Làm Sạch Trang Điểm Micellar Cleansing Water 400Ml
              </Link>

              <Box className="product-item-rating">
                <Rating name="read-only" value={2} readOnly sx={{ fontSize: '16px' }} />
                <span className="number-rating">2</span>
              </Box>
              <Box className="price-box">
                <span className="special-price">140,000</span>
                <span className="old-price">199,000</span>
                <span className="percent-discount">
                  <span>-</span>30%
                </span>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card className="product-item">
          <CardActionArea>
            <Link href="/" sx={{ display: 'block' }}>
              <Box sx={{ padding: '8px' }}>
                <CardMedia
                  component="img"
                  height="227"
                  image="https://www.guardian.com.vn/media/catalog/product/cache/8abedaa231e51c424533dabd39634738/t/h/thumbnail_3019079_dbhnfakpoqfmtrd0.jpg"
                  alt="green iguana"
                  sx={{ borderRadius: '4px' }}
                />
              </Box>
            </Link>
            <CardContent sx={{ padding: '8px 12px' }}>
              <Link href="/" className="product-item-brand-link">
                LifeBuoy
              </Link>
              <Link href="/" className="product-item-name-link">
                Nước Tẩy Trang Simple Cấp Ẩm Nhẹ Nhàng Làm Sạch Trang Điểm Micellar Cleansing Water 400Ml
              </Link>

              <Box className="product-item-rating">
                <Rating name="read-only" value={2} readOnly sx={{ fontSize: '16px' }} />
                <span className="number-rating">2</span>
              </Box>
              <Box className="price-box">
                <span className="special-price">140,000</span>
                <span className="old-price">199,000</span>
                <span className="percent-discount">
                  <span>-</span>30%
                </span>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card className="product-item">
          <CardActionArea>
            <Link href="/" sx={{ display: 'block' }}>
              <Box sx={{ padding: '8px' }}>
                <CardMedia
                  component="img"
                  height="227"
                  image="https://www.guardian.com.vn/media/catalog/product/cache/8abedaa231e51c424533dabd39634738/t/h/thumbnail_3019079_dbhnfakpoqfmtrd0.jpg"
                  alt="green iguana"
                  sx={{ borderRadius: '4px' }}
                />
              </Box>
            </Link>
            <CardContent sx={{ padding: '8px 12px' }}>
              <Link href="/" className="product-item-brand-link">
                LifeBuoy
              </Link>
              <Link href="/" className="product-item-name-link">
                Nước Tẩy Trang Simple Cấp Ẩm Nhẹ Nhàng Làm Sạch Trang Điểm Micellar Cleansing Water 400Ml
              </Link>

              <Box className="product-item-rating">
                <Rating name="read-only" value={2} readOnly sx={{ fontSize: '16px' }} />
                <span className="number-rating">2</span>
              </Box>
              <Box className="price-box">
                <span className="special-price">140,000</span>
                <span className="old-price">199,000</span>
                <span className="percent-discount">
                  <span>-</span>30%
                </span>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card className="product-item">
          <CardActionArea>
            <Link href="/" sx={{ display: 'block' }}>
              <Box sx={{ padding: '8px' }}>
                <CardMedia
                  component="img"
                  height="227"
                  image="https://www.guardian.com.vn/media/catalog/product/cache/8abedaa231e51c424533dabd39634738/t/h/thumbnail_3019079_dbhnfakpoqfmtrd0.jpg"
                  alt="green iguana"
                  sx={{ borderRadius: '4px' }}
                />
              </Box>
            </Link>
            <CardContent sx={{ padding: '8px 12px' }}>
              <Link href="/" className="product-item-brand-link">
                LifeBuoy
              </Link>
              <Link href="/" className="product-item-name-link">
                Nước Tẩy Trang Simple Cấp Ẩm Nhẹ Nhàng Làm Sạch Trang Điểm Micellar Cleansing Water 400Ml
              </Link>

              <Box className="product-item-rating">
                <Rating name="read-only" value={2} readOnly sx={{ fontSize: '16px' }} />
                <span className="number-rating">2</span>
              </Box>
              <Box className="price-box">
                <span className="special-price">140,000</span>
                <span className="old-price">199,000</span>
                <span className="percent-discount">
                  <span>-</span>30%
                </span>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card className="product-item">
          <CardActionArea>
            <Link href="/" sx={{ display: 'block' }}>
              <Box sx={{ padding: '8px' }}>
                <CardMedia
                  component="img"
                  height="227"
                  image="https://www.guardian.com.vn/media/catalog/product/cache/8abedaa231e51c424533dabd39634738/t/h/thumbnail_3019079_dbhnfakpoqfmtrd0.jpg"
                  alt="green iguana"
                  sx={{ borderRadius: '4px' }}
                />
              </Box>
            </Link>
            <CardContent sx={{ padding: '8px 12px' }}>
              <Link href="/" className="product-item-brand-link">
                LifeBuoy
              </Link>
              <Link href="/" className="product-item-name-link">
                Nước Tẩy Trang Simple Cấp Ẩm Nhẹ Nhàng Làm Sạch Trang Điểm Micellar Cleansing Water 400Ml
              </Link>

              <Box className="product-item-rating">
                <Rating name="read-only" value={2} readOnly sx={{ fontSize: '16px' }} />
                <span className="number-rating">2</span>
              </Box>
              <Box className="price-box">
                <span className="special-price">140,000</span>
                <span className="old-price">199,000</span>
                <span className="percent-discount">
                  <span>-</span>30%
                </span>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card className="product-item">
          <CardActionArea>
            <Link href="/" sx={{ display: 'block' }}>
              <Box sx={{ padding: '8px' }}>
                <CardMedia
                  component="img"
                  height="227"
                  image="https://www.guardian.com.vn/media/catalog/product/cache/8abedaa231e51c424533dabd39634738/t/h/thumbnail_3019079_dbhnfakpoqfmtrd0.jpg"
                  alt="green iguana"
                  sx={{ borderRadius: '4px' }}
                />
              </Box>
            </Link>
            <CardContent sx={{ padding: '8px 12px' }}>
              <Link href="/" className="product-item-brand-link">
                LifeBuoy
              </Link>
              <Link href="/" className="product-item-name-link">
                Nước Tẩy Trang Simple Cấp Ẩm Nhẹ Nhàng Làm Sạch Trang Điểm Micellar Cleansing Water 400Ml
              </Link>

              <Box className="product-item-rating">
                <Rating name="read-only" value={2} readOnly sx={{ fontSize: '16px' }} />
                <span className="number-rating">2</span>
              </Box>
              <Box className="price-box">
                <span className="special-price">140,000</span>
                <span className="old-price">199,000</span>
                <span className="percent-discount">
                  <span>-</span>30%
                </span>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>{' '}
        <Card className="product-item">
          <CardActionArea>
            <Link href="/" sx={{ display: 'block' }}>
              <Box sx={{ padding: '8px' }}>
                <CardMedia
                  component="img"
                  height="227"
                  image="https://www.guardian.com.vn/media/catalog/product/cache/8abedaa231e51c424533dabd39634738/t/h/thumbnail_3019079_dbhnfakpoqfmtrd0.jpg"
                  alt="green iguana"
                  sx={{ borderRadius: '4px' }}
                />
              </Box>
            </Link>
            <CardContent sx={{ padding: '8px 12px' }}>
              <Link href="/" className="product-item-brand-link">
                LifeBuoy
              </Link>
              <Link href="/" className="product-item-name-link">
                Nước Tẩy Trang Simple Cấp Ẩm Nhẹ Nhàng Làm Sạch Trang Điểm Micellar Cleansing Water 400Ml
              </Link>

              <Box className="product-item-rating">
                <Rating name="read-only" value={2} readOnly sx={{ fontSize: '16px' }} />
                <span className="number-rating">2</span>
              </Box>
              <Box className="price-box">
                <span className="special-price">140,000</span>
                <span className="old-price">199,000</span>
                <span className="percent-discount">
                  <span>-</span>30%
                </span>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>{' '}
        <Card className="product-item">
          <CardActionArea>
            <Link href="/" sx={{ display: 'block' }}>
              <Box sx={{ padding: '8px' }}>
                <CardMedia
                  component="img"
                  height="227"
                  image="https://www.guardian.com.vn/media/catalog/product/cache/8abedaa231e51c424533dabd39634738/t/h/thumbnail_3019079_dbhnfakpoqfmtrd0.jpg"
                  alt="green iguana"
                  sx={{ borderRadius: '4px' }}
                />
              </Box>
            </Link>
            <CardContent sx={{ padding: '8px 12px' }}>
              <Link href="/" className="product-item-brand-link">
                LifeBuoy
              </Link>
              <Link href="/" className="product-item-name-link">
                Nước Tẩy Trang Simple Cấp Ẩm Nhẹ Nhàng Làm Sạch Trang Điểm Micellar Cleansing Water 400Ml
              </Link>

              <Box className="product-item-rating">
                <Rating name="read-only" value={2} readOnly sx={{ fontSize: '16px' }} />
                <span className="number-rating">2</span>
              </Box>
              <Box className="price-box">
                <span className="special-price">140,000</span>
                <span className="old-price">199,000</span>
                <span className="percent-discount">
                  <span>-</span>30%
                </span>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>{' '}
        <Card className="product-item">
          <CardActionArea>
            <Link href="/" sx={{ display: 'block' }}>
              <Box sx={{ padding: '8px' }}>
                <CardMedia
                  component="img"
                  height="227"
                  image="https://www.guardian.com.vn/media/catalog/product/cache/8abedaa231e51c424533dabd39634738/t/h/thumbnail_3019079_dbhnfakpoqfmtrd0.jpg"
                  alt="green iguana"
                  sx={{ borderRadius: '4px' }}
                />
              </Box>
            </Link>
            <CardContent sx={{ padding: '8px 12px' }}>
              <Link href="/" className="product-item-brand-link">
                LifeBuoy
              </Link>
              <Link href="/" className="product-item-name-link">
                Nước Tẩy Trang Simple Cấp Ẩm Nhẹ Nhàng Làm Sạch Trang Điểm Micellar Cleansing Water 400Ml
              </Link>

              <Box className="product-item-rating">
                <Rating name="read-only" value={2} readOnly sx={{ fontSize: '16px' }} />
                <span className="number-rating">2</span>
              </Box>
              <Box className="price-box">
                <span className="special-price">140,000</span>
                <span className="old-price">199,000</span>
                <span className="percent-discount">
                  <span>-</span>30%
                </span>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card className="product-item">
          <CardActionArea>
            <Link href="/" sx={{ display: 'block' }}>
              <Box sx={{ padding: '8px' }}>
                <CardMedia
                  component="img"
                  height="227"
                  image="https://www.guardian.com.vn/media/catalog/product/cache/8abedaa231e51c424533dabd39634738/t/h/thumbnail_3019079_dbhnfakpoqfmtrd0.jpg"
                  alt="green iguana"
                  sx={{ borderRadius: '4px' }}
                />
              </Box>
            </Link>
            <CardContent sx={{ padding: '8px 12px' }}>
              <Link href="/" className="product-item-brand-link">
                LifeBuoy
              </Link>
              <Link href="/" className="product-item-name-link">
                Nước Tẩy Trang Simple Cấp Ẩm Nhẹ Nhàng Làm Sạch Trang Điểm Micellar Cleansing Water 400Ml
              </Link>

              <Box className="product-item-rating">
                <Rating name="read-only" value={2} readOnly sx={{ fontSize: '16px' }} />
                <span className="number-rating">2</span>
              </Box>
              <Box className="price-box">
                <span className="special-price">140,000</span>
                <span className="old-price">199,000</span>
                <span className="percent-discount">
                  <span>-</span>30%
                </span>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </Box>
  );
}

export default ListCard;
