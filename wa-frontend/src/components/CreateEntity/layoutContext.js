import React from 'react';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 }
  }
};

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 12, offset: 8 }
  }
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 0
    }
  }
};

const LayoutContext = React.createContext({ ...formItemLayoutWithOutLabel });

export {
  LayoutContext,
  formItemLayout,
  tailFormItemLayout,
  formItemLayoutWithOutLabel
};
