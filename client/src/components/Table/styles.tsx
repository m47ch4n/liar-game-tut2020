import { Flex, IconButton } from '@chakra-ui/core';
import styled from '@emotion/styled';
import * as React from 'react';
import { color, ColorProps, justifyContent, JustifyContentProps, space, SpaceProps } from 'styled-system';

export const StyledTable = styled.div<SpaceProps>`
  ${space};
  flex: 1;
  width: 100%;
  display: flex;
  max-width: 100%;
  overflow-x: auto;
  border-radius: 4px;
  flex-direction: column;
  box-sizing: border-box;
`;

export const TableHead = styled.div<SpaceProps>`
  ${space};
  display: flex;
  flex-direction: row;
`;

export const TableCell = styled<'div', SpaceProps & ColorProps & JustifyContentProps>('div')`
  ${space};
  ${color};
  ${justifyContent};
  flex: 1;
  display: flex;
  min-width: 75px;
  align-items: center;
  border-bottom-width: 1px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TableRow = styled(Flex)`
  &:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.01);
  }
`;

type TableIconButtonProps = SpaceProps & {
  icon: any;
  onClick: ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void) | undefined;
  isDisabled: boolean;
  variantColor?: string;
};

export const TableIconButton: React.FC<TableIconButtonProps> = ({
  icon,
  onClick,
  isDisabled,
  children,
  variantColor,
  ...rest
}) => {
  return (
    <IconButton
      size="sm"
      {...rest}
      icon={icon}
      borderWidth={1}
      onClick={onClick}
      variantColor={variantColor}
      isDisabled={isDisabled}
      aria-label="Table Icon button"
    >
      {children}
    </IconButton>
  );
};

TableIconButton.defaultProps = {
  variantColor: 'gray',
};
