import React from 'react';

import CheckWm from './checkWm';
import {
  LayoutContext,
  formItemLayout,
  tailFormItemLayout
} from '../../components/CreateEntity/layoutContext';

const CheckWmWrapper = () => {
  return (
    <LayoutContext.Provider value={{ formItemLayout, tailFormItemLayout }}>
      <CheckWm />
    </LayoutContext.Provider>
  );
};

export default CheckWmWrapper;
