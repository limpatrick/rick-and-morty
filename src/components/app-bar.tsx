import MuiAppBar from '@material-ui/core/AppBar';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Zoom from '@material-ui/core/Zoom';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Link } from '@reach/router';
import React from 'react';
import styled from 'styled-components';
import title from '../assets/images/rick-and-morty-title.png';
import logo from '../assets/images/rick-and-morty.png';
import { ID_TOP } from '../constants';

const AppBar = () => {
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 0 });

  return (
    <>
      <StyledAppBar position="fixed" elevation={trigger ? 6 : 4}>
        <Toolbar>
          <IconButton component={Link} to="/" color="inherit" size="small">
            <Logo src={logo} alt="Logo" />
          </IconButton>
          <Grid container item justify="center">
            <Title src={title} alt="Rick and Morty" />
          </Grid>
        </Toolbar>
      </StyledAppBar>
      <Zoom in={trigger}>
        <ScrollTop
          onClick={() => {
            const anchor = document.querySelector(`#${ID_TOP}`);

            if (anchor) anchor.scrollIntoView({ behavior: 'smooth' });
          }}
          role="presentation"
        >
          <Fab color="secondary" size="small">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </Zoom>
    </>
  );
};

export default AppBar;

const StyledAppBar = styled(MuiAppBar)`
  background-color: #fff;
`;

const Logo = styled.img`
  width: 50px;
`;

const Title = styled.img`
  width: 195px;
`;

const ScrollTop = styled.div`
  position: fixed;
  bottom: 16px;
  right: 16px;
  z-index: 1;
`;
