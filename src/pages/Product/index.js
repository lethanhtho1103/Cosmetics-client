import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import { useState, useCallback, useEffect, useRef } from 'react';
import CustomBreadcrumbs from '~/components/Breakcrumbs';
import UserLayout from '~/layouts/UserLayout';
import ListCard from '~/components/ListCard';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';

import './Product.scss';
import productService from '~/services/productService';

function Product() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState('AZname');
  const [priceRange, setPriceRange] = useState([0, 3000000]);
  const [selectedDiscounts, setSelectedDiscounts] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [brands, setBrands] = useState([]);
  const brandsSet = useRef(false);

  const discounts = ['0 - 10%', '10% - 20%', '30% - 40%'];

  const routes = [
    { name: 'Trang chủ', path: '/' },
    { name: categoryName, path: '' },
  ];

  const formatNumber = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Handlers
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handlePriceInputChange = (index, event) => {
    const newValue = [...priceRange];
    newValue[index] = Number(event.target.value.replace(/,/g, ''));
    setPriceRange(newValue);
  };

  const handleCheckboxChange = (stateUpdater, value) => (event) => {
    const { checked } = event.target;
    stateUpdater((prev) => (checked ? [...prev, value] : prev.filter((item) => item !== value)));
  };

  const handleRemoveFilter = useCallback(
    (filter) => {
      if (filter.includes('%')) {
        setSelectedDiscounts((prev) => prev.filter((discount) => discount !== filter));
      } else if (brands.includes(filter)) {
        setSelectedBrands((prev) => prev.filter((brand) => brand !== filter));
      } else {
        setPriceRange([0, 3000000]);
      }
    },
    [brands],
  );

  const handleGetAllProducts = async () => {
    const res = await productService.getAllProductByCategoryName({
      categoryName,
      sortBy: sortBy.startsWith('AZ') || sortBy.startsWith('ZA') ? sortBy.slice(2) : sortBy,
      order: sortBy.startsWith('AZ') ? 'asc' : 'desc',
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      trademark: selectedBrands,
    });
    setProducts(res.data);
    if (!brandsSet.current) {
      const uniqueBrands = [...new Set(res.data.map((product) => product.trademark))];
      setBrands(uniqueBrands);
      brandsSet.current = true;
    }
  };

  useEffect(() => {
    handleGetAllProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryName, sortBy, priceRange, selectedBrands]);

  useEffect(() => {
    brandsSet.current = false;
    const uniqueBrands = [...new Set(products.map((product) => product.trademark))];
    setBrands(uniqueBrands);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryName]);

  return (
    <UserLayout>
      <Container disableGutters maxWidth={false} className="container">
        <CustomBreadcrumbs routes={routes} />
        <main className="page-main">
          <Box className="category-image">
            <img src="https://www.guardian.com.vn/media/wysiwyg/banner/Head_PC_1.jpg" alt="Category" />
          </Box>
          <Box className="columns">
            <Box className="page-title-wrapper">
              <Box className="page-title">
                <Typography variant="h1">Hỗ trợ làm đẹp da</Typography>
                <Typography variant="body2">({products?.length} sản phẩm)</Typography>
              </Box>
              <Box className="toolbar-store">
                <Typography component="label">Xếp theo: </Typography>
                <FormControl sx={{ minWidth: 120 }} size="small">
                  <Select value={sortBy} onChange={handleSortChange} displayEmpty>
                    <MenuItem value="sold_quantity">Bán chạy nhất</MenuItem>
                    <MenuItem value="average_star">Xếp hạng</MenuItem>
                    <MenuItem value="AZname">Tên sản phẩm (A - Z)</MenuItem>
                    <MenuItem value="ZAname">Tên sản phẩm (Z - A)</MenuItem>
                    <MenuItem value="ZAprice">Giá giảm dần</MenuItem>
                    <MenuItem value="AZprice">Giá tăng dần</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <Box className="sidebar-main">
                {/* Filter Display */}
                <Box sx={{ marginBottom: 1, padding: '8px 16px', border: '1px solid #ccc', borderRadius: 1 }}>
                  <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: '700' }}>
                    LỌC THEO
                  </Typography>
                  <Box>
                    {(priceRange[0] !== 0 || priceRange[1] !== 3000000) && (
                      <FilterItem
                        label={`${formatNumber(priceRange[0])} - ${formatNumber(priceRange[1])}`}
                        onRemove={() =>
                          handleRemoveFilter(`${formatNumber(priceRange[0])} - ${formatNumber(priceRange[1])}₫`)
                        }
                      />
                    )}
                    {selectedDiscounts.map((discount) => (
                      <FilterItem key={discount} label={discount} onRemove={() => handleRemoveFilter(discount)} />
                    ))}
                    {selectedBrands.map((brand) => (
                      <FilterItem key={brand} label={brand} onRemove={() => handleRemoveFilter(brand)} />
                    ))}
                  </Box>
                </Box>

                {/* Price Range Accordion */}
                <Accordion
                  className="custom-accordion"
                  sx={{ borderTopRightRadius: '4px', borderTopLeftRadius: '4px' }}
                >
                  <AccordionSummary
                    sx={{ fontWeight: '700', textTransform: 'uppercase', borderTop: 'none' }}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    Khoảng giá
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography>{`${formatNumber(priceRange[0])}₫`}</Typography>
                      <Typography>{`${formatNumber(priceRange[1])}₫`}</Typography>
                    </Box>
                    <Slider
                      value={priceRange}
                      onChange={handlePriceChange}
                      min={0}
                      max={3000000}
                      step={1000}
                      valueLabelDisplay="auto"
                      sx={{
                        color: 'orange',
                        '& .MuiSlider-thumb': { borderRadius: '50%' },
                      }}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
                      <PriceInput value={formatNumber(priceRange[0])} onChange={(e) => handlePriceInputChange(0, e)} />
                      <Typography component="span" sx={{ mx: 1 }}>
                        -
                      </Typography>
                      <PriceInput value={formatNumber(priceRange[1])} onChange={(e) => handlePriceInputChange(1, e)} />
                    </Box>
                  </AccordionDetails>
                </Accordion>

                {/* Discount Accordion */}
                <Accordion className="custom-accordion">
                  <AccordionSummary
                    sx={{ fontWeight: '700', textTransform: 'uppercase' }}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                  >
                    Khuyến mãi
                  </AccordionSummary>
                  <AccordionDetails>
                    {discounts.map((discount) => (
                      <FormControlLabel
                        key={discount}
                        control={
                          <Checkbox
                            checked={selectedDiscounts.includes(discount)}
                            onChange={handleCheckboxChange(setSelectedDiscounts, discount)}
                            sx={{ color: 'orange', '&.Mui-checked': { color: 'orange' } }}
                          />
                        }
                        label={discount}
                      />
                    ))}
                  </AccordionDetails>
                </Accordion>

                {/* Brands Accordion */}
                <Accordion className="custom-accordion">
                  <AccordionSummary
                    sx={{ fontWeight: '700', textTransform: 'uppercase' }}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3-content"
                    id="panel3-header"
                  >
                    Thương hiệu
                  </AccordionSummary>
                  <AccordionDetails>
                    {brands.map((brand) => (
                      <FormControlLabel
                        key={brand}
                        control={
                          <Checkbox
                            checked={selectedBrands.includes(brand)}
                            onChange={handleCheckboxChange(setSelectedBrands, brand)}
                            sx={{ color: 'orange', '&.Mui-checked': { color: 'orange' } }}
                          />
                        }
                        label={brand}
                      />
                    ))}
                  </AccordionDetails>
                </Accordion>
              </Box>
              <Box className="column-main" sx={{ mt: '-24px' }}>
                <ListCard cardCount={4} products={products} />
              </Box>
            </Box>
          </Box>
        </main>
      </Container>
    </UserLayout>
  );
}

// FilterItem component for display of selected filters
const FilterItem = ({ label, onRemove }) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 0' }}>
    <Typography variant="body2">{label}</Typography>
    <IconButton size="small" onClick={onRemove}>
      <DeleteIcon sx={{ fontSize: 20 }} color="error" />
    </IconButton>
  </Box>
);

// PriceInput component for price range inputs
const PriceInput = ({ value, onChange }) => (
  <TextField
    variant="outlined"
    value={value}
    onChange={onChange}
    size="small"
    sx={{
      '& .MuiOutlinedInput-root': {
        borderRadius: '50px',
        '&.Mui-focused fieldset': {
          borderColor: 'orange',
        },
      },
      '& input': { padding: '10px', textAlign: 'center' },
    }}
  />
);

export default Product;
