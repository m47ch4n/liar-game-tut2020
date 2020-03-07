import { configureStore } from 'redux-starter-kit';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { createLogger } from 'redux-logger';

import createRootReducer from './create_root_reducer';

export const history = createBrowserHistory();

let middleware = [routerMiddleware(history)];
if (process.env.NODE_ENV !== 'production') {
  middleware = [...middleware, createLogger({ collapsed: true, diff: true })];
}

const store = configureStore({
  reducer: createRootReducer(history),
  middleware,
});

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./create_root_reducer', () => {
    const newCreateRootReducer = require('./create_root_reducer').default;
    store.replaceReducer(newCreateRootReducer(history));
  });
}

export type AppDispatch = typeof store.dispatch;

export default store;
