import { Link, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import UserLayout from '~/layouts/UserLayout';
import { useDispatch } from 'react-redux';

import './Register.scss';

import authService from '~/services/authService';
import { loginSuccess } from '~/redux/authSlice';
import Social from '~/components/Social';
import { toast } from 'react-toastify';

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const btnSubmitRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();
  const usernameRef = useRef();
  const confirmPassRef = useRef();
  const addressRef = useRef();
  const phoneRef = useRef();
  const avatarRef = useRef();

  const [emailInput, setEmail] = useState('');
  const [passInput, setPassInput] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassInput, setConfirmPassInput] = useState('');
  const [addressInput, setAddressInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [errClassEmail, setErrClassEmail] = useState(false);
  const [errClassPass, SetErrClassPass] = useState(false);
  const [errClassUsername, setErrClassUsername] = useState(false);
  const [errClassConfirmPass, setErrClassConfirmPass] = useState(false);
  const [errClassAddress, setErrClassAddress] = useState(false);
  const [errClassPhone, setErrClassPhone] = useState(false);

  const [isLoader, setIsLoader] = useState(false);

  const handleChange = (e, type) => {
    switch (type) {
      case 'email':
        setEmail(e.target.value);
        setErrClassEmail(false);
        break;
      case 'password':
        setPassInput(e.target.value);
        SetErrClassPass(false);
        break;
      case 'username':
        setUsername(e.target.value);
        setErrClassUsername(false);
        break;
      case 'confirmPassword':
        setConfirmPassInput(e.target.value);
        setErrClassConfirmPass(false);
        break;
      case 'address':
        setAddressInput(e.target.value);
        setErrClassAddress(false);
        break;
      case 'phone':
        setPhoneInput(e.target.value);
        setErrClassPhone(false);
        break;
      case 'avatar':
        const file = e.target.files[0];
        setAvatarFile(file);
        setAvatarPreview(URL.createObjectURL(file)); // Preview the selected avatar
        break;
      default:
        break;
    }
  };

  const handleRemoveAvatar = () => {
    setAvatarFile(null);
    setAvatarPreview(null);
    avatarRef.current.value = '';
  };

  const handleSubmit = async () => {
    // eslint-disable-next-line
    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const regexPhone = /^\d{10,12}$/;

    if (!username) {
      toast.error('Vui lòng nhập tên người dùng.');
      setErrClassUsername(true);
      usernameRef.current.focus();
      return;
    } else if (!emailInput) {
      toast.error('Vui lòng nhập địa chỉ email.');
      setErrClassEmail(true);
      emailRef.current.focus();
      return;
    } else if (!regexEmail.test(emailInput)) {
      toast.error('Địa chỉ email không hợp lệ. Vui lòng nhập lại.');
      setErrClassEmail(true);
      emailRef.current.focus();
      return;
    } else if (!phoneInput || !regexPhone.test(phoneInput)) {
      toast.error('Số điện thoại không hợp lệ. Vui lòng nhập lại.');
      setErrClassPhone(true);
      phoneRef.current.focus();
      return;
    } else if (!addressInput) {
      toast.error('Vui lòng nhập địa chỉ.');
      setErrClassAddress(true);
      addressRef.current.focus();
      return;
    } else if (!passInput) {
      toast.error('Vui lòng nhập mật khẩu.');
      SetErrClassPass(true);
      passRef.current.focus();
      return;
    } else if (passInput !== confirmPassInput) {
      toast.error('Mật khẩu xác nhận không khớp.');
      setErrClassConfirmPass(true);
      confirmPassRef.current.focus();
      return;
    }

    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', emailInput);
    formData.append('password', passInput);
    formData.append('address', addressInput);
    formData.append('phone', phoneInput);
    formData.append('avatar', avatarFile);

    try {
      setIsLoader(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      const res = await authService.register(formData);
      dispatch(loginSuccess(res));
      setIsLoader(false);
      navigate('/');
    } catch (error) {
      setIsLoader(false);
      toast.error('Đã xảy ra lỗi trong quá trình đăng ký.');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent default form submission behavior
      handleSubmit();
    }
  };

  return (
    <UserLayout>
      <main className="container-register page-wrapper">
        <section className="page-content">
          <div className="page-title">
            <h1 className="title">Đăng ký</h1>
            <div className="register-link">
              Bạn đã có tài khoản?
              <Link to="/login">Đăng nhập ngay</Link>
            </div>
            {isLoader && <CircularProgress sx={{ position: 'absolute', zIndex: 3000 }} />}
          </div>

          <form onKeyDown={handleKeyDown}>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Tên người dùng"
                value={username}
                inputRef={usernameRef}
                error={errClassUsername}
                onChange={(e) => handleChange(e, 'username')}
                required
                id="username"
                variant="outlined"
                fullWidth
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Email"
                value={emailInput}
                inputRef={emailRef}
                error={errClassEmail}
                onChange={(e) => handleChange(e, 'email')}
                required
                id="email"
                autoComplete="off"
                variant="outlined"
                fullWidth
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Số điện thoại"
                value={phoneInput}
                inputRef={phoneRef}
                error={errClassPhone}
                onChange={(e) => handleChange(e, 'phone')}
                required
                id="phone"
                variant="outlined"
                fullWidth
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <TextField
                label="Địa chỉ"
                value={addressInput}
                inputRef={addressRef}
                error={errClassAddress}
                onChange={(e) => handleChange(e, 'address')}
                required
                id="address"
                variant="outlined"
                fullWidth
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Mật khẩu"
                type="password"
                value={passInput}
                inputRef={passRef}
                error={errClassPass}
                onChange={(e) => handleChange(e, 'password')}
                required
                id="password"
                variant="outlined"
                fullWidth
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Xác nhận mật khẩu"
                type="password"
                value={confirmPassInput}
                inputRef={confirmPassRef}
                error={errClassConfirmPass}
                onChange={(e) => handleChange(e, 'confirmPassword')}
                required
                id="confirmPassword"
                variant="outlined"
                fullWidth
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <input type="file" ref={avatarRef} onChange={(e) => handleChange(e, 'avatar')} id="avatar" required />
            </FormControl>

            {avatarPreview && (
              <div className="avatar-preview-container">
                <img src={avatarPreview} alt="Avatar Preview" />
                <Button variant="contained" className="remove-avatar-button" onClick={handleRemoveAvatar}>
                  Xóa ảnh
                </Button>
              </div>
            )}

            <Button
              ref={btnSubmitRef}
              onClick={handleSubmit}
              className="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Đăng ký
            </Button>
          </form>
          <div className="notification-box">
            <p className="notification-box__text">
              <strong>
                Chào mừng bạn đến với Orange. Hãy tạo tài khoản để trải nghiệm đầy đủ tính năng của chúng tôi.
              </strong>
            </p>
          </div>
          <Social isRegister={true} />
        </section>
      </main>
    </UserLayout>
  );
}

export default Register;
