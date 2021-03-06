import { Lab } from '../types';

export const subjects = [
  { name: 'english1', label: '英語1', credit: 1 },
  { name: 'english2', label: '英語2', credit: 1 },
  { name: '-', label: '', credit: 0 },
  { name: 'algorithm', label: 'アルゴリズムとデータ構造', credit: 2 },
  { name: 'probability', label: '確率・統計論', credit: 2 },
  { name: 'formal_lang', label: '形式言語論', credit: 2 },
  { name: 'discrete_math', label: '離散数学論', credit: 2 },
  { name: 'software1', label: 'ソフトウェア演習Ⅰ', credit: 1 },
  { name: 'software2', label: 'ソフトウェア演習Ⅱ', credit: 1 },
  { name: 'software3', label: 'ソフトウェア演習Ⅲ', credit: 1 },
  { name: 'network', label: '情報ネットワーク', credit: 2 },
  { name: 'experiment', label: '情報・知能工学実験', credit: 4 },
  { name: 'dummy', label: '', credit: 0 },
  { name: '-', label: '', credit: 0 },
  { name: 'course', label: 'コース選択科目', credit: 2 },
  { name: 'dummy', label: '', credit: 0 },
  { name: '-', label: '', credit: 0 },
  { name: 'choise1', label: '選択科目1', credit: 2 },
  { name: 'choise2', label: '選択科目2', credit: 2 },
];

export const points = {
  S: 95,
  A: 85,
  B: 75,
  C: 65,
  D: 50,
};

export const labs: Lab[] = [
  '石田研',
  '藤戸研',
  '鈴木研',
  '河合研',
  '栗田研',
  '後藤研',
  '佐藤研',
  '青野研',
  '梅村研',
  '北岡研',
  '秋葉研',
  '渡辺研',
  '土屋研',
  '中内研',
  '北崎研',
  '福村研',
  '村越研',
  '南研',
  '鯉田研',
  '松井研',
  '岡田研',
  '三浦研',
  '栗山研',
  '金澤研',
  '菅谷研',
  '大村研',
  '大島研',
];

export const labIndexes: { [key in Lab]?: number } = labs.reduce((acc, lab, index) => {
  acc[lab] = index;
  return acc;
}, {});

export const columns = [
  {
    Header: '名前',
    accessor: 'label',
  },
  {
    Header: '人数',
    accessor: 'count',
  },
  {
    Header: '合計成績',
    accessor: 'value',
  },
  {
    Header: '平均成績',
    accessor: 'mean',
  },
];
