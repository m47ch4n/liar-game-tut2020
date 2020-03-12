import React, { createContext, useContext, useEffect, useState } from 'react';

import { Sample } from '../types';
import useFirebase from './use_firebase';
import useUser from './use_user';

interface SC {
  load: boolean;
  samples: Sample[];
  error: Error;
}

const initialSamples: Sample[] = [];

const SamplesContext = createContext<SC>({ load: true, samples: initialSamples, error: null });

export default (): SC => {
  return useContext(SamplesContext);
};

export const SamplesContextProvider = ({ children }) => {
  const [state, setState] = useState({ samples: initialSamples, load: true, error: null });
  const firebase = useFirebase();
  const { load } = useUser();

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('samples')
      .onSnapshot(
        snapshot => {
          const samples = snapshot.docs
            .map(doc => doc.data() as Sample)
            .filter(sample => {
              return sample.result && sample.firstChoice && sample.secondChoice;
            });
          setState({ samples, load: false, error: null });
        },
        error => {
          setState({ samples: initialSamples, load: false, error });
        },
      );
    return () => unsubscribe();
  }, [firebase, load]);

  return <SamplesContext.Provider value={state}>{children}</SamplesContext.Provider>;
};
