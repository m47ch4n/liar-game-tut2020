import { Flex } from '@chakra-ui/core';
import { BoxProps } from '@chakra-ui/core/dist/Box';
import React from 'react';

export type CardProps = BoxProps & {
  onClick?: () => void;
  color?: string;
};

const Card: React.FC<CardProps> = ({ onClick, children, ...rest }) => {
  return (
    <Flex onClick={onClick} {...rest}>
      {children}
    </Flex>
  );
};

Card.defaultProps = {
  bg: 'white',
  width: 'auto',
  rounded: 'md',
  borderWidth: '1px',
  onClick: () => false,
  flexDirection: 'column',
};

export default Card;
