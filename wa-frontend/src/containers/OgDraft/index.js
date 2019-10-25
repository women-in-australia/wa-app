import React from 'react';

import OgDraft from './ogDraft';
import {
  LayoutContext,
  formItemLayout,
  tailFormItemLayout
} from '../../components/CreateEntity/layoutContext';

const OgDraftWrapper = () => {
  return (
    <LayoutContext.Provider value={{ formItemLayout, tailFormItemLayout }}>
      <OgDraft />
    </LayoutContext.Provider>
  );
};

export default OgDraftWrapper;
