import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { replace } from 'connected-react-router';

import useUser from './use_user';
import isBrowser from '../is_browser';
import { LANDING } from '../constants/routes';

export default () => {
  const { load, user } = useUser();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!load && !user && isBrowser()) {
      dispatch(replace(LANDING));
    }
  }, [user, dispatch, load]);
};
