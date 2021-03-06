import React from 'react';
import { Box } from '@chakra-ui/core';
import { ResponsivePie } from '@nivo/pie';
import { labs } from '../constants';

const fill = labs.reduce((acc, lab, index) => {
  if (index % 3 === 1) {
    return acc;
  }
  return [...acc, { match: { id: lab }, id: index % 3 === 0 ? 'dots' : 'lines' }];
}, []);

export default ({ data, onPieClick }: { data: any; onPieClick?: (datum: any) => void }) => (
  <Box h={['25vh', '30vh', '50vh']}>
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      colors={{ scheme: 'set3' }}
      borderWidth={1}
      borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
      radialLabelsSkipAngle={10}
      radialLabelsTextXOffset={6}
      radialLabelsTextColor="#333333"
      radialLabelsLinkOffset={0}
      radialLabelsLinkDiagonalLength={16}
      radialLabelsLinkHorizontalLength={24}
      radialLabelsLinkStrokeWidth={1}
      radialLabelsLinkColor={{ from: 'color' }}
      slicesLabelsSkipAngle={10}
      slicesLabelsTextColor="#333333"
      animate={true}
      motionStiffness={90}
      motionDamping={15}
      onClick={datum => onPieClick && onPieClick(datum)}
      defs={[
        {
          id: 'dots',
          type: 'patternDots',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: 'lines',
          type: 'patternLines',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={fill}
    />
  </Box>
);
