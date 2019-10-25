import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Input, Select, Button, PageHeader } from 'antd';

import history from '../../history';
import { readUser, activateUser } from '../../redux/currentUser/actions';
import FeedbackModal from '../../components/FeedbackModal';

const ApplicationPage = (props) => {
  const { dispatch, match, userData } = props;
  const { uid } = match.params;

  const [feedbackVisible, setFeedbackVisible] = useState(false);

  const onApprove = () => {
    dispatch(activateUser(uid));
  };

  const onReject = () => {
    setFeedbackVisible(true);
  };

  useEffect(() => {
    dispatch(readUser(uid));
  }, []);

  return <PageHeader
    onBack={() => history.push('/applications')}
    title='Check an Application'
  >
    <Form layout='horizontal' labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
      <Form.Item
        label='Email'
      >
        <Input type='email' disabled value={userData && userData.email} />
      </Form.Item>
    
      <Form.Item
        label='Role'
      >
        <Select disabled>
          <Select.Option value={1}>Contributor</Select.Option>
          <Select.Option value={2}>Curator</Select.Option>
          <Select.Option value={3}>Manager</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        label='Name'
      >
        <Input disabled value={userData && userData.name} />
      </Form.Item>
    
      <Form.Item
        label='Phone Number'
      >
        <Input
          type='tel'
          disabled
        />
      </Form.Item>
    
      <Form.Item
        label='Address'
      >
        <Input.TextArea disabled value={userData && userData.address} />
      </Form.Item>

      <Form.Item label='Motivation'>
        <Input.TextArea disabled value={userData && userData.motivation}  />
      </Form.Item>
  
      <Form.Item label='Experience'>
        <Input.TextArea disabled value={userData && userData.experience} />
      </Form.Item>

      <Form.Item wrapperCol={{ span: 20, offset: 4 }}>
        <Button.Group size='large' style={{ float: 'right' }}>
          <Button
            icon='stop'
            onClick={onReject}
          >
            Reject
          </Button>
          <Button
            type='primary'
            icon='check-circle'
            onClick={onApprove}
          >
            Approve
          </Button>
        </Button.Group>
        
      </Form.Item>
    </Form>

    <FeedbackModal
      isVisible={feedbackVisible}
      uid={Number(uid)}
      onCancel={() => setFeedbackVisible(false)}
    />
  </PageHeader>;
};

ApplicationPage.propTypes = {
  dispatch: PropTypes.func,
  match: PropTypes.object,
  isPending: PropTypes.bool,
  userData: PropTypes.object,
};

const mapStateToProps = state => {
  const { isPending, userData } = state.currentUser;
  return { isPending, userData };
};
 
export default connect(mapStateToProps)(ApplicationPage);