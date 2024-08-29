import { Box, Card, CardActionArea, CardContent, CardMedia, Rating } from '@mui/material';
import { Link } from 'react-router-dom';
import './ListCard.scss';
import { baseUrl } from '~/axios';

function ListCard({ cardCount = 5, products }) {
  const formatNumber = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return (
    <Box sx={{ marginTop: '24px' }}>
      <div className={`product-items product-items-${cardCount}`}>
        {products?.map((product, index) => (
          <Card
            className={`product-item ${index % cardCount === 0 ? 'first-in-row' : ''} ${
              (index + 1) % cardCount === 0 ? 'last-in-row' : ''
            }`}
            sx={{ maxWidth: `calc(100%/${cardCount}  - 13px)` }}
            key={index}
          >
            <CardActionArea>
              <Link to={`http://localhost:3000/product-detail/${product?.name}`} className="product-item-link">
                <Box sx={{ padding: '8px' }}>
                  <CardMedia
                    component="img"
                    height="227"
                    image={`${baseUrl}/${product?.image}`}
                    alt={product?.name}
                    sx={{ borderRadius: '4px' }}
                  />
                </Box>
              </Link>
              <CardContent sx={{ padding: '8px 12px' }}>
                <Link to={`http://localhost:3000/product-detail/${product?.name}`} className="product-item-brand-link">
                  {product?.origin}
                </Link>
                <Link to={`http://localhost:3000/product-detail/${product?.name}`} className="product-item-name-link">
                  {product?.name}
                </Link>
                <Box className="product-item-rating">
                  <Rating name="read-only" value={product?.average_star} readOnly sx={{ fontSize: '16px' }} />
                  <span className="number-rating">{product?.average_star}</span>
                </Box>
                <Box className="price-box">
                  <span className="special-price">{formatNumber(product?.price)}</span>
                  <span className="old-price">{product?.oldPrice ? '99000' : '0'}</span>
                  <span className="percent-discount">
                    <span>-</span>
                    {product?.discount ? '10' : '0'}%
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
