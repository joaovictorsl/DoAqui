import { User } from "./User";

export interface UserContextInterface {
  user: User,
  setUser: React.Dispatch<React.SetStateAction<User>>,
  loaded: boolean,
  setLoaded: React.Dispatch<React.SetStateAction<boolean>>,
}