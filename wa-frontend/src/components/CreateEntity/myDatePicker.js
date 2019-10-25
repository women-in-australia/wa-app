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

    const value = props.value || {};
    this.state = {
      date: value.date
    };
  }

  handleDateChange = date => {
    // if (!("value" in this.props)) {
    //   this.setState({ currency });
    // }
    if (date == null) {
      return;
    }

    this.triggerChange({ date });
  };

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
    const { date } = this.state;

    const dateFormat = 'YYYY/MM/DD';
    return (
      <DatePicker
        value={date}
        format={dateFormat}
        onChange={this.handleDateChange}
      />
    );
  }
}

export default MyDateAndAddress;
