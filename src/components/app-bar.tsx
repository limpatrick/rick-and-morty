import MuiAppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Zoom from '@material-ui/core/Zoom';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Link } from '@reach/router';
import React from 'react';
import styled from 'styled-components';
import { ID_TOP } from '../constants';

const AppBar = () => {
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 0 });

  return (
    <>
      <MuiAppBar position="fixed" elevation={trigger ? 6 : 4}>
        <Toolbar>
          <Button component={Link} to="/" color="inherit" size="large">
            Rick and Morty
          </Button>
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

const ScrollTop = styled.div`
  position: fixed;
  bottom: 16px;
  right: 16px;
  z-index: 1;
`;
