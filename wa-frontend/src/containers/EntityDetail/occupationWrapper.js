import React from 'react';

import Occupation from './occupation';
import {
  LayoutContext,
  formItemLayoutWithOutLabel
} from '../../components/CreateEntity/layoutContext';

const OccupationWrapper = props => {
  return (
    <LayoutContext.Provider value={{ ...formItemLayoutWithOutLabel }}>
      <Occupation {...props} />
    </LayoutContext.Provider>
  );
};

export default OccupationWrapper;
