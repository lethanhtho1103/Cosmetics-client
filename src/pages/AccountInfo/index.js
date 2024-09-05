import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

function AccountInfo() {
  return (
    <Box>
      <h2>Tài khoản của tôi</h2>
      <Box className="box-info">
        <Box className="box-title">Thông tin cá nhân</Box>
        <Box className="box-content">
          <strong>Lê Thành Thọ - 0972221953</strong>
          <div>Email: lethanhtho1953@gmail.com</div>
        </Box>
        <Box className="box-action">
          <Link to="/">Chỉnh sửa</Link>
        </Box>
      </Box>
    </Box>
  );
}

export default AccountInfo;
