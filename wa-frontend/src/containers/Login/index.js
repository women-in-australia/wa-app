import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Checkbox } from 'antd';

import history from '../../history';
import { logIn } from '../../redux/session/actions';

const LogInForm  = (props) => {
  const { dispatch, token } = props;

  if (token) {
    history.push('/entities');
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onFieldChange = (field, event) => {
    if (field === 'email') {
      setEmail(event.target.value);
    } else if (field === 'password') {
      setPassword(event.target.value);
    }
  };

  const onLogInClicked = () => {
    dispatch(logIn({ email, password }));
  };

  return <div>
    <Form>
      <Form.Item>
        <Input
          value={email}
          onChange={e => onFieldChange('email', e)}
          placeholder='Email'
        />
      </Form.Item>

      <Form.Item>
        <Input
          value={password}
          onChange={e => onFieldChange('password', e)}
          type='password'
          placeholder='Password'
        />
      </Form.Item>

      <Form.Item>
        <Button
          type='primary'
          onClick={onLogInClicked}
          style={{ width: '100%' }}
        >
          Log In
        </Button>
        Or <Link to='/users/create'>apply for an account now!</Link>
      </Form.Item>
    </Form>
  </div>;
};

LogInForm.propTypes = {
  dispatch: PropTypes.func,
  token: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    token: state.session.token,
  };
};

export default connect(mapStateToProps)(LogInForm);