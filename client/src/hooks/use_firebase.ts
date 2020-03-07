import { useContext } from 'react';
import { FirebaseContext } from '../firebase';

export default () => {
  return useContext(FirebaseContext);
};
