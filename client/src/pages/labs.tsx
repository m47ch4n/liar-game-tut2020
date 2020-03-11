import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import useSamples, { SamplesContextProvider } from '../hooks/use_samples';
import { Sample, Datum } from '../types';
import { Switch, Route, Redirect } from 'react-router';
import { Box, Text } from '@chakra-ui/core';
import { LABS, NOTFOUND } from '../constants/routes';
import { labs, labIndexes, columns } from '../constants';
import LabsChart from '../components/labs_pie';
import Table from '../components/Table';
import Lab from './lab';

const collectResults = (samples: Sample[]): Datum[] => {
  const initialData: Datum[] = labs.map(lab => ({ id: lab, label: lab, count: 0, value: 0, mean: 0 }));

  return samples
    .reduce((acc, sample) => {
      // 人数を数える
      acc[labIndexes[sample.firstChoice]].count += 1;
      acc[labIndexes[sample.secondChoice]].count += 1;

      // Pieチャートに表示する研究室ごとの値(value)は、「その研究室が第一志望か第二志望に指定されている」サンプル群の成績の総和
      acc[labIndexes[sample.firstChoice]].value += sample.result;
      acc[labIndexes[sample.secondChoice]].value += sample.result;

      return acc;
    }, initialData)
    .map(datum => ({
      // 平均を計算する
      ...datum,
      mean: datum.count !== 0 ? datum.value / datum.count : 0,
    }));
};

const Labs = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState<Datum[]>([]);
  const { load, samples } = useSamples();

  useEffect(() => {
    if (!load && samples) {
      setData(collectResults(samples));
    }
  }, [load, samples]);

  return (
    <Box p={[2, 4]}>
      <Text fontSize="2xl" pb={2}>
        みんなの研究室志望状況
      </Text>
      <Text pb={2}>
        このPieチャートは、志望者の成績がどの程度研究室に集まっているかを説明しています。
        各研究室の値は、志望する人数が多かったり、志望者たちの成績が良かったりするほど高くなります。
        つまり、値の高い研究室は競争が激しく入りづらいということになります。
      </Text>
      <LabsChart data={data} onPieClick={({ label }) => dispatch(push(`${LABS}/${labIndexes[label]}`))} />
      <Table columns={columns} data={data} onRowClick={({ index }) => dispatch(push(`${LABS}/${index}`))} />
    </Box>
  );
};

export default () => {
  return (
    <SamplesContextProvider>
      <Switch>
        <Route exact path={LABS}>
          <Labs />
        </Route>
        <Route
          path={`${LABS}/:labId`}
          render={({
            match: {
              params: { labId },
            },
          }) => {
            const id = parseInt(labId, 10);
            if (0 <= id && id < labs.length) {
              return <Lab id={id} />;
            } else {
              return <Redirect to={NOTFOUND} />;
            }
          }}
        />
      </Switch>
    </SamplesContextProvider>
  );
};
