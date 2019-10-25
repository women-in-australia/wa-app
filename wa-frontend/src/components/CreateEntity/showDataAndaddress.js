import React from 'react';
import PropTypes from 'prop-types';

import { Input, DatePicker } from 'antd';

/*
    this component is responsible for showing detail of born and death
*/
class ShowDateAndAddress extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      startDate,
      birthPlace,
      birthCountry,
      birthState,
      endDate,
      deathCountry,
      deathPlace,
      deathState
    } = this.props.value;

    return (
      <span>
        {/* <DatePicker
          value={date}
          format={dateFormat}
          onChange={this.handleDateChange}
          style={{ width: '24%', marginRight: '1%' }}
        /> */}
        <Input
          value={startDate || endDate}
          placeholder='date'
          // style={{ width: '24%', marginRight: '1%' }}
        />

        <Input
          value={birthPlace || deathPlace}
          placeholder='place'
          // style={{ width: '20%', marginRight: '1%' }}
        />
        <Input
          value={birthState || deathState}
          placeholder='state'
          // style={{ width: '20%', marginRight: '1%' }}
        />
        <Input
          value={birthCountry || deathCountry}
          placeholder='country'
          // style={{ width: '20%', marginRight: '1%' }}
        />
      </span>
    );
  }
}

ShowDateAndAddress.propTypes = {
  name: PropTypes.string,
  value: PropTypes.object
};

export default ShowDateAndAddress;
