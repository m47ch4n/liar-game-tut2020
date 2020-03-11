import React, { useState, useEffect } from 'react';
import LabsChart from '../components/labs_pie';
import { Box, Text } from '@chakra-ui/core';

import useSamples, { SamplesContextProvider } from '../hooks/use_samples';
import { Lab, Sample, Datum } from '../types';
import { labs } from '../constants';

const collectResults = (samples: Sample[]): Datum[] => {
  const initialData: Datum[] = labs.map(lab => ({ id: lab, label: lab, value: 0 }));
  const indexes: { [key in Lab]?: number } = labs.reduce((acc, lab, index) => {
    acc[lab] = index;
    return acc;
  }, {});

  // Pieチャートに表示する研究室ごとの値(value)は、「その研究室が第一志望か第二志望に指定されている」サンプル群の成績の総和
  return samples.reduce((acc, sample) => {
    acc[indexes[sample.firstChoice]].value += sample.result;
    acc[indexes[sample.secondChoice]].value += sample.result;
    return acc;
  }, initialData);
};

const Labs = () => {
  const [data, setData] = useState<Datum[]>([]);
  const { load, samples } = useSamples();

  useEffect(() => {
    if (!load && samples) {
      setData(collectResults(samples));
    }
  }, [load, samples]);

  return (
    <Box p={4}>
      <Text fontSize="2xl" pb={2}>
        みんなの研究室志望状況
      </Text>
      <Text pb={2}>
        このPieチャートは、志望者の成績がどの程度研究室に集まっているかを説明しています。
        各研究室の値は、志望する人数が多かったり、志望者たちの成績が良かったりするほど高くなります。
        つまり、値の高い研究室は競争が激しく入りづらいということになります。
      </Text>
      <LabsChart data={data} />
    </Box>
  );
};

export default () => {
  return (
    <SamplesContextProvider>
      <Labs />
    </SamplesContextProvider>
  );
};
