import { Lab, Sample } from '../types';

export default (lab: Lab, samples: Sample[], sample: Sample): number[] => {
  let samples2 = samples.filter(s => s.firstChoice === lab || s.secondChoice === lab);
  if (samples2.length === 0) {
    return [1, 1, 1];
  }

  const ranks: number[] = [0, 0, 0];
  // tslint:disable-next-line: no-shadowed-variable
  const rank = (samples: Sample[], sample: Sample) => {
    const worstRank = samples.sort((a, b) => a.result - b.result).findIndex(sample2 => sample2.result > sample.result);
    if (worstRank === -1) {
      return 1;
    } else {
      return samples.length - worstRank + 1;
    }
  };
  ranks[2] = rank(samples2, sample);
  samples2 = samples.filter(s => s.firstChoice === lab);
  ranks[0] = rank(samples2, sample);
  samples2 = samples.filter(s => s.secondChoice === lab);
  ranks[1] = rank(samples2, sample);
  return ranks;
};
