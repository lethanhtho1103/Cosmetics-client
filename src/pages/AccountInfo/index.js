import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function AccountInfo() {
  const currentUser = useSelector((state) => state.auth.login?.currentUser?.data);
  return (
    <Box>
      <h2>Tài khoản của tôi</h2>
      <Box className="box-info">
        <Box className="box-title">Thông tin cá nhân</Box>
        <Box className="box-content">
          <strong>
            {currentUser?.username} &nbsp;•&nbsp; {currentUser?.phone}
          </strong>
          <div>Email: {currentUser?.email}</div>
        </Box>
        <Box className="box-action">
          <Link to="/">Chỉnh sửa</Link>
        </Box>
      </Box>
    </Box>
  );
}

export default AccountInfo;
