import React from 'react';
import { Form, Input } from 'antd';
import ProTypes from 'prop-types';

import { getColor } from '../../utils/getColor';

const DefaultInput = props => {
  //name: given name
  /*
  idName means the parent component assign the field name on purpose. 
  You can get input value through idName
  */

  const idName = props.idName ? props.idName : props.name;
  const { getFieldDecorator, name, message, required, value, disabled } = props;
  // console.log(required);
  return (
    <Form.Item label={<span>{name}&nbsp;</span>}>
      {getFieldDecorator(idName, {
        initialValue: value || '',
        rules: [
          {
            required,
            message: message,
            whitespace: true
          }
        ]
      })(
        <Input
          style={{border: getColor(props.status)}}
          disabled={disabled}
          placeholder={`Input ${name.toLowerCase()}`}
        />
      )}
      {props.judge ? (
        <div>
          <input
            className='judge-div'
            type='checkbox'
            checked={props.status}
            onChange={props.changeStatus}
          />
        </div>
      ) : (
        ''
      )}
    </Form.Item>
  );
};

DefaultInput.propTypes = {
  getFieldDecorator: ProTypes.func,
  name: ProTypes.string,
  message: ProTypes.string
};

export default DefaultInput;
