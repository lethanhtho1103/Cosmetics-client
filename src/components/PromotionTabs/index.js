import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import './Tabs.scss';
import Link from '@mui/material/Link';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import ListCard from '../ListCard';
import promotionService from '~/services/promotionService';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <>
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box>{children}</Box>}
      </div>
    </>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
function BasicTabs({ promotions }) {
  const [value, setValue] = React.useState(0);
  const [products, setProducts] = React.useState(0);

  function formatDateRangeFromISO(startDateISO, endDateISO) {
    const format = (isoDate) => {
      const date = new Date(isoDate);
      const day = date.getUTCDate();
      const month = date.getUTCMonth() + 1;
      return `${day}/${month}`;
    };

    return `${format(startDateISO)} - ${format(endDateISO)}`;
  }

  const handleGetAllProductByPromotionId = async (promotionId) => {
    if(promotionId) {
      const res = await promotionService.getAllProductByPromotionId(promotionId);
      setProducts(res);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    // Lấy promotion_id tương ứng với tab được chọn
    const selectedPromotionId = promotions[newValue]?._id;
    if (selectedPromotionId) {
      handleGetAllProductByPromotionId(selectedPromotionId);
    }
  };

  React.useEffect(() => {
    if (promotions && promotions.length > 0) {
      handleGetAllProductByPromotionId(promotions[0]._id);
    }
  }, [promotions]);

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          className="tab-list"
          sx={{ '& .MuiTabs-indicator': { display: 'none' } }}
        >
          {promotions?.map((promotion, index) => (
            <Tab key={promotion._id} label={promotion.name} {...a11yProps(index)} className="tab-item" />
          ))}
        </Tabs>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {
          products ? <h3 className="">{`Chương trình diễn ra từ ${formatDateRangeFromISO(
            products[0]?.promotion_id.start_date,
            products[0]?.promotion_id.end_date,
          )}`}</h3> : <h3>Chưa có sản phẩm khuyến mãi</h3>
        }
          
          { 
            products &&  <Box className="show-all">
            <Link href="#">
              Xem tất cả <KeyboardArrowRight />
            </Link>
          </Box>
          }
        </Box>
      </Box>

      {promotions?.map((promotion, index) => (
        <CustomTabPanel key={promotion._id} value={value} index={index}>
          <ListCard products={products} />
        </CustomTabPanel>
      ))}
    </Box>
  );
}

export default BasicTabs;
