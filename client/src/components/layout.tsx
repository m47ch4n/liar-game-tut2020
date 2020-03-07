import React, { FC } from 'react';
import styled from 'styled-components';

import NavBar from './nav_bar';

const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding: 1em 5%;
`;

const Main = styled.div`
  min-height: 75vh;
`;

const Layout: FC = ({ children }) => {
  return (
    <div>
      <NavBar />
      <Container>
        <Main>{children}</Main>
      </Container>
    </div>
  );
};

export default Layout;
