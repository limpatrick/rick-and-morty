import LinearProgress from '@material-ui/core/LinearProgress';
import React from 'react';
import styled from 'styled-components';

const Loading = () => <StyledLinearProgress />;

export default Loading;

const StyledLinearProgress = styled(LinearProgress)`
  width: 100%;
`;
