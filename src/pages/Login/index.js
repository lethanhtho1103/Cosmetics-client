import { Link, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

import UserLayout from '~/layouts/UserLayout';
import { useDispatch } from 'react-redux';

import './Login.scss';

import authService from '~/services/authService';
import { loginSuccess } from '~/redux/authSlice';
import Social from '~/components/Social';
import { toast } from 'react-toastify';

function LoginUser() {
  const btnSubmitRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailInput, setEmail] = useState('');
  const [passInput, setPassInput] = useState('');
  const [errClass, setErrClass] = useState(false);
  const [errClassEmail, setErrClassEmail] = useState(false);
  const [errClassPass, SetErrClassPass] = useState(false);
  const [errMessage, setErrMessage] = useState('');

  const [isLoader, setIsLoader] = useState(false);

  const handleChange = (e, type) => {
    if (type === 'user') {
      setEmail(e.target.value);
      setErrClassEmail(false);
    } else if (type === 'password') {
      setPassInput(e.target.value);
      SetErrClassPass(false);
    }
  };

  const handleSubmit = async () => {
    // eslint-disable-next-line
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailInput) {
      setErrMessage('Vui lòng nhập địa chỉ email.');
      setErrClass(true);
      setErrClassEmail(true);
      emailRef.current.focus();
      return;
    } else if (!regex.test(emailInput)) {
      setErrMessage('Địa chỉ email không hợp lệ. Vui lòng nhập lại.');
      setErrClass(true);
      setErrClassEmail(true);
      emailRef.current.focus();
      return;
    } else if (!passInput) {
      setErrMessage('Vui lòng nhập mật khẩu.');
      setErrClass(true);
      SetErrClassPass(true);
      passRef.current.focus();
      return;
    }

    try {
      setIsLoader(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      const res = await authService.login(emailInput, passInput);
      dispatch(loginSuccess(res));
      setIsLoader(false);
      navigate('/');
      toast.success('Đăng nhập thành công.');
    } catch (error) {
      setIsLoader(false);
      if (error.response) {
        setErrClass(true);
        setErrClassEmail(true);
        SetErrClassPass(true);
        setEmail('');
        setPassInput('');
        setErrMessage('Email hoặc mật khẩu không đúng.');
        emailRef.current.focus();
      } else {
        console.error('Other error:', error);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <UserLayout>
      <main className="container-login page-wrapper">
        <section className="page-content">
          <div className="page-title">
            <h1 className="title">Đăng nhập</h1>
            <div className="register-link">
              Bạn chưa có tài khoản?
              <Link to="/register">Đăng ký ngay</Link>
            </div>
            {isLoader && <CircularProgress sx={{ position: 'absolute', zIndex: 3000 }} />}
          </div>
          {errClass && (
            <div className="notification-box invalid">
              <div className="notification-box__text">
                <span>{errMessage}</span>
              </div>
            </div>
          )}
          <form onKeyDown={handleKeyDown}>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Email"
                value={emailInput}
                inputRef={emailRef}
                error={errClassEmail}
                onChange={(e) => handleChange(e, 'user')}
                required
                id="user"
                autoComplete="off"
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

            <div className="remember-forgot">
              <Link to="/">Quên mật khẩu?</Link>
            </div>
            <div>
              <Button
                ref={btnSubmitRef}
                onClick={handleSubmit}
                className="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Đăng nhập
              </Button>
            </div>
          </form>
          <div className="notification-box">
            <p className="notification-box__text">
              <strong>
                Chào mừng trở lại! Chúng tôi rất vui khi bạn quay lại. Hãy đăng nhập để tiếp tục khám phá và trải nghiệm
                những tính năng tuyệt vời mà chúng tôi đã chuẩn bị sẵn cho bạn.
              </strong>
            </p>
          </div>
          <Social />
        </section>
      </main>
    </UserLayout>
  );
}

export default LoginUser;
