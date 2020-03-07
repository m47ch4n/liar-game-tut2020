import { createContext, useContext } from 'react';

export const UserContext = createContext({
  user: null,
  load: true,
});

export default () => {
  return useContext(UserContext);
};
