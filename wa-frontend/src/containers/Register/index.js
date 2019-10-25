import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import qs from 'qs';

import {
  Form,
  Input,
  Button,
  Checkbox,
  Result,
} from 'antd';

import validate from './validate';
import { register } from '../../redux/registration/actions';
import PrivatePolicy from '../../components/PrivatePolicy';

const mapStateToProps = (state) => {
  const { isPending, isDone } = state.registration;
  return { isPending, isDone };
};

const initForm = {
  email: {
    value: '',
    validateStatus: 'success',
    help: '',
  },
  password: {
    value: '',
    validateStatus: 'success',
    help: '',
  },
  confirm: {
    value: '',
    validateStatus: 'success',
    help: '',
  },
  name: {
    value: '',
    validateStatus: 'success',
    help: '',
  },
  phoneNumber: {
    value: '',
    validateStatus: 'success',
    help: '',
  },
  address: {
    value: '',
    validateStatus: 'success',
    help: '',
  },
  motivation: {
    value: '',
    validateStatus: 'success',
    help: '',
  },
  experience: {
    value: '',
    validateStatus: 'success',
    help: '',
  },
};

const RegistrationForm = (props) => {
  const { location, dispatch, isPending, isDone } = props;
  const [form, setForm] = useState(initForm);
  const [showPolicy, setShowPolicy] = useState(false);
  const [checkedPolicy, setCheckedPolicy] = useState(false);

  const { refer } = qs.parse(location.search, { ignoreQueryPrefix: true });

  const onFieldChange = (field, value) => {
    setForm({
      ...form,
      [field]: {
        ...validate(form, field, value),
        value,
      },
    });
  };
  
  const onChangeCheckedPolicy = (e) => {
    setCheckedPolicy(e.target.checked);
  };

  const isValid = () => {
    const result = {};

    for (let key in form) {
      const value = form[key].value;
      const { validateStatus, help } = validate(form, key, value);
      result[key] = { validateStatus, help, value };
    }
 
    setForm({
      ...form,
      ...result,
    });

    return Object.values(result).map(r => r.validateStatus).every(v => v === 'success');
  };

  const onSubmitClicked = () => {
    if (!isValid()) return;

    const result = {};

    for (let key in form) {
      result[key] = form[key].value;
    }

    if (refer) result.invite = refer;
    
    dispatch(register(result));
  };

  const onClickPrivatePolicy = e => {
    e.preventDefault();
    e.stopPropagation();
    setShowPolicy(true);
  };

  const onAgree = () => {
    setShowPolicy(false);
  };

  return isDone
    ? <Result
      status='success'
      title='Your application is submitted.'
      subTitle='We are reviewing your application.'
    />
    : <div>
      <Form layout='horizontal' labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
        <Form.Item
          required
          label='Email'
          {...form.email}
        >
          <Input type='email' onChange={e => onFieldChange('email', e.target.value)} />
        </Form.Item>

        <Form.Item
          required
          label='Password'
          {...form.password}
        >
          <Input type='password' onChange={e => onFieldChange('password', e.target.value)} />
        </Form.Item>
      
        <Form.Item
          required
          label='Confrim Password'
          {...form.confirm}
        >
          <Input type='password' onChange={e => onFieldChange('confirm', e.target.value)} />
        </Form.Item>
      
        <Form.Item
          required
          label='Name'
          {...form.name}
        >
          <Input onChange={e => onFieldChange('name', e.target.value)} />
        </Form.Item>
      
        <Form.Item
          required
          label='Phone Number'
          {...form.phoneNumber}
        >
          <Input
            type='tel'
            onChange={e => onFieldChange('phoneNumber', e.target.value)}
          />
        </Form.Item>
      
        <Form.Item
          required
          label='Address'
          {...form.address}
        >
          <Input.TextArea onChange={e => onFieldChange('address', e.target.value)} />
        </Form.Item>

        <Form.Item label='Motivation'>
          <Input.TextArea onChange={e => onFieldChange('motivation', e.target.value)} />
        </Form.Item>
    
        <Form.Item label='Experience'>
          <Input.TextArea onChange={e => onFieldChange('experience', e.target.value)} />
        </Form.Item>

        <Form.Item
          validateStatus={checkedPolicy ? 'success' : 'error' }
          wrapperCol={{ span: 20, offset: 4 }}
        >
          <Checkbox
            checked={checkedPolicy}
            onChange={onChangeCheckedPolicy}
          >
            I have read the privacy policy statement in <a onClick={onClickPrivatePolicy}>this link</a>, and agree with it by selecting this checkbox.
          </Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ span: 20, offset: 4 }}>
          <Button
            type='primary'
            disabled={!checkedPolicy} 
            loading={isPending}
            onClick={onSubmitClicked}>Submit</Button>
        </Form.Item>
      </Form>

      <PrivatePolicy visible={showPolicy} onOk={onAgree} />
    </div>;
};

RegistrationForm.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  isPending: PropTypes.bool,
  isDone: PropTypes.bool,
};

export default connect(mapStateToProps)(RegistrationForm);