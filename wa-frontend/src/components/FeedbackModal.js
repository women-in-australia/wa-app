import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal, Input } from 'antd';

import { UserService } from '../services';
import { REJECT_USER, REJECT_USER_FAILURE, REJECT_USER_SUCCESS } from '../redux/actionTypes';

const FeedbackModal = (props) => {
  const { isVisible, uid, isPending, dispatch, onCancel } = props;

  const [feedback, setFeedback] = useState(null);

  const rejectUser = (uid, feedback) => {
    return dispatch => {
      dispatch({ type: REJECT_USER });
  
      return UserService.reject({ uid, feedback })
        .then(() => {
          dispatch({ type: REJECT_USER_SUCCESS });
          onCancel();
        })
        .catch(error => dispatch({
          type: REJECT_USER_FAILURE,
          payload: { error },
        }));
    };
  };

  const onReject = () => {
    dispatch(rejectUser(uid, feedback));
  };

  const onChangeFeedback = e => {
    setFeedback(e.target.value);
  };

  return <Modal
    title='Feedback'
    okText='Reject'
    visible={isVisible}
    onOk={onReject}
    onCancel={onCancel}
    confirmLoading={isPending}
  >
    <Input.TextArea
      placeholder='Give a Feedback to the Rejceted Applicant'
      onChange={onChangeFeedback}
      autosize={{ minRows: 4, maxRows: 8 }}
    ></Input.TextArea>
  </Modal>;
};

FeedbackModal.propTypes = {
  dispatch: PropTypes.func,
  isVisible: PropTypes.bool,
  isPending: PropTypes.bool,
  onCancel: PropTypes.func,
  uid: PropTypes.number,
};

export default connect(state => ({ isPending: state.currentUser.isPending }))(FeedbackModal);