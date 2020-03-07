import { firestore } from "firebase";

// tslint:disable-next-line: no-import-side-effect
import "firebase-functions";

export type Config = {
  active: boolean;
  public: boolean;
};

export type Existence = Config & {
  screen_name: string;
};

export type Account = Existence & {
  uid: string;
  id: string;
  name: string;
  icon: string;
  profile: string;
};

export type Token = {
  uid: string;
  id: string;
  access_key: string;
  access_secret: string;
};

export type Location = {
  lat: number;
  lon: number;
  is_ride: boolean;
  route_name: string;
  datetime: Date;
};

export type DB = firestore.Firestore;
export type Query = firestore.Query;
export type DocumentReference = firestore.DocumentReference;
export type QueryDocumentSnapshot = firestore.QueryDocumentSnapshot;
export type DocumentSnapshot = firestore.DocumentSnapshot;
export type QuerySnapshot = firestore.QuerySnapshot;
