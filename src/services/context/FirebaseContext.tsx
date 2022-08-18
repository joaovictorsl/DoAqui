import React from 'react';
import { DoAquiFirebase } from '../firebase/DoAquiFirebase';

interface FirebaseContextInterface {
  doAquiFirebase: DoAquiFirebase;
}

export const FirebaseContext = React.createContext({} as FirebaseContextInterface);

interface Props {
  children: React.ReactNode;
}

export const FirebaseProvider: React.FC<Props> = ({ children }: Props) => {
  return (
    <FirebaseContext.Provider value={{ doAquiFirebase: new DoAquiFirebase() }}>
      {children}
    </FirebaseContext.Provider>
  )
}
