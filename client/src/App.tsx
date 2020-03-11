import React from 'react';
import styled from 'styled-components';
import { Route, Switch, Redirect } from 'react-router';

import useAuth from './hooks/use_auth';
import useUser, { UserContext } from './hooks/use_user';
import { FirebaseContext } from './firebase';
import useSample, { SampleContextProvider } from './hooks/use_sample';

import Start from './pages/start';
import GpaForm from './pages/gpa_form';
import LabForm from './pages/lab_form';
import Labs from './pages/labs';
import Terms from './pages/terms';
import NotFound from './pages/404';
import Layout from './components/layout';
import Loading from './components/loading';
import { TERMS, ROOT, GPA_FORM, LAB_FORM, LABS } from './constants/routes';

function App({ firebase }) {
  const { user, load } = useAuth(firebase);
  const uid = user ? user.uid : null;

  return (
    <FirebaseContext.Provider value={firebase}>
      <UserContext.Provider value={{ user, load }}>
        <SampleContextProvider uid={uid}>
          <Layout>
            <Switch>
              <Route exact path={TERMS} component={Terms} />
              <SignedInRoute exact path={GPA_FORM}>
                <GpaForm />
              </SignedInRoute>
              <SignedInRoute exact path={LAB_FORM}>
                <LabForm />
              </SignedInRoute>
              <FilledRoute path={LABS}>
                <Labs />
              </FilledRoute>
              <SignedOutRoute exact path={ROOT}>
                <Start />
              </SignedOutRoute>
              <Route component={NotFound} />
            </Switch>
          </Layout>
        </SampleContextProvider>
      </UserContext.Provider>
    </FirebaseContext.Provider>
  );
}

const StyledApp = styled(App)`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
      'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

export default StyledApp;

function Loadded({ children }) {
  const { load: loadingUser } = useUser();
  const { load: loadingSample } = useSample();

  return loadingUser || loadingSample ? <Loading /> : children;
}

function SignedIn({ children }) {
  const { user } = useUser();
  return user ? children : <Redirect to={ROOT} />;
}

function SignedOut({ children }) {
  const { user } = useUser();
  return !user ? children : <Redirect to={LABS} />;
}

// サインインしていなければROOTにリダイレクト
function SignedInRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={() => (
        <Loadded>
          <SignedIn>{children}</SignedIn>
        </Loadded>
      )}
    />
  );
}

// サインインしていればLABSにリダイレクト
function SignedOutRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={() => (
        <Loadded>
          <SignedOut>{children}</SignedOut>
        </Loadded>
      )}
    />
  );
}

function Filled({ children }) {
  const { sample } = useSample();
  if (!sample || (sample && !sample.result)) {
    return <Redirect to={GPA_FORM} />;
  }

  if (sample && (!sample.firstChoice || !sample.secondChoice)) {
    return <Redirect to={LAB_FORM} />;
  }
  return children;
}

// GPA、志望研究室が入力されていなければぞれぞれのフォームにリダイレクト
function FilledRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={() => (
        <Loadded>
          <SignedIn>
            <Filled>{children}</Filled>
          </SignedIn>
        </Loadded>
      )}
    />
  );
}
