import { combineReducers } from 'redux-starter-kit';
import { connectRouter, RouterState } from 'connected-react-router';

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
  });

export interface IState {
  router: RouterState;
}

export default createRootReducer;
