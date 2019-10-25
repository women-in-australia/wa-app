import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Icon, message } from 'antd';

import { logOut } from '../../redux/session/actions';

const LogOut = (props) => {
  const { dispatch } = props;

  const onLogOut = () => {
    message.success('Goodbye');
    dispatch(logOut());
  };

  return <a type='link' onClick={onLogOut}>
    <Icon type='logout' />
    Log Out
  </a>;
};

LogOut.propTypes = {
  dispatch: PropTypes.func,
};

export default connect()(LogOut);