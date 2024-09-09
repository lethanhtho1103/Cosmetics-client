import React, { useState } from 'react';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import img1 from '~/assets/image/img1.png';
import img2 from '~/assets/image/img2.png';
import img3 from '~/assets/image/img3.webp';
import img4 from '~/assets/image/img4.jpg';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    imgPath: img1,
  },
  {
    imgPath: img2,
  },
  {
    imgPath: img3,
  },
  {
    imgPath: img4,
  },
];

const ImageCarousel = () => {
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ maxWidth: '100%', flexGrow: 1, position: 'relative' }}>
      <AutoPlaySwipeableViews axis={'x'} index={activeStep} onChangeIndex={handleStepChange} enableMouseEvents>
        {images.map((step, index) => (
          <div key={index}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  height: 'auto',
                  display: 'block',
                  width: '100%',
                }}
                src={step.imgPath}
                alt=""
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>

      <Button
        size="small"
        onClick={handleBack}
        disabled={activeStep === 0}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '12px',
          transform: 'translateY(-50%)',
          minWidth: 'auto',
          backgroundColor: 'white',
          color: 'black',
          borderRadius: '50%',
          '&:hover': {
            backgroundColor: 'gray',
          },
        }}
      >
        <KeyboardArrowLeft />
      </Button>

      <Button
        size="small"
        onClick={handleNext}
        disabled={activeStep === maxSteps - 1}
        sx={{
          position: 'absolute',
          top: '50%',
          right: '12px',
          transform: 'translateY(-50%)',
          minWidth: 'auto',
          backgroundColor: 'white',
          color: 'black',
          borderRadius: '50%',
          '&:hover': {
            backgroundColor: 'gray',
          },
        }}
      >
        <KeyboardArrowRight />
      </Button>

      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        sx={{
          backgroundColor: 'transparent',
          justifyContent: 'center',
          position: 'absolute',
          top: '85%',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
        backButton={null}
        nextButton={null}
      />
    </Box>
  );
};

export default ImageCarousel;
