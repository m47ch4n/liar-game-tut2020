import React from 'react';
import { Flex, Text, Icon } from '@chakra-ui/core';
// import { ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ChevronUp } from 'react-feather';
import { Column, Row, useSortBy, useTable } from 'react-table';
import Card from '../Card';
import TopSection from '../Card/CardHeader/index';
import { StyledTable, TableCell, TableHead, TableRow } from './styles';

const ChevronUp = props => <Icon name="chevron-up" {...props} />;
const ChevronDown = props => <Icon name="chevron-down" {...props} />;

interface TableProps<D extends object = {}> {
  data: any;
  pageSize?: number;
  tableHeading?: React.ReactNode;
  columns: Array<Column<D>>;
  onRowClick?: (row: Row<D>) => void;
}

const Table = <D extends {}>({ columns, data, tableHeading, onRowClick }: TableProps<D>) => {
  const tableColumns = React.useMemo(() => columns, [columns]);

  const { getTableProps, headerGroups, prepareRow, rows } = useTable<D>(
    {
      columns: tableColumns,
      data,
    },
    useSortBy,
  );

  return (
    <Card flexDirection="column" flex={1} maxWidth="100%" width="100%">
      {!!tableHeading && <TopSection>{tableHeading}</TopSection>}
      <StyledTable {...getTableProps()}>
        <TableHead>
          {headerGroups.map(headerGroup => (
            <Flex key={headerGroup.id} flex={1} flexDirection="row" {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <TableCell
                  p={4}
                  key={column.id}
                  bg="gray.100"
                  {...column.getHeaderProps()}
                  justifyContent="space-between"
                  {...column.getSortByToggleProps()}
                >
                  <Text fontWeight="bold">{column.render('Header')}</Text>
                  {column.isSorted ? column.isSortedDesc ? <ChevronDown size="24px" /> : <ChevronUp size="24px" /> : ''}
                </TableCell>
              ))}
            </Flex>
          ))}
        </TableHead>
        <Flex flexDirection="column">
          {rows.map(
            (row, key) =>
              // @ts-ignore
              prepareRow(row) || (
                <TableRow
                  onClick={() => onRowClick && onRowClick(row)}
                  key={key}
                  flexDirection="row"
                  {...row.getRowProps()}
                  data-testid="table-row"
                >
                  {row.cells.map(cell => {
                    return (
                      <TableCell key={cell.row.index} justifyContent="flex-start" p={4} {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ),
          )}
        </Flex>
      </StyledTable>
    </Card>
  );
};

export default Table;
