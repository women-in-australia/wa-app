import React, { useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Popconfirm, message, Tabs, PageHeader, Dropdown, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

import { DELETE_ENTITY_FAILURE, READ_ENTITIES_FAILURE } from '../../redux/actionTypes';
import { EntityService } from '../../services';
import EntityList from '../../components/EntityList';

const PAGE_SIZE = 10;

const extraDropdownMenu = <Menu>
  <Menu.Item key='person'>
    <Link to='/entities/create/person'>for a Person</Link>
  </Menu.Item>
  <Menu.Item key='organisation'>
    <Link to='/entities/create/organisation'>for an Organisation</Link>
  </Menu.Item>
</Menu>;

const extraDropdown = <Dropdown overlay={extraDropdownMenu}>
  <Button type='primary'>
    Create an Entity <Icon type='down' />
  </Button>
</Dropdown>;

const getRequest = type => {
  switch (type) {
  case 'my':
    return EntityService.readMy;
  case 'draft':
    return EntityService.readDraft;
  case 'unreviewed':
    return EntityService.readUnreviewed;
  case 'all':
    return EntityService.readAll;
  }
};

const getReviewLink = (type, eid) => {
  if (type === 1) return <Link to={`/entities/check/person/${eid}`}>Review</Link>;
  if (type === 2) return <Link to={`/entities/check/organisation/${eid}`}>Review</Link>;
  return <Link to={`/entities/${eid}`}>View</Link>;
};

const getEditLink = (type, eid) => {
  if (type === 1) return <Link to={`/entities/draft/person/${eid}`}>Edit</Link>;
  if (type === 2) return <Link to={`/entities/draft/organisation/${eid}`}>Edit</Link>;
  return <Link to={`/entities/${eid}`}>View</Link>;
};

const Entities = (props) => {
  const { userData, dispatch } = props;

  const [isPending, setIsPending] = useState(true);
  const [sourceData, setSourceData] = useState(null);
  const [tab, setTab] = useState('my');

  const list = sourceData ? sourceData.data : [];

  const pagination = sourceData
    ? {
      page: sourceData.page,
      allPageNum: sourceData.allPageNum,
    }
    : {
      page: 1,
      allPageNum: 1,
    };

  const readEntities = (type, page, pageSize = PAGE_SIZE, status = null) => {
    setIsPending(true);

    const request = getRequest(type);
    request({ page, pageSize, status })
      .then(data => {
        setIsPending(false);
        setSourceData(data);
      })
      .catch(error => {
        setIsPending(false);
        dispatch({
          type: READ_ENTITIES_FAILURE,
          payload: { error },
        });
      });
  };

  const deleteEntity = (eid) => {
    setIsPending(true);

    return EntityService.delete({ eid })
      .then(() => {
        message.warn('Deleted the entity Successfully');
        readEntities(tab, pagination.page, PAGE_SIZE);
      }).catch(error => {
        setIsPending(false);
        dispatch({
          type: DELETE_ENTITY_FAILURE,
          payload: { error }
        });
      });
  };
  
  const onChangeTable = ({ current, pageSize }, filters) => {
    if (filters && filters.status && filters.status.length > 0) {
      readEntities(tab, current, pageSize, filters.status[0]);
    } else {
      readEntities(tab, current, pageSize);
    }
  };

  const onChangeTab = key => {
    setTab(key);
  };

  const getLink = (tab, record, eid) => {
    if (tab === 'my') if (record.status === -1)
      return getEditLink(record.type, eid);
  
    if (tab === 'draft') return getEditLink(record.type, eid);
    if (tab === 'unreviewed') return getReviewLink(record.type, eid);
  
    if (tab === 'all') {
      if (record.status === 0) return getReviewLink(record.type, eid);
      if (record.status === 1) if (userData && userData.role === 'ROLE_manager')
        return getReviewLink(record.type, eid);
    }
  
    return <Link to={`/entities/${eid}`}>View</Link>;
  };

  const renderOperation = (value, record) => {
    return <Button.Group>
      <Popconfirm
        title='Do you confirm to delete this entity?'
        okText='Confirm'
        cancelText='Cancel'
        onConfirm={() => deleteEntity(value)}
      >
        <Button type='danger'>Delete</Button>
      </Popconfirm>
      
      <Button type='primary'>
        {getLink(tab, record, value)}
      </Button>
    </Button.Group>;
  };

  useEffect(() => {
    readEntities(tab, 1);
  }, [tab]);

  const tabList = useMemo(() => {
    let list = [
      <Tabs.TabPane key='my' tab='My Contributions'></Tabs.TabPane>,
      <Tabs.TabPane key='draft' tab='My Drafts'></Tabs.TabPane>,
    ];
  
    if (userData && userData.role !== 'ROLE_contributor') {
      list = [
        ...list,
        <Tabs.TabPane key='unreviewed' tab='Not Reviewed'></Tabs.TabPane>,
        <Tabs.TabPane key='all' tab='All Contributions'></Tabs.TabPane>,
      ];
    }

    return list;
  }, [userData]);

  return <PageHeader
    title='Entities'
    extra={extraDropdown}
  >
    <Tabs
      defaultActiveKey={tab}
      onChange={onChangeTab}
      animated={false}
    >
      {tabList}
    </Tabs>

    <EntityList
      isPending={isPending}
      dataSource={list}
      pagination={pagination}
      onChange={onChangeTable}
      renderOperation={renderOperation}
    />
  </PageHeader>;
};

Entities.propTypes = {
  dispatch: PropTypes.func,
  userData: PropTypes.object,
};

const mapStateToProps = state => ({
  userData: state.session.userData,
});

export default connect(mapStateToProps)(Entities);