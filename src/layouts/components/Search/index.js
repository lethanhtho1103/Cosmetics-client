import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';

import productService from '~/services/productService';
import useDebounce from '~/hooks/useDebounce';
import { baseUrl } from '~/axios';

export default function Search() {
  const [value, setValue] = useState('');
  const [products, setProducts] = useState([]);
  const debouncedValue = useDebounce(value, 500);

  const handleGetProductByName = async (nameProduct) => {
    try {
      if (nameProduct) {
        const res = await productService.getProductByName({ nameProduct });
        setProducts(res.data || []); // Ensure that you always set an array
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setProducts([]); // In case of an error, fallback to an empty array
    }
  };

  useEffect(() => {
    handleGetProductByName(debouncedValue);
  }, [debouncedValue]);

  return (
    <Autocomplete
      freeSolo
      inputValue={value}
      onInputChange={(event, newValue) => {
        setValue(newValue);
      }}
      options={products}
      getOptionLabel={(option) => option?.name || ''}
      noOptionsText="Không có kết quả phù hợp"
      renderOption={(props, option) => (
        <li {...props} key={option?.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link
            href={`http://localhost:3000/product-detail/${option?.name}`}
            style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
          >
            <img src={`${baseUrl}/${option?.image}`} alt={option?.name} width="50" height="50" />
            <div style={{ marginLeft: '10px' }}>
              <div
                style={{
                  fontWeight: '500',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  color: '#1b1a19',
                  fontSize: '12px',
                }}
              >
                {option?.name}
              </div>
              <div style={{ color: 'red', fontSize: '12px' }}>{option?.price}đ</div>
            </div>
          </Link>
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Tìm kiếm sản phẩm..."
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <IconButton edge="start">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      )}
      sx={{
        width: 600,
        fontSize: '14px',
        color: '#1b1a19',
        lineHeight: 1.429,
        '& .MuiInputBase-root': {
          height: '44px',
          padding: '12px 14px',
          '&:focus-within': {
            boxShadow: '0 0 0 3px #fff0e2',
          },
        },
        '& .MuiOutlinedInput-root': {
          height: 42,
          borderRadius: 6,
          background: '#fafafa',
          '& .MuiInputBase-input': {
            padding: '10px 14px',
            paddingLeft: 0,
            border: 'none',
          },
        },
      }}
    />
  );
}
