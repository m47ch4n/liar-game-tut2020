import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import useSamples from '../hooks/use_samples';
import useSample from '../hooks/use_sample';
import { Lab, Sample, Datum } from '../types';
import { Flex, Box, Text, SimpleGrid, Stat, StatLabel, StatNumber, Divider, Button } from '@chakra-ui/core';
import { LABS } from '../constants/routes';
import { labs } from '../constants';

const collectResults = (lab: Lab, samples: Sample[]): Datum[] => {
  samples = samples.filter(s => s.firstChoice === lab || s.secondChoice === lab);
  let data: Datum[] = [
    { id: lab, label: lab, count: 0, value: 0, mean: 0 },
    { id: lab, label: lab, count: 0, value: 0, mean: 0 },
    { id: lab, label: lab, count: 0, value: 0, mean: 0 },
  ];

  data = samples.reduce((acc, sample) => {
    const choice = sample.firstChoice === lab ? 0 : 1;
    acc[choice].count += 1;
    acc[2].count += 1;
    acc[choice].value += sample.result;
    acc[2].value += sample.result;
    return acc;
  }, data);

  data[2] = {
    ...data[2],
    count: data[0].count + data[1].count,
    value: data[0].value + data[1].value,
  };

  return data.map(datum => ({
    ...datum,
    mean: datum.count !== 0 ? datum.value / datum.count : 0,
  }));
};

const getRank = (lab: Lab, samples: Sample[], sample: Sample): number[] => {
  let samples2 = samples.filter(s => s.firstChoice === lab || s.secondChoice === lab);
  if (samples2.length === 0) {
    return [1, 1, 1];
  }

  const ranks: number[] = [0, 0, 0];
  const rank = (samples, sample) => {
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
      setInfo({ data: collectResults(labs[id], samples), rank: getRank(labs[id], samples, sample) });
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
