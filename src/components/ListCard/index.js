import { Box, Card, CardActionArea, CardContent, CardMedia, Rating } from '@mui/material';
import { Link } from 'react-router-dom';
import './ListCard.scss';

function ListCard({ cardCount = 5 }) {
  const cards = new Array(10).fill({
    image: 'https://www.guardian.com.vn/media/catalog/product/cache/8abedaa231e51c424533dabd39634738/3/0/3000013.png',
    brand: 'LifeBuoy',
    name: 'Nước Tẩy Trang Simple Cấp Ẩm Nhẹ Nhàng Làm Sạch Trang Điểm Micellar Cleansing Water 400Ml',
    rating: 2,
    specialPrice: '140,000',
    oldPrice: '199,000',
    discount: 30,
  });

  return (
    <Box sx={{ marginTop: '24px' }}>
      <div className={`product-items product-items-${cardCount}`}>
        {cards.map((product, index) => (
          <Card
            className={`product-item ${index % cardCount === 0 ? 'first-in-row' : ''} ${
              (index + 1) % cardCount === 0 ? 'last-in-row' : ''
            }`}
            sx={{ maxWidth: `calc(100%/${cardCount}  - 13px)` }}
            key={index}
          >
            <CardActionArea>
              <Link to={`http://localhost:3000/product-detail/${product.name}`} className="product-item-link">
                <Box sx={{ padding: '8px' }}>
                  <CardMedia
                    component="img"
                    height="227"
                    image={product.image}
                    alt={product.name}
                    sx={{ borderRadius: '4px' }}
                  />
                </Box>
              </Link>
              <CardContent sx={{ padding: '8px 12px' }}>
                <Link to={`http://localhost:3000/product-detail/${product.name}`} className="product-item-brand-link">
                  {product.brand}
                </Link>
                <Link to={`http://localhost:3000/product-detail/${product.name}`} className="product-item-name-link">
                  {product.name}
                </Link>
                <Box className="product-item-rating">
                  <Rating name="read-only" value={product.rating} readOnly sx={{ fontSize: '16px' }} />
                  <span className="number-rating">{product.rating}</span>
                </Box>
                <Box className="price-box">
                  <span className="special-price">{product.specialPrice}</span>
                  <span className="old-price">{product.oldPrice}</span>
                  <span className="percent-discount">
                    <span>-</span>
                    {product.discount}%
                  </span>
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </div>
    </Box>
  );
}

export default ListCard;
