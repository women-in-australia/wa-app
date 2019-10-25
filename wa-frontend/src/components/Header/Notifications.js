import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { List, Icon, Switch, Popover } from 'antd';
import moment from 'moment';

import { UserService } from '../../services';
import { READ_NOTIFICATIONS_FAILURE } from '../../redux/actionTypes';

const PAGE_SIZE = 10;

const Notifications = (props) => {
  const { dispatch } = props;

  const [isPending, setIsPending] = useState(true);
  const [list, setList] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, allPageNum: 1 });
  const [receive, setReceive] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const readNotifications = (page = 1, pageSize = PAGE_SIZE) => {
    setIsPending(true);
    UserService.readNotifications({ page, pageSize })
      .then(data => {
        const { page, allPageNum, receive, data: list } = data;
        setList(list);
        setPagination({ page, allPageNum });
        setReceive(receive);
        setIsPending(false);
      })
      .catch(error => {
        dispatch({
          type: READ_NOTIFICATIONS_FAILURE,
          paylaod: { error },
        });
        setIsPending(false);
      });
  };

  const toggleNotifications = enabled => {
    setIsPending(true);
    UserService.toggleNotifications({ enabled })
      .then(() => {
        setReceive(enabled);
        setIsPending(false);
      })
      .catch(error => {
        dispatch({
          type: READ_NOTIFICATIONS_FAILURE,
          paylaod: { error },
        });
        setIsPending(false);
      });
  };

  const onChangeVisible = v => setIsVisible(v);
  const onClick = () => setIsVisible(true);

  const onChanegPage = (page, pageSize) => {
    readNotifications(page, pageSize);
  };

  const onChangeSwitch = checked => {
    if (checked !== receive) toggleNotifications(checked);
  };

  useEffect(() => {
    readNotifications();
  }, []);

  const title = <div>
    Notifications
    <span style={{ float: 'right', fontWeight: 'normal' }}>
      Email me with new notifications &nbsp;
      <Switch
        defaultChecked={receive}
        loading={isPending}
        onChange={onChangeSwitch}
      />
    </span>
  </div>;

  const content = <List
    size='small'
    loading={isPending}
    dataSource={list}
    style={{ width: 480 }}
    pagination={{
      size: 'small',
      current: pagination.page,
      total: PAGE_SIZE * pagination.allPageNum,
      pageSize: PAGE_SIZE,
      onChange: onChanegPage,
    }}
    renderItem={item => (
      <List.Item>
        <List.Item.Meta
          title={<a href={item.link}>{item.content}</a>}
          description={moment(item.time).format('DD/MM/YYYY HH:mm:ss')}
        />
      </List.Item>
    )}
  />;

  return <a onClick={onClick}>
    <Popover
      placement='bottomRight'
      trigger='click'
      visible={isVisible}
      onVisibleChange={onChangeVisible}
      title={title}
      content={content}
    >
      <Icon type='bell' />
      Notifications
    </Popover>
  </a>;
};

Notifications.propTypes = {
  dispatch: PropTypes.func,
};

export default connect()(Notifications);