import { Link, useNavigate } from 'react-router-dom';
import './Login.scss';

import { useCallback, useEffect, useRef, useState } from 'react';
// import { useDispatch } from 'react-redux';
import { Button, Checkbox, FormControl, FormControlLabel, TextField } from '@mui/material';
import UserLayout from '~/layouts/UserLayout';

function LoginUser() {
  const btnSubmitRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailInput, setEmail] = useState('');
  const [passInput, setPassInput] = useState('');
  const [errClass, setErrClass] = useState(false);
  const [errClassEmail, setErrClassEmail] = useState(false);
  const [errClassPass, SetErrClassPass] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [errMessage, setErrMessage] = useState('');

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
      // const response = await userService.login(emailInput, passInput);
      // Xử lý dữ liệu khi thành công
      let isLoader = setTimeout(() => {
        setIsLoader(false);
        // saveUserLogin(response);
        setErrClass(false);
        clearTimeout(isLoader);
      }, 500);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrClass(true);
        setErrClassEmail(true);
        SetErrClassPass(true);
        setEmail('');
        setPassInput('');
        setErrMessage('Invalid credentials.(Ref: EC4)');
        emailRef.current.focus();
        setIsLoader(false);
      } else {
        // Xử lý các mã lỗi khác
        console.error('Other error:', error);
      }
    }
  };

  return (
    <UserLayout>
      {/* {isLoader && <Loader />} */}
      {/* <nav className='global-nav'>
        <div className='logo-wrapper'>
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
      </nav> */}
      <main className="container page-wrapper">
        <section className="page-content">
          <div className="page-title">
            <h1 className="title">Đăng nhập</h1>
          </div>
          {errClass && (
            <div className="notification-box invalid">
              <div className="notification-box__text">
                <span>{errMessage}</span>
              </div>
            </div>
          )}
          <form>
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

          <div className="register-link">
            Bạn chưa có tài khoản?
            <Link to="/register">Đăng ký ngay</Link>
          </div>
        </section>
      </main>
    </UserLayout>
  );
}

export default LoginUser;
