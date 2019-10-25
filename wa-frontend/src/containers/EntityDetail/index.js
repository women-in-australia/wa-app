import React from 'react';

import EntityDetail from './entityDetail';
import {
  LayoutContext,
  formItemLayout,
  tailFormItemLayout
} from '../../components/CreateEntity/layoutContext';

const EntityDetailWrapper = () => {
  return (
    <LayoutContext.Provider value={{ formItemLayout, tailFormItemLayout }}>
      <EntityDetail />
    </LayoutContext.Provider>
  );
};

export default EntityDetailWrapper;
