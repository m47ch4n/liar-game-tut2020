import { Flex } from '@chakra-ui/core';
import { FlexProps } from '@chakra-ui/core/dist/Flex';
import * as React from 'react';

type CardFooterProps = FlexProps;

const CardFooter: React.FC<CardFooterProps> = ({ children, ...rest }) => {
  return (
    <Flex borderTopWidth="1px" overflowX="hidden" overflowY="hidden" {...rest}>
      {children}
    </Flex>
  );
};

export default CardFooter;

CardFooter.defaultProps = {
  p: 4,
  bg: 'white',
  roundedBottomLeft: 4,
  roundedBottomRight: 4,
  flexDirection: 'column',
};
