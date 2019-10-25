import React from 'react';

import AlternativeName from './alternativeName';
import {
  LayoutContext,
  formItemLayoutWithOutLabel
} from '../../components/CreateEntity/layoutContext';

const AlternativeNameWrapper = props => {
  return (
    <LayoutContext.Provider value={{ ...formItemLayoutWithOutLabel }}>
      <AlternativeName {...props} />
    </LayoutContext.Provider>
  );
};

export default AlternativeNameWrapper;
