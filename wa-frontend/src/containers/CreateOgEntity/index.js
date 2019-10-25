import React from 'react';

import CreateOgEntity from './createOgEntity';
import {
  LayoutContext,
  formItemLayout,
  tailFormItemLayout
} from '../../components/CreateEntity/layoutContext';

const CreateOgEntityWrapper = () => {
  return (
    <LayoutContext.Provider value={{ formItemLayout, tailFormItemLayout }}>
      <CreateOgEntity />
    </LayoutContext.Provider>
  );
};

export default CreateOgEntityWrapper;
