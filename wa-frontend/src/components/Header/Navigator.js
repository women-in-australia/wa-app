import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Menu, Icon } from 'antd';

import LogOut from './LogOut';
import Notifications from './Notifications';

const Navigator = (props) => {
  const { location, token, userData } = props;
  const { pathname } = location;

  const itemList = useMemo(() => {
    if (userData) {
      let bars = [
        <Menu.Item key='entity'>
          <Link to='/entities'><Icon type='profile' />Entity</Link>
        </Menu.Item>,
        <Menu.Item key='logout' style={{ float: 'right' }}>
          <LogOut />
        </Menu.Item>,
        <Menu.Item key='bell' style={{ float: 'right' }}>
          <Notifications />
        </Menu.Item>,
        <Menu.Item key='name' style={{ float: 'right' }}>
          { userData.name && <>
            <Icon type='user' />{userData.name}
          </> }
        </Menu.Item>
      ];

      if (userData.role !== 'ROLE_manager') {
        return bars;
      } else {
        return bars.concat([
          <Menu.Item key='user'>
            <Link to='/users'><Icon type='team' />User</Link>
          </Menu.Item>,
          <Menu.Item key='application'>
            <Link to='/applications'><Icon type='solution' />Application</Link>
          </Menu.Item>,
        ]);
      }
    } else {
      return [
        <Menu.Item key='login'>
          <Link to='/login'><Icon type='login' />Log In</Link>
        </Menu.Item>,
      ];
    }
  }, [token]);

  const key = useMemo(() => {
    if (pathname.match(/\/entities/i)) return 'entity';
    else if (pathname.match(/\/users/i)) return'user';
    else if (pathname.match(/\/applications/i)) return 'application';
    else if (pathname.match(/\/login/i) || pathname.match(/\/session\/create/i) || pathname === '/') return 'login';
  }, [pathname]);

  return <Menu
    theme='dark'
    mode='horizontal'
    selectedKeys={[key]}
    style={{
      height: 48,
      lineHeight: '48px',
      backgroundColor: '#22075e',
    }}
  >
    {itemList}
  </Menu>;
};

Navigator.propTypes = {
  location: PropTypes.object,
  token: PropTypes.string,
  userData: PropTypes.object,
};

const mapStateToProps = state => {
  const { token, userData } = state.session;
  return { token, userData };
};

export default withRouter(connect(mapStateToProps)(Navigator));