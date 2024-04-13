import React from 'react';

import { cn } from '@tone/utils';

import { ITableHeaderCellProps, TableDataCell, TableRow } from './row';

interface ITableBodyProps {
  header?: ITableHeaderCellProps[];
  className?: string;
  data: any[];
}

export const TableBody: React.FC<ITableBodyProps> = ({ header, data, className }) => {
  const classes = cn(className);
  return (
    <tbody className={classes}>
      {data.map((item, index) => (
        <TableRow key={item.id || index} index={index}>
          {header &&
            header.map(({ name, keyName, ...rest }) => (
              <TableDataCell
                key={keyName || name}
                name={name}
                keyName={keyName}
                record={item}
                {...rest}
              />
            ))}
        </TableRow>
      ))}
    </tbody>
  );
};
