import React from 'react';
import PropTypes from 'prop-types';
import { Upload, Icon, Form, Button, DatePicker, Input } from 'antd';
import moment from 'moment';

import DefaultInput from '../../components/CreateEntity/defaultInput';

let id = 0;
const { TextArea } = Input;

class DigitalResourceForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { digitalResources } = this.props;

    if (!digitalResources) {
      digitalResources = [];
    }
    const formItems = digitalResources.map((digitalResource, index) => (
      <React.Fragment key={`${digitalResource.drid}`}>
        <Form.Item label={<span>{'Title'}&nbsp;</span>}>
          <Input value={digitalResource.drTitle} placeholder='file title' />
        </Form.Item>
        <Form.Item label={<span>{'Date'}&nbsp;</span>}>
          <Input value={digitalResource.drDate} placeholder='file date ' />
        </Form.Item>
        <Form.Item label={<span>{'Repository'}&nbsp;</span>}>
          <Input
            value={digitalResource.drRepository}
            placeholder='file repository '
          />
        </Form.Item>
        <Form.Item label={<span>{'Url'}&nbsp;</span>}>
          <Input value={digitalResource.drUrl} placeholder='file url ' />
        </Form.Item>

        <Form.Item
          wrapperCol={{ span: 12 }}
          label={<span>{'note'}&nbsp;</span>}
        >
          <TextArea value={digitalResource.drNote} rows={3} />
        </Form.Item>
        <hr />
      </React.Fragment>
    ));
    return <React.Fragment>{formItems}</React.Fragment>;
  }
}

DigitalResourceForm.propTypes = {};

export default DigitalResourceForm;
