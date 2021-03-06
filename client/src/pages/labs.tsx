import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import useSamples, { SamplesContextProvider } from '../hooks/use_samples';
import useSample from '../hooks/use_sample';
import { Datum } from '../types';
import { Switch, Route, Redirect } from 'react-router';
import { Box, Text, SimpleGrid, Stat, StatLabel, StatNumber, Divider } from '@chakra-ui/core';
import { LABS, NOTFOUND } from '../constants/routes';
import { labs, labIndexes, columns } from '../constants';
import LabsChart from '../components/labs_pie';
import Table from '../components/Table';
import Lab from './lab';
import collectResults from '../util/collect_results';

const Labs = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState<Datum[]>([]);
  const { load, samples } = useSamples();
  const { sample } = useSample();

  useEffect(() => {
    if (!load && samples) {
      setData(collectResults(samples));
    }
  }, [load, samples]);

  return (
    <Box p={[2, 4]}>
      <Text fontSize="2xl" pb={2}>
        あなたの情報
      </Text>
      <SimpleGrid columns={[1, 3]} spacing={4}>
        <Stat>
          <StatLabel>成績</StatLabel>
          <StatNumber>{sample.result}点</StatNumber>
        </Stat>
        <Stat cursor="pointer" onClick={() => dispatch(push(`${LABS}/${labIndexes[sample.firstChoice]}`))}>
          <StatLabel>第一志望</StatLabel>
          <StatNumber>{sample.firstChoice}</StatNumber>
        </Stat>
        <Stat cursor="pointer" onClick={() => dispatch(push(`${LABS}/${labIndexes[sample.secondChoice]}`))}>
          <StatLabel>第二志望</StatLabel>
          <StatNumber>{sample.secondChoice}</StatNumber>
        </Stat>
      </SimpleGrid>
      <Divider mb={8} />
      <Text fontSize="2xl" pb={2}>
        みんなの研究室志望状況
      </Text>
      <Text pb={2}>
        この円グラフは、志望者の成績がどの程度研究室に集まっているかを示しています。
        値の高い研究室は競争が激しい傾向があります。研究室をクリックすると詳細ページに移動します。
      </Text>
      <LabsChart data={data} onPieClick={({ label }) => dispatch(push(`${LABS}/${labIndexes[label]}`))} />
      <Text pb={2}>
        研究室の一覧です。 行をクリックすると研究室の詳細ページに移動します。
        また、それぞれのカラム名をクリックしてソートすることができます。
      </Text>
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
