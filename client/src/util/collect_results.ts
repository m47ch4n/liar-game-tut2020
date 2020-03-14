import { Sample, Datum } from '../types';
import { labs, labIndexes } from '../constants';

export default (samples: Sample[]): Datum[] => {
  const initialData: Datum[] = labs.map(lab => ({ id: lab, label: lab, count: 0, value: 0, mean: 0 }));

  const data = samples.reduce((acc, sample) => {
    // 人数を数える
    acc[labIndexes[sample.firstChoice]].count += 1;
    acc[labIndexes[sample.secondChoice]].count += 1;

    // Pieチャートに表示する研究室ごとの値(value)は、「その研究室が第一志望か第二志望に指定されている」サンプル群の成績の総和
    acc[labIndexes[sample.firstChoice]].value += sample.result;
    acc[labIndexes[sample.secondChoice]].value += sample.result;

    return acc;
  }, initialData);

  return calcMeanWithRound(data);
};

export const calcMeanWithRound = (data: Datum[]) =>
  data.map(datum => {
    // 平均を計算する
    const mean = datum.count !== 0 ? datum.value / datum.count : 0;
    return {
      ...datum,
      value: Math.round(datum.value * 100) / 100,
      mean: Math.round(mean * 100) / 100,
    };
  });
