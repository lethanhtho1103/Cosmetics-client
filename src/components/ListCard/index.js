import { useState } from 'react';
import { Box, Card, CardActionArea, CardContent, CardMedia, Pagination, Rating } from '@mui/material';
import { Link } from 'react-router-dom';
import './ListCard.scss';
import { baseUrl } from '~/axios';

function ListCard({ cardCount = 5, products }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Calculate the start and end indices for slicing the products array
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products?.slice(startIndex, endIndex);

  const formatNumber = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Box sx={{ marginTop: '24px' }}>
      <div className={`product-items product-items-${cardCount}`}>
        {currentProducts?.map((product, index) => (
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
      <Pagination
        count={Math.ceil(products?.length / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        sx={{
          marginTop: '16px',
          display: 'flex',
          justifyContent: 'center',
          '& .MuiPaginationItem-root': {
            backgroundColor: '#f5f5f5',
            fontWeight: 600, // Ensures good contrast
          },
          '& .Mui-selected': {
            color: 'white !important', // Active page color
            backgroundColor: 'primary.main',
          },
        }}
      />
    </Box>
  );
}

export default ListCard;
