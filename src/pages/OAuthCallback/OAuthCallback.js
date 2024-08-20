import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { loginSuccess } from '~/redux/authSlice';
import { useDispatch } from 'react-redux';

const OAuthCallback = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useParams();

  const fetchUserInfo = async (token) => {
    try {
      const response = await axios.get('http://localhost:8000/api/user', {
        headers: {
          Authorization: token,
        },
      });
      return response;
    } catch (error) {
      console.error('Error fetching user info:', error.message);
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          const res = await fetchUserInfo(token);
          console.log('res', res);
          dispatch(loginSuccess(res));
          toast.success('Đăng nhập thành công!');
          navigate('/');
        } else {
          toast.error('Không tìm thấy token trong URL!');
          navigate('/login');
        }
      } catch (error) {
        toast.error('Đăng nhập thất bại! Vui lòng thử lại sau.');
        navigate('/login');
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, navigate]);

  return <div>Processing...</div>;
};

export default OAuthCallback;
