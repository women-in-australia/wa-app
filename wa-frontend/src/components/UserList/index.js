import React from 'react';
import PropTypes from 'prop-types';
import { Table, Tag, Badge } from 'antd';

import { roleToString } from '../../utils';

const PAGE_SIZE = 10;

const renderRole = (value) => {
  return <Tag>{roleToString(value)}</Tag>;
};

const renderStatus = (status) => {
  if (status === -1) return <Badge status='error' text='Rejected' />;
  else if (status === 0) return <Badge status='default' text='Not Reviewed' />;
  else if (status === 1) return <Badge status='processing' text='Active' />;
};


const UserList = (props) => {
  const { isPending, dataSource, pagination, onChangePage, renderOperation } = props;

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      render: renderRole,
    },
    {
      title: 'Status',
      dataIndex: 'enabled',
      render: renderStatus,
      
    },
    {
      title: 'Invited by',
      dataIndex: 'invited',
    },
    {
      title: 'Operation',
      dataIndex: 'uid',
      render: renderOperation,
    },
  ];

  return <div>
    <Table
      rowKey={record => record.uid}
      dataSource={dataSource}
      columns={columns}
      loading={isPending}
      pagination={{
        current: pagination.page,
        total: PAGE_SIZE * pagination.allPageNum,
        pageSize: PAGE_SIZE,
        onChange: onChangePage,
      }}
    /> 
  </div>;
};

UserList.propTypes = {
  isPending: PropTypes.bool,
  dataSource: PropTypes.array,
  pagination: PropTypes.object,
  onChangePage: PropTypes.func,
  renderOperation: PropTypes.func,
};

export default UserList;
