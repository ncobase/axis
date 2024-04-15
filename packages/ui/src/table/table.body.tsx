import React from 'react';

import { cn } from '@tone/utils';

import { Checkbox } from '../forms';

import { useTable } from './table.context';
import { TableDataCell, TableRow } from './table.row';

interface ITableBodyProps {
  className?: string;
  data: any[];
}

export const TableBody: React.FC<ITableBodyProps> = ({ className, data }) => {
  const { selected, header } = useTable();

  const classes = cn(className);

  return (
    <tbody className={classes}>
      {data.map((item, index) => (
        <TableRow key={item.id || index} index={index}>
          {selected && (
            <TableDataCell name='chekbox' record={item}>
              <Checkbox className='rounded-sm' />
            </TableDataCell>
          )}
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
