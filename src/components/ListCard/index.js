import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Pagination from '@mui/material/Pagination';
import Rating from '@mui/material/Rating';
import { Link } from 'react-router-dom';
import './ListCard.scss';
import { baseUrl } from '~/axios';

function ListCard({ cardCount = 5, products }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = cardCount === 5 ? 10 : 8;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = Array.isArray(products) ? products.slice(startIndex, endIndex) : [];

  const formatNumber = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  console.log(products)

  return (
    <Box sx={{ marginTop: '24px' }}>
      <div className={`product-items product-items-${cardCount}`}>
        {currentProducts?.map((product, index) => {
          const name = product?.product_id?.name || product?.name;
          const origin = product?.product_id?.origin || product?.origin;
          const image = product?.product_id?.image || product?.image;
          const price = product?.product_id?.price || product?.price;
          const discount =
            (product?.promotion_id?.status === 'active' && product?.promotion_id?.discount_value) ?
            product?.promotion?.discount_value : 0;
          const average_star = product?.product_id?.average_star || product?.average_star;

          return (
            <Card
              className={`product-item ${index % cardCount === 0 ? 'first-in-row' : ''} ${
                (index + 1) % cardCount === 0 ? 'last-in-row' : ''
              }`}
              sx={{ maxWidth: `calc(100%/${cardCount}  - 13px)` }}
              key={index}
            >
              <CardActionArea>
                <Link to={`http://localhost:3000/product-detail/${name}`} className="product-item-link">
                  <Box sx={{ padding: '8px' }}>
                    <CardMedia
                      component="img"
                      height="227"
                      image={`${baseUrl}/${image}`}
                      alt={name}
                      sx={{ borderRadius: '4px' }}
                    />
                  </Box>
                </Link>
                <CardContent sx={{ padding: '8px 12px' }}>
                  <Link to={`http://localhost:3000/product-detail/${name}`} className="product-item-brand-link">
                    {origin}
                  </Link>
                  <Link to={`http://localhost:3000/product-detail/${name}`} className="product-item-name-link">
                    {name}
                  </Link>
                  <Box className="product-item-rating">
                    <Rating name="read-only" value={average_star} readOnly sx={{ fontSize: '16px' }} />
                    <span className="number-rating">{average_star}</span>
                  </Box>
                  <Box className="price-box">
                    {discount > 0 ? (
                      <span className="special-price">{formatNumber((price * discount) / 100)}</span>
                    ) : (
                      <span className="special-price">{formatNumber(price)}</span>
                    )}
                    {discount > 0 && <span className="old-price">{formatNumber(price)}</span>}
                    {discount > 0 && (
                      <span className="percent-discount">
                        <span>-</span>
                        {discount ? discount : '0'}%
                      </span>
                    )}
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          );
        })}
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
            fontWeight: 600,
          },
          '& .Mui-selected': {
            color: 'white !important',
            backgroundColor: 'primary.main',
          },
        }}
      />
    </Box>
  );
}

export default ListCard;
