import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import authService from '~/services/authService';
import { loginSuccess } from '~/redux/authSlice';
import { toast } from 'react-toastify';

const host = 'https://provinces.open-api.vn/api/';

function Address() {
  const currentUser = useSelector((state) => state.auth.login?.currentUser);
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [ward, setWard] = useState('');
  const [name, setName] = useState('');
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  // Error state for validation
  const [errors, setErrors] = useState({
    name: false,
    phone: false,
    address: false,
    province: false,
    district: false,
    ward: false,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`${host}?depth=1`).then((response) => {
      const sortedCities = response.data.sort((a, b) => a.name.localeCompare(b.name));
      setCities(sortedCities);

      const provinceCode = sortedCities.find((city) => city.name === currentUser?.province)?.code;
      setProvince(provinceCode || '');
    });
  }, [currentUser]);

  useEffect(() => {
    if (province) {
      axios.get(`${host}p/${province}?depth=2`).then((response) => {
        setDistricts(response.data.districts);

        const districtCode = response.data.districts.find((dist) => dist.name === currentUser?.district)?.code;
        setDistrict(districtCode || '');
      });
    }
  }, [province, currentUser]);

  useEffect(() => {
    if (district) {
      axios.get(`${host}d/${district}?depth=2`).then((response) => {
        setWards(response.data.wards);

        const wardCode = response.data.wards.find((wrd) => wrd.name === currentUser?.ward)?.code;
        setWard(wardCode || '');
      });
    }
  }, [district, currentUser]);

  const handleClickOpen = () => {
    setName(currentUser?.username || '');
    setAddress(currentUser?.address || '');
    setPhone(currentUser?.phone || '');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    // Validation: Check if any required fields are empty
    const newErrors = {
      name: !name,
      phone: !phone,
      address: !address,
      province: !province,
      district: !district,
      ward: !ward,
    };
    setErrors(newErrors);

    // If any error exists, don't proceed with save
    if (Object.values(newErrors).some((error) => error)) {
      toast.error('Vui lòng điền vào tất cả các trường bắt buộc.');
      return;
    }

    try {
      const provinceName = cities.find((city) => city.code === province)?.name || '';
      const districtName = districts.find((dist) => dist.code === district)?.name || '';
      const wardName = wards.find((wrd) => wrd.code === ward)?.name || '';

      const res = await authService.updateUser(
        currentUser?._id,
        name,
        phone,
        address,
        provinceName,
        districtName,
        wardName,
      );
      dispatch(loginSuccess(res));
      setOpen(false);
      if (res.message) {
        toast.success(res.message);
      }
    } catch (error) {
      console.error('Other error:', error);
      toast.error('Failed to update user. Please try again.');
    }
  };

  return (
    <Box>
      <h2>Địa chỉ giao hàng</h2>
      <Box className="box-info">
        <Box className="box-title">Nhà riêng</Box>
        <Box className="box-content">
          <strong>
            {currentUser?.username} {currentUser?.phone && <>&nbsp;•&nbsp; {currentUser?.phone}</>}
          </strong>
          {currentUser?.ward ? (
            <div>{`${currentUser?.address}, ${currentUser?.ward}, ${currentUser?.district}, ${currentUser?.province}`}</div>
          ) : (
            <div>Bạn chưa có địa chỉ giao hàng.</div>
          )}
        </Box>
        <Box className="box-action">
          <Button onClick={handleClickOpen}>Chỉnh sửa</Button>
        </Box>
      </Box>

      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>
          CHỈNH SỬA ĐỊA CHỈ
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            style={{ position: 'absolute', right: 12, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box marginBottom={2}>
            <TextField
              fullWidth
              margin="normal"
              label={
                <span>
                  Tên<span style={{ color: 'red' }}>*</span>
                </span>
              }
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
              helperText={errors.name && 'Tên là bắt buộc'}
            />
            <TextField
              fullWidth
              margin="normal"
              label={
                <span>
                  Số điện thoại<span style={{ color: 'red' }}>*</span>
                </span>
              }
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              error={errors.phone}
              helperText={errors.phone && 'Số điện thoại là bắt buộc'}
            />
          </Box>
          <FormControl fullWidth margin="normal" error={errors.province}>
            <InputLabel id="demo-simple-select-helper-label">
              Tỉnh/TP<span style={{ color: 'red' }}>*</span>
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              label="Tỉnh/TP...."
              value={province}
              onChange={(e) => setProvince(e.target.value)}
            >
              <MenuItem value="">
                <em>Chọn Tỉnh/TP</em>
              </MenuItem>
              {cities.map((city) => (
                <MenuItem key={city.code} value={city.code}>
                  {city.name}
                </MenuItem>
              ))}
            </Select>
            {errors.province && (
              <span style={{ color: '#d32f2f', fontSize: '10px', margin: '3px 14px 0px' }}>Tỉnh/TP là bắt buộc</span>
            )}
          </FormControl>

          <FormControl fullWidth margin="normal" error={errors.district} disabled={!province}>
            <InputLabel id="demo-simple-select-helper-label">
              Quận/Huyện<span style={{ color: 'red' }}>*</span>
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              label="Quận/Huyện...."
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
            >
              <MenuItem value="">
                <em>Chọn Quận/Huyện</em>
              </MenuItem>
              {districts.map((district) => (
                <MenuItem key={district.code} value={district.code}>
                  {district.name}
                </MenuItem>
              ))}
            </Select>
            {errors.district && (
              <span style={{ color: '#d32f2f', fontSize: '10px', margin: '3px 14px 0px' }}>Quận/Huyện là bắt buộc</span>
            )}
          </FormControl>

          <FormControl fullWidth margin="normal" error={errors.ward} disabled={!district}>
            <InputLabel id="demo-simple-select-helper-label">
              Xã/Phường<span style={{ color: 'red' }}>*</span>
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              label="Xã/Phường...."
              value={ward}
              onChange={(e) => setWard(e.target.value)}
            >
              <MenuItem value="">
                <em>Chọn Xã/Phường</em>
              </MenuItem>
              {wards.map((ward) => (
                <MenuItem key={ward.code} value={ward.code}>
                  {ward.name}
                </MenuItem>
              ))}
            </Select>
            {errors.ward && (
              <span style={{ color: '#d32f2f', fontSize: '10px', margin: '3px 14px 0px' }}>Xã/Phường là bắt buộc</span>
            )}
          </FormControl>

          <TextField
            fullWidth
            margin="normal"
            label={
              <span>
                Địa chỉ<span style={{ color: 'red' }}>*</span>
              </span>
            }
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            error={errors.address}
            helperText={errors.address && 'Địa chỉ là bắt buộc'}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ color: 'white', backgroundColor: 'black' }}>
            Hủy
          </Button>
          <Button onClick={handleSave} style={{ color: 'white', backgroundColor: 'var(--primary-color)' }}>
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Address;
