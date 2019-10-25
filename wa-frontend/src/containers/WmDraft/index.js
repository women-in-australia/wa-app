import React from 'react';

import WmDraft from './wmDraft';
import {
  LayoutContext,
  formItemLayout,
  tailFormItemLayout
} from '../../components/CreateEntity/layoutContext';

const WmDraftWrapper = () => {
  return (
    <LayoutContext.Provider value={{ formItemLayout, tailFormItemLayout }}>
      <WmDraft />
    </LayoutContext.Provider>
  );
};

export default WmDraftWrapper;
