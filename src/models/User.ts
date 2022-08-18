import { User as FireBaseUser } from "firebase/auth";

export interface User  {
  account: FireBaseUser | null;
  longitude: number | null;
  latitude: number | null;
}