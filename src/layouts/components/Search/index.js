import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import MicIcon from '@mui/icons-material/Mic';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import productService from '~/services/productService';
import useDebounce from '~/hooks/useDebounce';
import { baseUrl } from '~/axios';

export default function Search() {
  const [value, setValue] = useState('');
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const debouncedValue = useDebounce(value, 500);
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechTimeout, setSpeechTimeout] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleGetProductByName = async (nameProduct) => {
    try {
      if (nameProduct) {
        const res = await productService.getProductByName({ nameProduct });
        setProducts(res.data || []);
        if (res.data.length === 0) {
          setSnackbarOpen(true);
        }
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setProducts([]);
    }
  };

  useEffect(() => {
    handleGetProductByName(debouncedValue);
  }, [debouncedValue]);

  useEffect(() => {
    if (transcript) {
      const newWords = transcript.split(' ').filter((word) => !value.includes(word));
      if (newWords.length > 0) {
        setValue((prevValue) => `${prevValue} ${newWords.join(' ')}`.trim());
        handleGetProductByName(`${value} ${newWords.join(' ')}`.trim());
      }
      if (speechTimeout) {
        clearTimeout(speechTimeout);
      }
      setSpeechTimeout(
        setTimeout(() => {
          setIsSpeaking(false);
          stopListening();
        }, 2000),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcript]);

  const startListening = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true });
    setIsListening(true);
    setIsSpeaking(true);
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    setIsListening(false);
  };

  const handleMicClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Autocomplete
        inputValue={value}
        onInputChange={(event, newValue) => {
          setValue(newValue);
          setOpen(true);
        }}
        options={products.length > 0 ? products : []}
        getOptionLabel={(option) => option?.name || ''}
        noOptionsText="Không tìm thấy kết quả"
        open={open}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            handleGetProductByName(value);
          }
        }}
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
                  <IconButton edge="start" onClick={handleMicClick}>
                    {isSpeaking ? (
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          backgroundColor: 'red',
                          borderRadius: '50%',
                          marginLeft: '5px',
                          animation: 'blink 1s infinite',
                        }}
                      />
                    ) : (
                      <MicIcon />
                    )}
                  </IconButton>
                  <IconButton edge="end" onClick={() => handleGetProductByName(value)}>
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
          '@keyframes blink': {
            '0%': { opacity: 1 },
            '50%': { opacity: 0 },
            '100%': { opacity: 1 },
          },
        }}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Không tìm thấy sản phẩm nào."
      />
    </div>
  );
}
