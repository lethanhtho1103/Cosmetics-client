import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import './Tabs.scss';
import Link from '@mui/material/Link';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import ListCard from '../ListCard';

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

function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
          <Tab label="Mua là có quà" {...a11yProps(0)} className="tab-item" />
          <Tab label="Mua 1 tặng 1" {...a11yProps(1)} className="tab-item" />
          <Tab label="Flash sale" {...a11yProps(2)} className="tab-item" />
        </Tabs>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 className="">Chương trình diễn ra từ 10/10 - 20/11</h3>
          <Box className="show-all">
            <Link href="#">
              Xem tất cả <KeyboardArrowRight />
            </Link>
          </Box>
        </Box>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <ListCard />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
    </Box>
  );
}
export default BasicTabs;
