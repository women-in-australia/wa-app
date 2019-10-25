import React from 'react';
import PropTypes from 'prop-types';

import { Input, DatePicker } from 'antd';

class MyDateAndAddress extends React.Component {
  static getDerivedStateFromProps(nextProps) {
    // Should be a controlled component.
    // console.log(nextProps);
    if ('value' in nextProps) {
      return {
        ...(nextProps.value || {})
      };
    }
    return null;
  }
  constructor(props) {
    super(props);
    const name = props.name;
    const value = props.value || {};
    this.state = {
      name,
      date: value.date || '',
      country: value.country || '',
      state: value.state || '',
      place: value.place || ''
    };
  }

  handleInputChange = e => {
    const value = e.target.value;
    const key = e.target.placeholder;

    // if (!("value" in this.props)) {
    //   this.setState({ number });
    // }
    this.triggerChange({ [key]: value });
  };

  // handleDateChange = date => {
  //   // if (!("value" in this.props)) {
  //   //   this.setState({ currency });
  //   // }
  //   // if (date == null) {
  //   //   return;
  //   // }

  //   this.triggerChange({ date });
  // };

  triggerChange = changedValue => {
    // Should provide an event to pass value to Form.
    const { onChange } = this.props;
    if (onChange) {
      onChange({
        ...this.state,
        ...changedValue
      });
    }
  };

  render() {
    const { date, state, name, country, place } = this.state;

    const dateFormat = 'YYYY/MM/DD';
    return (
      <span>
        {/* <DatePicker
          value={date}
          format={dateFormat}
          onChange={this.handleDateChange}
          style={{ width: '24%', marginRight: '1%' }}
        /> */}
        <Input
          value={date}
          onChange={this.handleInputChange}
          placeholder={'date'}
          // style={{ width: '24%', marginRight: '1%' }}
        />

        <Input
          value={place}
          onChange={this.handleInputChange}
          placeholder={'place'}
          // style={{ width: '20%', marginRight: '1%' }}
        />
        <Input
          value={state}
          onChange={this.handleInputChange}
          placeholder={'state'}
          // style={{ width: '20%', marginRight: '1%' }}
        />
        <Input
          value={country}
          onChange={this.handleInputChange}
          placeholder={'country'}
          // style={{ width: '20%', marginRight: '1%' }}
        />
      </span>
    );
  }
}

MyDateAndAddress.propTypes = {
  name: PropTypes.string
};

export default MyDateAndAddress;
