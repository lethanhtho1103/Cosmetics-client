import UserLayout from '~/layouts/UserLayout';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CustomBreadcrumbs from '~/components/Breakcrumbs';
import './Introduce.scss';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

import imgIntro1 from '~/assets/image/intro1.jpg';
import imgIntro2 from '~/assets/image/intro2.jpg';

function Introduce() {
  const routes = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Giới thiệu', path: '' },
  ];

  return (
    <UserLayout>
      <Container disableGutters maxWidth={false} className="container">
        <CustomBreadcrumbs routes={routes} />
        <main className="page-main">
          <Box className="introduce">
            <Box className="side-bar">
              <ul className="nav-items">
                <li className="nav-item">
                  <Link to="/introduce" className="active">
                    <strong>Giới thiệu</strong>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/contact">
                    <strong>Liên hệ</strong>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/policy">
                    <strong>Chính sách</strong>
                  </Link>
                </li>
              </ul>
            </Box>
            <Box className="column-main">
              <h2>Orange - Cửa Hàng Sức Khỏe Sắc Đẹp tại Việt Nam</h2>
              <Typography>
                Chiều lòng các tín đồ làm đẹp tại Việt Nam và nhu cầu làm đẹp, chăm sóc sức khỏe của mọi khách hàng
                không phân biệt giới tính, độ tuổi. Orange là một lựa chọn khó có thể bỏ qua cho tất cả mọi người.
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 3 }}>
                <img src={imgIntro1} alt="no-image" />
              </Box>
              <Typography sx={{ mb: 1 }}>
                Orange với tâm huyết sẽ đem đến sản phẩm chất lượng và phù hợp cho mỗi khách hàng. Chúng tôi cam kết:
              </Typography>
              <Typography sx={{ mb: 1 }}>
                - Mang đến cho quý khách hàng những thương hiệu mỹ phẩm nổi tiếng và uy tín trong nước cũng như trên Thế
                Giới.
              </Typography>
              <Typography sx={{ mb: 1 }}>
                - Mỗi thương hiệu mỹ phẩm đều được Orange đánh giá và lựa chọn 1 cách kỹ lưỡng.
              </Typography>
              <Typography sx={{ mb: 1 }}>
                - Cung cấp mỹ phẩm chính hãng của những thương hiệu nổi tiếng trên Thế Giới dành cho tất cả quý khách
                hàng ở nhiều độ tuổi khác nhau.
              </Typography>
              <Typography sx={{ mb: 1 }}>
                - Orange còn là chuyên gia tư vấn cho bạn. Thế Giới mỹ phẩm của chúng tôi sẽ chăm sóc sắc đẹp của bạn.
              </Typography>
              <Typography sx={{ mb: 1 }}>
                - Đội ngũ chuyên gia tư vấn của Orange sẽ chăm sóc sắc đẹp của bạn. Mỗi khách hàng đến với Orange đều
                được tư vấn tận tình, chăm sóc cẩn thận để lựa chọn ĐÚNG nhu cầu, ĐÚNG sản phẩm và ĐÚNG giá.
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 3 }}>
                <img src={imgIntro2} alt="no-image" />
              </Box>
              <Typography sx={{ mb: 1 }}>
                Để nắm bắt xu hướng làm đẹp tại thị trường Việt Nam, shop orange sẽ được chia thành các ngành hàng: mỹ
                phẩm, chăm sóc da, chăm sóc cơ thể và sức khoẻ. Khách hàng cũng có thể dễ dàng tìm kiếm sản phẩm yêu
                thích theo thương hiệu hoặc dựa trên gợi ý từ shop Orange.
              </Typography>
              <Typography sx={{ mb: 1 }}>
                Orange hy vọng sẽ tiếp tục nhận được sự ủng hộ, tin yêu của khách hàng trên con đường chăm sóc sức khỏe
                và sắc đẹp cho người Việt!
              </Typography>
            </Box>
          </Box>
        </main>
      </Container>
    </UserLayout>
  );
}

export default Introduce;
