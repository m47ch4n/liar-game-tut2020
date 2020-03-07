import React from 'react';
import styled from 'styled-components';
import { Route, Switch } from 'react-router';

import useAuth from './hooks/use_auth';
import { UserContext } from './hooks/use_user';
import { FirebaseContext } from './firebase';

import Landing from './pages/landing';
import Terms from './pages/terms';
import NotFound from './pages/404';
import Layout from './components/layout';
import { TERMS, LANDING } from './constants/routes';

const StyledApp = styled(App)`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
      'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

function App({ firebase }) {
  const { user, load } = useAuth(firebase);

  return (
    <FirebaseContext.Provider value={firebase}>
      <UserContext.Provider value={{ user, load }}>
        <Layout>
          <Switch>
            <Route exact path={TERMS} component={Terms} />
            <Route exact path={LANDING} component={Landing} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </UserContext.Provider>
    </FirebaseContext.Provider>
  );
}

export default StyledApp;
