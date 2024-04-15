import React from 'react';

import { ITableHeaderCellProps } from './table.row';

interface ITableContext {
  paginated?: boolean;
  selected?: boolean;
  className?: string;
  data: any[];
  header: ITableHeaderCellProps[];
  pageSize?: number;
  actions?: any;
  filter?: boolean;
}

const TableContext = React.createContext<ITableContext>({
  data: [],
  header: []
});

export const TableProvider = TableContext.Provider;

export const TableConsumer = TableContext.Consumer;

export const useTable = () => {
  return React.useContext<ITableContext>(TableContext);
};
