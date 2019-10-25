import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { PageHeader, Button } from 'antd';

import { readUsers } from '../../redux/users/actions';
import UserList from '../../components/UserList';
import Inviter from '../../components/Inviter';

const renderOperation = (value, record) => {
  return <Button type='primary'>
    <Link to={`/applications/${record.uid}`}>View</Link>
  </Button>;
};

const ApplicationList = (props) => {
  const { dispatch, users } = props;

  useEffect(() => {
    dispatch(readUsers({ type: 'unreviewed', page: 1, pageSize: 10 }));
  }, []);

  const onChangePage = (type, page, pageSize) => {
    dispatch(readUsers({ type, page, pageSize }));
  };

  return <div>
    <PageHeader
      title='Review Applications'
      extra={<Inviter />}
    >
      <UserList
        isPending={users.unreviewed.isPending}
        dataSource={users.unreviewed.list}
        pagination={users.unreviewed.pagination}
        onChangePage={(page, pageSize) => onChangePage('unreviewed', page, pageSize)}
        renderOperation={renderOperation}
      />
    </PageHeader>
  </div>;
};

ApplicationList.propTypes = {
  dispatch: PropTypes.func,
  users: PropTypes.object,
};

const mapStateToProps = state => {
  const users = state.users;
  return { users };
};

export default connect(mapStateToProps)(ApplicationList);