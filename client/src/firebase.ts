import { createContext } from 'react';
import { Firebase } from './types';

export const FirebaseContext = createContext<Firebase>(null);
