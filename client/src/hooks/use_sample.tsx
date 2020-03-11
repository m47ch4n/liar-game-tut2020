import React, { createContext, useContext, useEffect, useState } from 'react';

import { Sample } from '../types';
import useFirebase from './use_firebase';
import useUser from './use_user';

interface SC {
  load: boolean;
  sample: Sample;
  error: Error;
}

const initialSample: Sample = {
  uid: undefined,
  result: undefined,
  firstChoice: undefined,
  secondChoice: undefined,
};

const SampleContext = createContext<SC>({ load: true, sample: initialSample, error: null });

export default (): SC => {
  return useContext(SampleContext);
};

export const SampleContextProvider = ({ uid, children }) => {
  const [state, setState] = useState({ sample: initialSample, load: true, error: null });
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
            setState({ sample: initialSample, load: false, error });
          },
        );
      return () => unsubscribe();
    } else {
      setState({ sample: initialSample, load, error: null });
    }
  }, [uid, firebase, load]);

  return <SampleContext.Provider value={state}>{children}</SampleContext.Provider>;
};
