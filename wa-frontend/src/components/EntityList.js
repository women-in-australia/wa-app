import React from 'react';
import PropTypes from 'prop-types';
import { Table, Badge } from 'antd';

const PAGE_SIZE = 10;

const renderType = (value) => {
  if (value === 1) return 'Person';
  else if (value === 2) return 'Organization';
  return 'Unknown';
};

const renderStatus = (value, record) => {
  if (record.isDraft) return <Badge status='warning' text='Draft'/>;
  if (value === -1) return <Badge status='error' text='Rejected'/>;
  if (value === 0) return <Badge status='processing' text='Not Reviewed'/>;
  if (value === 1) return <Badge status='processing' text='Approved by Curator'/>;
  if (value === 2) return <Badge status='processing' text='Approved by Curator'/>;
  if (value === 3) return <Badge status='success' text='Published'/>;
  else return <Badge status='default' text='Unknown'/>;
};

const EntityList = (props) => {
  const { isPending, dataSource, pagination, renderOperation, onChange } = props;

  const columns = [
    {
      title: 'Type',
      dataIndex: 'type',
      render: renderType,
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Author',
      dataIndex: 'from.name',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: renderStatus,
      filterMultiple: false,
      filters: [
        { text: 'Rejected', value: '-1' },
        { text: 'Not Reviewed', value: '0' },
        { text: 'Approved by Curator', value: '1' },
        { text: 'Published', value: '3' },
      ],
    },
    {
      title: 'Operation',
      dataIndex: 'eid',
      render: renderOperation,
    }
  ];

  return <div>
    <Table
      rowKey={record => record.eid}
      dataSource={dataSource}
      columns={columns}
      loading={isPending}
      onChange={onChange}
      pagination={{
        current: pagination.page,
        total: PAGE_SIZE * pagination.allPageNum,
        pageSize: PAGE_SIZE,
      }}
    /> 
  </div>;
};

EntityList.propTypes = {
  isPending: PropTypes.bool,
  dataSource: PropTypes.array,
  pagination: PropTypes.object,
  renderOperation: PropTypes.func,
};

export default EntityList;
