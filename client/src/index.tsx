import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import * as serviceWorker from './serviceWorker';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/functions';

import store, { history } from './store';
import { theme, ThemeProvider, CSSReset } from '@chakra-ui/core';

const breakpoints: any = ['360px', '768px', '1024px', '1440px'];
breakpoints.sm = breakpoints[0];
breakpoints.md = breakpoints[1];
breakpoints.lg = breakpoints[2];
breakpoints.xl = breakpoints[3];

const customTheme = {
  ...theme,
  breakpoints,
};

const config = {
  apiKey: 'AIzaSyAa-cuCZlVBMz3w1DySR-U2iUsp45KPNjE',
  authDomain: 'liar-game-tut2020.firebaseapp.com',
  databaseURL: 'https://liar-game-tut2020.firebaseio.com',
  projectId: 'liar-game-tut2020',
  storageBucket: 'liar-game-tut2020.appspot.com',
  messagingSenderId: '636089546103',
  appId: '1:636089546103:web:df2cf21d0aba8e38d99d72',
};

const fireApp = firebase.initializeApp(config);

const render = () => {
  const App = require('./App').default;

  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ThemeProvider theme={customTheme}>
          <CSSReset />
          <App firebase={fireApp} />
        </ThemeProvider>
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root'),
  );
};

render();

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./App', render);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
