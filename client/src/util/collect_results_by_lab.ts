import { Lab, Sample, Datum } from '../types';
import { calcMeanWithRound } from './collect_results';

export default (lab: Lab, samples: Sample[]): Datum[] => {
  samples = samples.filter(s => s.firstChoice === lab || s.secondChoice === lab);
  let data: Datum[] = [
    { id: lab, label: lab, count: 0, value: 0, mean: 0 },
    { id: lab, label: lab, count: 0, value: 0, mean: 0 },
    { id: lab, label: lab, count: 0, value: 0, mean: 0 },
  ];

  data = samples.reduce((acc, sample) => {
    const choice = sample.firstChoice === lab ? 0 : 1;
    acc[choice].count += 1;
    acc[choice].value += sample.result;
    return acc;
  }, data);

  data[2] = {
    ...data[2],
    count: data[0].count + data[1].count,
    value: data[0].value + data[1].value,
  };

  return calcMeanWithRound(data);
};
