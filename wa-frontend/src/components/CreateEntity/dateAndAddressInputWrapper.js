import React from 'react';

import { tailFormItemLayout, LayoutContext } from './layoutContext';
import DateAndAddressInput from './dateAndAddressInput';

const DateAndAddressInputWrapper = props => {
  return (
    <LayoutContext.Provider value={{ tailFormItemLayout }}>
      <DateAndAddressInput {...props} />
    </LayoutContext.Provider>
  );
};

export default DateAndAddressInputWrapper;
