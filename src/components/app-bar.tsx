import MuiAppBar from '@material-ui/core/AppBar';
import Fab from '@material-ui/core/Fab';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Zoom from '@material-ui/core/Zoom';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import React from 'react';
import styled from 'styled-components';
import { ID_TOP } from '../constants';

const AppBar = () => {
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 0 });

  return (
    <>
      <MuiAppBar position="fixed" elevation={trigger ? 6 : 4}>
        <Toolbar>
          <Title variant="h6" noWrap>
            Rick and Morty
          </Title>
        </Toolbar>
      </MuiAppBar>
      <Zoom in={trigger}>
        <ScrollTop
          onClick={() => {
            const anchor = document.querySelector(`#${ID_TOP}`);

            if (anchor) anchor.scrollIntoView({ behavior: 'smooth' });
          }}
          role="presentation"
        >
          <Fab color="primary" size="small">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </Zoom>
    </>
  );
};

export default AppBar;

const Title = styled(Typography)`
  flex-grow: 1;
`;

const ScrollTop = styled.div`
  position: fixed;
  bottom: 16px;
  right: 16px;
  z-index: 1;
`;
