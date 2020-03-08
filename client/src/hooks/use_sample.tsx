import React, { createContext, useContext, useEffect, useState } from 'react';

import { Sample } from '../types';
import useFirebase from './use_firebase';
import useUser from './use_user';

const SampleContext = createContext({ load: true, sample: null as Sample, error: null as Error });

export default () => {
  return useContext(SampleContext);
};

export const SampleContextProvider = ({ uid, children }) => {
  const [state, setState] = useState({ sample: null, load: true, error: null });
  const firebase = useFirebase();
  const { load } = useUser();

  useEffect(() => {
    if (uid) {
      const unsubscribe = firebase
        .firestore()
        .collection('samples')
        .doc(uid)
        .onSnapshot(
          snapshot => {
            const sample = snapshot.data() as Sample;
            setState({ sample, load: false, error: null });
          },
          error => {
            setState({ sample: null, load: false, error });
          },
        );
      return () => unsubscribe();
    } else {
      setState({ sample: null, load, error: null });
    }
  }, [uid, firebase, load]);

  return <SampleContext.Provider value={state}>{children}</SampleContext.Provider>;
};
