import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <Box className={styles.wrap} component="footer">
      <Container disableGutters maxWidth={false} sx={{ width: '1320px', padding: '20px 20px 0px' }}>
        <Box className={styles.bor1}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Typography variant="h4" className={styles.title}>
                <Link to="/">Orange</Link>
              </Typography>
              <Typography className={styles.decs}>
                Orange là điểm đến lý tưởng cho những ai yêu thích làm đẹp. Chúng tôi cung cấp các sản phẩm mỹ phẩm
                chính hãng, chất lượng vượt trội và dịch vụ chăm sóc khách hàng tận tâm, giúp bạn có được trải nghiệm
                mua sắm tuyệt vời và luôn xinh đẹp.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant="h5" className={styles.title1}>
                Theo dõi chúng tôi
              </Typography>
              <Box className={styles.social}>
                <IconButton component="a" href="https://www.facebook.com/chiss.thoss?mibextid=ZbWKwL" target="_blank">
                  <FacebookIcon />
                </IconButton>
                <IconButton component="a" href="https://www.instagram.com/_tho1103/" target="_blank">
                  <InstagramIcon />
                </IconButton>
                <IconButton component="a" href="https://www.instagram.com/_tho1103/" target="_blank">
                  <LinkedInIcon />
                </IconButton>
              </Box>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Typography variant="h5" className={styles.title2}>
                Về chúng tôi
              </Typography>
              <Box component="ul" className={styles.list1}>
                <li>
                  <Link to="http://localhost:3000/introduce">Giới thiệu</Link>
                </li>
                <li>
                  <Link to="http://localhost:3000/contact">Liên hệ</Link>
                </li>
                <li>
                  <Link to="http://localhost:3000/policy">Chính sách</Link>
                </li>
              </Box>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant="h5" className={styles.title2}>
                Thông tin liên hệ
              </Typography>
              <Box component="ul" className={styles.list2}>
                <li>
                  <Box className={styles['list2-wrap']}>
                    <Box className={styles['list2-icon']}>
                      <EmailIcon />
                    </Box>
                    <Box>
                      <Typography variant="h6" className={styles.title3}>
                        Email
                      </Typography>
                      <span>thob2014791@student.ctu.edu.vn</span>
                    </Box>
                  </Box>
                </li>
                <li>
                  <Box className={styles['list2-wrap']}>
                    <Box className={styles['list2-icon']}>
                      <PhoneIcon />
                    </Box>
                    <Box>
                      <Typography variant="h6" className={styles.title3}>
                        Điện thoại
                      </Typography>
                      <span>+0972221953</span>
                    </Box>
                  </Box>
                </li>
                <li>
                  <Box className={styles['list2-wrap']}>
                    <Box className={styles['list2-icon']}>
                      <LocationOnIcon />
                    </Box>
                    <Box>
                      <Typography variant="h6" className={styles.title3}>
                        Vị trí
                      </Typography>
                      <span>Orange, đường 3/2, P. Xuân Khánh, Q. Ninh Kiều, TP. Cần Thơ.</span>
                    </Box>
                  </Box>
                </li>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
