import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import useSamples from '../hooks/use_samples';
import useSample from '../hooks/use_sample';
import { Datum } from '../types';
import { Flex, Box, Text, SimpleGrid, Stat, StatLabel, StatNumber, Divider, Button } from '@chakra-ui/core';
import { LABS } from '../constants/routes';
import { labs } from '../constants';
import collectResultsByLab from '../util/collect_results_by_lab';
import getRank from '../util/get_rank';

interface Info {
  data: Datum[];
  rank: number[];
}

export default ({ id }) => {
  const dispatch = useDispatch();
  const [info, setInfo] = useState<Info>({ data: [], rank: [] });
  const { load, samples } = useSamples();
  const { sample } = useSample();

  useEffect(() => {
    if (!load && samples) {
      setInfo({ data: collectResultsByLab(labs[id], samples), rank: getRank(labs[id], samples, sample) });
    }
  }, [load, samples, sample, id]);

  return (
    <Box p={[2, 4]}>
      <Flex align="center" justify="space-between" wrap="wrap" pb={4}>
        <Text fontSize="2xl">{labs[id]}究室の詳細</Text>

        <Button cursor="pointer" onClick={() => dispatch(push(LABS))}>
          戻る
        </Button>
      </Flex>
      <Text pb={2}>
        このページでは「第一志望の群」、「第二志望の群」、「それらをあわせた群」の各サンプル群に対し、あなたの成績を照らし合わせたときの順位を知ることができます。
        また、それぞれの群の統計情報も表示されます。
      </Text>
      {['第一志望の群', '第二志望の群', 'あわせた群'].map((title, index) => (
        <Box key={index}>
          <Divider mb={4} />
          <Text fontSize="2xl" pb={2}>
            {title}
          </Text>
          <SimpleGrid columns={[1, 2, 4]} spacing={'16px'}>
            <Stat>
              <StatLabel>あなたの順位</StatLabel>
              <StatNumber>{info.rank[index] ? info.rank[index] : 'N/A'}位</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>志望人数</StatLabel>
              <StatNumber>{info.data[index]?.count ? info.data[index].count : 0}人</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>合計成績</StatLabel>
              <StatNumber>{info.data[index]?.value ? Math.round(info.data[index].value * 100) / 100 : 0}点</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>平均成績</StatLabel>
              <StatNumber>{info.data[index]?.mean ? Math.round(info.data[index].mean * 100) / 100 : 0}点</StatNumber>
            </Stat>
          </SimpleGrid>
        </Box>
      ))}
    </Box>
  );
};
