import { useEffect, useState } from 'react';
import { Firebase, User } from '../types';

export default (firebase: Firebase) => {
  const [state, setState] = useState({ user: null, load: true });

  useEffect(() => {
    if (firebase) {
      const user = firebase.auth().currentUser;
      firebase
        .auth()
        .getRedirectResult()
        .then((_result: any) => {
          // do-something
        });
      setState({ user, load: !user });
    }
  }, [firebase]);

  function onChange(user: User) {
    setState({ user, load: false });
  }

  useEffect(() => {
    if (firebase) {
      const unsubscribe = firebase.auth().onAuthStateChanged(onChange);
      return () => unsubscribe();
    }
  }, [firebase]);

  return state;
};
