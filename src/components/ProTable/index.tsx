import React, { FC, useMemo } from 'react';
import { Table } from 'antd';
import { TableProps } from 'antd/es/table';

type AlignType = 'left' | 'center' | 'right';

interface ProTableProps<RecordType> extends TableProps<RecordType> {
  align?: AlignType;
}

const ProTable: FC<ProTableProps<any>> = ({ align, ...restProps }) => {
  const columns = useMemo(() => {
    if (Array.isArray(restProps.columns)) {
      return restProps.columns.map(column => ({
        align,
        ...column,
      }));
    }
    return [];
  }, [align, restProps.columns]);

  return <Table {...restProps} columns={columns} />;
};

export default ProTable;
