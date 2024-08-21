import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios, { baseUrl } from '~/axios';

import './Social.scss';

function Social({ isRegister }) {
  const [tokenProcessed, setTokenProcessed] = useState(false);
  const handleFacebookLogin = async () => {
    try {
      const response = await axios.get('/auth/facebook');
      window.location.href = response.data.redirectUrl;
    } catch (error) {
      console.error('Error during Facebook login:', error);
    }
  };

  const handleFacebookCallback = async (code) => {
    try {
      await axios.get(`/auth/facebook/callback?code=${code}`);
      window.location.href = '/';
    } catch (error) {
      console.error('Error during Facebook callback:', error);
      window.location.href = '/login';
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code && !tokenProcessed) {
      handleFacebookCallback(code);
      setTokenProcessed(true);
    }
  }, [tokenProcessed]);
  return (
    <div className="social-login">
      <div className="label">Hoặc đăng {isRegister ? 'ký' : 'nhập'} bằng</div>
      <div className="social">
        <div className="google">
          <Link to={`${baseUrl}/auth/google`}>
            <GoogleIcon />
            <span>Google</span>
          </Link>
        </div>

        <div className="facebook" onClick={handleFacebookLogin}>
          <Link to={`${baseUrl}/auth/facebook`}>
            <FacebookIcon />
            <span>Facebook</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Social;
