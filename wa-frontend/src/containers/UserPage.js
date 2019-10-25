import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { PageHeader, Spin, Descriptions, Tag, Badge, Select, Switch } from 'antd';

import { UPDATE_USER_FAILURE } from '../redux/actionTypes';
import { UserService } from '../services';
import { readUserFailure } from '../redux/currentUser/actions';
import { roleToString, capitalize } from '../utils';
import EditableField from '../components/EditableField';
import history from '../history';
 
const renderStatus = (status) => {
  if (status === -1) return <Badge status='error' text='Rejected' />;
  else if (status === 0) return <Badge status='default' text='Not Reviewed' />;
  else if (status === 1) return <Badge status='processing' text='Active' />;
};

const UserPage = (props) => {
  const { dispatch, match } = props;
  const uid = Number(match.params.uid);

  const [isPending, setIsPending] = useState(true);
  const [sourceData, setSourceData] = useState({});
  const [roleId, setRoleId] = useState(0);
  const [isActive, setIsActive] = useState(true);

  const user = sourceData.data || {
    name: '',
    role: { rid: 0, roleName: '' },
    enabled: 0,
    email: '',
    invited: '',
    address: '',
    motivation: '',
    experience: '',
  };

  const readUser = (uid) => {
    setIsPending(true);
    return UserService.read({ uid })
      .then(data => {
        setIsPending(false);
        setSourceData(data);
      })
      .catch(error => {
        setIsPending(false);
        dispatch(readUserFailure(error));
      });
  };

  const changeRole = (_uid, _rid) => {
    setIsPending(true);
    return UserService.changeRole({ uid: _uid, rid: _rid })
      .then(() => readUser(uid))
      .catch(error => dispatch({
        type: UPDATE_USER_FAILURE,
        payload: { error },
      }));
  };

  const onChangeRole = (value) => {
    setRoleId(value);
  };

  const onSaveRole = () => {
    if (roleId !== 0) changeRole(uid, roleId);
  };

  const changeStatus = _uid => {
    setIsPending(true);
    const request = isActive ? UserService.activate : UserService.reject;
    return request({ uid: _uid })
      .then(() => readUser(uid))
      .catch(error => dispatch({
        type: UPDATE_USER_FAILURE,
        payload: { error },
      }));
  };

  const onChangeStatus = checked => {
    setIsActive(checked);
  };

  const onSaveStatus = () => {
    changeStatus(uid);
  };

  useEffect(() => {
    readUser(uid);
  }, []);

  return <Spin spinning={isPending}>
    {
      user && <PageHeader
        onBack={() => history.push('/users')}
        title={capitalize(user.name)}
        tags={<Tag>{roleToString(user.role)}</Tag>}
      >
        <Descriptions>
          <Descriptions.Item label='Name'>{user.name}</Descriptions.Item>
          <Descriptions.Item label='Role'>
            <EditableField
              editor={<Select defaultValue={user.role.rid} onChange={onChangeRole}>
                <Select.Option value={1}>Contributor</Select.Option>
                <Select.Option value={2}>Curator</Select.Option>
                <Select.Option value={3}>Manager</Select.Option>
              </Select>}
              onSave={onSaveRole}
            >
              {roleToString(user.role)}
            </EditableField>
          </Descriptions.Item>
          <Descriptions.Item label='Status'>
            <EditableField
              editor={<Switch
                defaultChecked={user.enabled === 1}
                onChange={onChangeStatus}
                checkedChildren='Active'
                unCheckedChildren='Rejected'
              />}
              onSave={onSaveStatus}
            >
              {renderStatus(user.enabled)}
            </EditableField>
          </Descriptions.Item>
          <Descriptions.Item label='Email' span={2}>{user.email}</Descriptions.Item>
          <Descriptions.Item label='Invited by'>{user.invited}</Descriptions.Item>
          <Descriptions.Item label='Address' span={3}>{user.address}
          </Descriptions.Item>
          <Descriptions.Item label='Motivation' span={3}>{user.motivation}</Descriptions.Item>
          <Descriptions.Item label='Experience' span={3}>{user.experience}</Descriptions.Item>
        </Descriptions>
      </PageHeader>
    }
    
  </Spin>;
};

UserPage.propTypes = {
  dispatch: PropTypes.func,
  match: PropTypes.object,
};

export default connect()(UserPage);