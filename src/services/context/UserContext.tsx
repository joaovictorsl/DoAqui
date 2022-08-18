import React from 'react';
import { User } from '../../models/User';
import { UserContextInterface } from '../../models/UserContextInterface';

export const UserContext = React.createContext<UserContextInterface>({} as unknown as UserContextInterface);

interface Props {
  children: React.ReactNode;
}

export const UserProvider: React.FC<Props> = ({ children }: Props) => {
  let [user, setUser] = React.useState<User>({ account: null, latitude: null, longitude: null });
  let [loaded, setLoaded] = React.useState<boolean>(false);

  return (
    <UserContext.Provider value={{ user, setUser, loaded, setLoaded }}>
      {children}
    </UserContext.Provider>
  )
}
