import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Typography, Button } from 'antd';

const PrivatePolicy = (props) => {
  const { visible, onOk } = props;

  return <Modal
    title='Private Policy'
    visible={visible}
    onOk={onOk}
    footer={<Button key='ok' type='primary' onClick={onOk}>OK</Button>}
  >
    <Typography.Paragraph>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc viverra magna posuere est finibus malesuada. Donec feugiat ornare purus, sed efficitur diam euismod sit amet. Sed dignissim, magna varius eleifend rutrum, urna odio rhoncus sapien, et condimentum nulla libero nec erat. Praesent quis convallis sapien. Sed pellentesque ornare augue, et ornare neque pellentesque in. Etiam sodales ipsum id magna porta suscipit. Curabitur a metus nec purus egestas dignissim non sit amet est.
    </Typography.Paragraph>
  </Modal>;
};

PrivatePolicy.propTypes = {
  visible: PropTypes.bool,
  onOk: PropTypes.func,
};

export default PrivatePolicy;