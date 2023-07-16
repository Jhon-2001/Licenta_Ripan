import reducers from './Reducers';
import { useReducer, useEffect, createContext } from 'react';
// import { getData } from '../utils/fetchData';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const initialState = { notify: {}, setfreq: [], setsoffreq: [], setarmonici:[]};;
  const [state, dispatch] = useReducer(reducers, initialState);
  

  return (
    <DataContext.Provider value={{state, dispatch}}>
      {children}
    </DataContext.Provider>
  );
};
