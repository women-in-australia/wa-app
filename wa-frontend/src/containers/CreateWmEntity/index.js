import React from 'react';

import CreateWmEntity from './createWmEntity';
import {
  LayoutContext,
  formItemLayout,
  tailFormItemLayout
} from '../../components/CreateEntity/layoutContext';

const CreateWmEntityWrapper = () => {
  return (
    <LayoutContext.Provider value={{ formItemLayout, tailFormItemLayout }}>
      <CreateWmEntity />
    </LayoutContext.Provider>
  );
};

export default CreateWmEntityWrapper;
