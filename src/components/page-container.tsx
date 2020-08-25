import Container from '@material-ui/core/Container';
import React from 'react';
import styled from 'styled-components';
import { ID_TOP } from '../constants';

type Props = { children: React.ReactElement };

const PageContainer = ({ children }: Props) => (
  <StyledContainer id={ID_TOP} maxWidth="md">
    {children}
  </StyledContainer>
);

export default PageContainer;

const StyledContainer = styled(Container)`
  padding-top: 88px;
`;
