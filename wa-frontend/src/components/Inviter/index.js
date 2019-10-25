import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Input, Radio, Modal, message, Button } from 'antd';

import { INVITE_FAILURE } from '../../redux/actionTypes';

import { UserService } from '../../services';

const initialForm = {
  email: {
    value: '',
    validateStatus: 'success',

    help: ''
  },
  role: {
    value: 1,
    validateStatus: 'success',

    help: ''
  },
  message: {
    value: '',
    validateStatus: 'success',

    help: ''
  }
};

const validate = (field, value) => {
  if (field === 'email') {
    const regexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value.length < 1 || !regexp.test(value)) {
      return {
        validateStatus: 'error',

        help: 'Please enter a valid email.'
      };
    }
  }

  return {
    validateStatus: 'success',
    help: ''
  };
};

const Inviter = props => {
  const { dispatch } = props;
  const [isPending, setIsPending] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [form, setForm] = useState(initialForm);

  const sendInvitation = ({ email, role, message: _message }) => {
    setIsPending(true);

    return UserService.invite({ email, role, message: _message })
      .then(() => {
        setIsPending(false);
        message.success('Send Invitation Successfully');
      })
      .catch(error =>
        dispatch({
          type: INVITE_FAILURE,
          payload: { error }
        })
      );
  };

  const onChangeField = (field, event) => {
    updateField(field, event.target.value);
  };

  const updateField = (field, value) => {
    setForm({
      ...form,
      [field]: {
        ...validate(field, value),
        value
      }
    });
  };

  const onOk = () => {
    const { validateStatus } = validate('email', form.email.value);

    if (validateStatus === 'success') {
      sendInvitation({
        email: form.email.value,
        role: form.role.value,
        message: form.message.value
      });
    } else updateField('email', form.email.value);
  };

  return (
    <>
      <Button type='primary' onClick={() => setIsVisible(true)}>
        Invite
      </Button>

      <Modal
        title='Invite'
        visible={isVisible}
        okText='Invite'
        onOk={onOk}
        onCancel={() => setIsVisible(false)}
        confirmLoading={isPending}
      >
        <Form
          layout='horizontal'
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
        >
          <Form.Item
            required
            label='Send to'
            validateStatus={form.email.validateStatus}
            help={form.email.help}
          >
            <Input
              placeholder='Email'
              onChange={e => onChangeField('email', e)}
            />
          </Form.Item>

          <Form.Item required label='Role'>
            <Radio.Group
              name='role'
              defaultValue={1}
              onChange={e => onChangeField('role', e)}
            >
              <Radio value={1}>Contributor</Radio>
              <Radio value={2}>Curator</Radio>
              <Radio value={3}>Manager</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label='Message'>
            <Input.TextArea
              autosize={{ minRows: 3, maxRows: 8 }}
              onChange={e => onChangeField('message', e)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

Inviter.propTypes = {
  dispatch: PropTypes.func,
  isVisible: PropTypes.bool
};

export default connect()(Inviter);
