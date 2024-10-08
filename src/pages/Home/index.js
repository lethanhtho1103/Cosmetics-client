import Box from '@mui/material/Box';
import ImageCarousel from '~/components/ImageCarousel';
import UserLayout from '~/layouts/UserLayout';
import img5 from '~/assets/image/img5.jpg';
import img6 from '~/assets/image/img6.jpg';
import PromotionTabs from '~/components/PromotionTabs';
import { Link } from 'react-router-dom';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import ListCard from '~/components/ListCard';
import ACCUCHEK from '~/assets/image/ACCU-CHEK.jpg';
import Laboratoire from '~/assets/image/Laboratoire.png';
import SIMPLE from '~/assets/image/SIMPLE.jpg';
import SUNPLAY from '~/assets/image/SUNPLAY.png';
import TSUBAKI from '~/assets/image/TSUBAKI.webp';
import cocoon from '~/assets/image/cocoon.jpg';

import './Home.scss';
import promotionService from '~/services/promotionService';
import { useEffect, useState } from 'react';
import productService from '~/services/productService';

function Home() {
  const [promotions, setPromotions] = useState([]);
  const [topSellProducts, setTopSellProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [promotionsRes, topSellingRes] = await Promise.all([
          promotionService.getAllPromotions(),
          productService.getTopSellingProduct(),
        ]);

        const promotionsFilter = promotionsRes.filter((promotion) => promotion.status === 'active');
        setPromotions(promotionsFilter);
        setTopSellProducts(topSellingRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <UserLayout>
      <Box sx={{ width: '100%', display: 'flex' }}>
        <Box sx={{ width: '75%' }}>
          <ImageCarousel />
        </Box>
        <Box sx={{ width: '25%', flexDirection: 'column', marginLeft: '4px' }}>
          <Box
            component="img"
            sx={{
              height: '49.5%',
              display: 'block',
              width: '100%',
              marginBottom: '1%',
            }}
            src={img5}
            alt=""
          />
          <Box
            component="img"
            sx={{
              height: '49.5%',
              display: 'block',
              width: '100%',
            }}
            src={img6}
            alt=""
          />
        </Box>
      </Box>
      {promotions.length > 0 && (
        <Box className="home-flashSale-block">
          <Box className="row-full-width-inner">
            <PromotionTabs promotions={promotions} />
          </Box>
        </Box>
      )}
      <Box className="hot-brands">
        <Box className="row-full-width-inner">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>Thương hiệu nổi bật</h3>
          </Box>
          <Box className="pagebuilder-column-line">
            <Box className="pagebuilder-column">
              <Link to="/">
                <img src={ACCUCHEK} alt=""></img>
              </Link>
            </Box>
            <Box className="pagebuilder-column">
              <Link to="/">
                <img src={TSUBAKI} alt=""></img>
              </Link>
            </Box>
            <Box className="pagebuilder-column">
              <Link to="/">
                <img src={SUNPLAY} alt=""></img>
              </Link>
            </Box>
            <Box className="pagebuilder-column">
              <Link to="/">
                <img src={Laboratoire} alt=""></img>
              </Link>
            </Box>
            <Box className="pagebuilder-column">
              <Link to="/">
                <img src={SIMPLE} alt=""></img>
              </Link>
            </Box>
            <Box className="pagebuilder-column">
              <Link to="/">
                <img src={cocoon} alt=""></img>
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className="best-selling">
        <Box className="row-full-width-inner">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 className="">Sản phẩm bán chạy</h3>
            <Box className="show-all">
              {/* <Link href="#">
                Xem tất cả <KeyboardArrowRight />
              </Link> */}
            </Box>
          </Box>
          <ListCard products={topSellProducts} />
        </Box>
      </Box>
    </UserLayout>
  );
}

export default Home;
