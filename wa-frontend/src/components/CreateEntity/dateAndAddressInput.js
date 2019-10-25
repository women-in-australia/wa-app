import React from 'react';
import { Form } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';

import MyDateAndAddress from './myDateAndAddress';
import ShowDateAndAddress from './showDataAndaddress';
import { LayoutContext } from './layoutContext';
import { getColor } from '../../utils/getColor';

const check = (rule, value, callback) => {
  // if (value.country && value.state && value.place) {
  //   callback();
  //   return;
  // }
  // callback('Address should not be empty!');
  callback();
};

const DateAndAddressInput = props => {
  //name: born / dead
  //get value: fieldsValue['bornDate'].format('YYYY-MM-DD'),
  const dateFormat = 'YYYY/MM/DD';
  // const defaultDate = '1990/01/01';
  const { getFieldDecorator, name, value, judge } = props;
  let checkbox = judge ? (
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
  );
  let border = getColor(props.status);
  return (
    <LayoutContext.Consumer>
      {({ tailFormItemLayout }) => (
        <Form.Item
          label={<span>{name}&nbsp;</span>}
          {...tailFormItemLayout}
          wrapperCol={{
            xs: {
              span: 24,
              offset: 0
            },
            sm: {
              span: 12,
              offset: 0
            },
            style: { border }
          }}
        >
          {getFieldDecorator ? (
            getFieldDecorator(name, {
              initialValue: {
                date: '',
                country: '',
                state: '',
                place: ''
              },
              rules: [{ validator: check }]
            })(<MyDateAndAddress name={name} status={props.status} />)
          ) : (
            <ShowDateAndAddress value={value} name={name} />
          )}
          {checkbox}
        </Form.Item>
      )}
    </LayoutContext.Consumer>
  );
};
DateAndAddressInput.propTypes = {
  getFieldDecorator: PropTypes.func,
  name: PropTypes.string
};
export default DateAndAddressInput;
