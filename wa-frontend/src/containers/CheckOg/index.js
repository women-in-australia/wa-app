import React from 'react';

import CheckOg from './checkOg';
import {
  LayoutContext,
  formItemLayout,
  tailFormItemLayout
} from '../../components/CreateEntity/layoutContext';

const CheckOgWrapper = () => {
  return (
    <LayoutContext.Provider value={{ formItemLayout, tailFormItemLayout }}>
      <CheckOg />
    </LayoutContext.Provider>
  );
};

export default CheckOgWrapper;
