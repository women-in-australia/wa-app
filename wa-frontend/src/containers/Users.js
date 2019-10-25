import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { PageHeader, Button } from 'antd';
import { Link } from 'react-router-dom';

import { readUsers } from '../redux/users/actions';
import UserList from '../components/UserList';
import Inviter from '../components/Inviter';

const renderOperation = (value, record) => {
  return <Button type='primary'>
    <Link to={`/users/${record.uid}`}>View</Link>
  </Button>;
};

const Users = (props) => {
  const { dispatch, users } = props;

  useEffect(() => {
    dispatch(readUsers({ type: 'all', page: 1, pageSize: 10 }));
  }, []);

  const onChangePage = (type, page, pageSize) => {
    dispatch(readUsers({ type, page, pageSize }));
  };

  return <PageHeader
    title='All Users'
    extra={<Inviter />}
  >
    <UserList
      isPending={users.all.isPending}
      dataSource={users.all.list}
      pagination={users.all.pagination}
      onChangePage={(page, pageSize) => onChangePage('all', page, pageSize)}
      renderOperation={renderOperation}
    />
  </PageHeader>;
};

Users.propTypes = {
  dispatch: PropTypes.func,
  users: PropTypes.object,
};

const mapStateToProps = state => {
  const users = state.users;
  return { users };
};

export default connect(mapStateToProps)(Users);