import { Flex } from '@chakra-ui/core';
import { FlexProps } from '@chakra-ui/core/dist/Flex';
import * as React from 'react';

type CardHeaderProps = FlexProps;

const CardHeader: React.FC<CardHeaderProps> = ({ children, ...rest }) => {
  return (
    <Flex borderBottomWidth="1px" {...rest}>
      {children}
    </Flex>
  );
};

export default CardHeader;

CardHeader.defaultProps = {
  p: 4,
  roundedTopLeft: 4,
  roundedTopRight: 4,
  flexDirection: 'column',
};
