import { auth } from 'firebase/app';
import { Firebase } from '../types';

export default (firebase: Firebase) => {
  const provider = new auth.GoogleAuthProvider();
  provider.setCustomParameters({
    hd: 'tut.jp',
  });
  firebase.auth().signInWithRedirect(provider);
};
