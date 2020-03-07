import firebase from 'firebase/app';

export type Firebase = firebase.app.App;
export type User = firebase.User;

export type Grade = 'S' | 'A' | 'B' | 'C' | 'D'
export type Lab = '石田研' | '藤戸研' | '鈴木研' | '河合研' | '栗田研' |
  '後藤研' | '佐藤研' | '青野研' | '梅村研' | '北岡研' | '秋葉研' | '渡辺研' |
  '土屋研' | '中内研' | '北崎研' | '福村研' | '村越研' | '南研' | '鯉田研' |
  '松井研' | '岡田研' | '三浦研' | '栗山研' | '金澤研' | '菅谷研' | '大村研' | '大島研'
export type Sample = {
  gpa: number,
  firstChoice: Lab,
  secondChoice: Lab
  uid: string
}
