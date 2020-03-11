import firebase from 'firebase/app';

export type Firebase = firebase.app.App;
export type User = firebase.User;

export type Grade = 'S' | 'A' | 'B' | 'C' | 'D';
export type Lab =
  | '石田研'
  | '藤戸研'
  | '鈴木研'
  | '河合研'
  | '栗田研'
  | '後藤研'
  | '佐藤研'
  | '青野研'
  | '梅村研'
  | '北岡研'
  | '秋葉研'
  | '渡辺研'
  | '土屋研'
  | '中内研'
  | '北崎研'
  | '福村研'
  | '村越研'
  | '南研'
  | '鯉田研'
  | '松井研'
  | '岡田研'
  | '三浦研'
  | '栗山研'
  | '金澤研'
  | '菅谷研'
  | '大村研'
  | '大島研';

export interface Sample {
  result: number;
  firstChoice: Lab;
  secondChoice: Lab;
  uid: string;
}

export interface Datum {
  id: Lab;
  label: Lab;
  value: number;
}

export interface GpaFormData {
  english1: Grade;
  english2: Grade;
  algorithm: Grade;
  probability: Grade;
  formal_lang: Grade;
  discrete_math: Grade;
  software1: Grade;
  software2: Grade;
  software3: Grade;
  network: Grade;
  experiment: Grade;
  course: Grade;
  choise1: Grade;
  choise2: Grade;
}

export interface LabFormData {
  firstChoice: Lab;
  secondChoice: Lab;
}
