import * as React from 'react';
import {  StepIconProps, styled } from '@mui/material';
import GradingIcon from '@mui/icons-material/Grading';
import PlaceIcon from '@mui/icons-material/Place';
import PaymentIcon from '@mui/icons-material/Payment';

const CustomisedIconRoot = styled('div')<{
    ownerState: { completed?: boolean; active?: boolean };
  }>(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 40,
    height: 40,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
      backgroundColor: "#365073",
      boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
      backgroundColor: "#365073"
    }),
  }));

  export default function CustomisedStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;
  
    const icons: { [index: string]: React.ReactElement } = {
      1: <GradingIcon />,
      2: <PlaceIcon />,
      3: <PaymentIcon />,
    };
  
    return (
      <CustomisedIconRoot ownerState={{ completed, active }} className={className}>
        {icons[String(props.icon)]}
      </CustomisedIconRoot>
    );
  }