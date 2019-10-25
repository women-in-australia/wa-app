import React from 'react';
import PropTypes from 'prop-types';
import { Upload, Icon, Form, Button, DatePicker, Input } from 'antd';

const { TextArea } = Input;

let id = 0;

//archival resource form
class ArchivalResourceForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { archivalResources } = this.props;

    if (!archivalResources) {
      archivalResources = [];
    }
    const formItems = archivalResources.map((archivalResource, index) => (
      <React.Fragment key={`${archivalResource.arid}`}>
        <Form.Item label={<span>{'Title'}&nbsp;</span>}>
          <Input
            value={archivalResource.arTitle}
            placeholder='Resource Title'
          />
        </Form.Item>
        <Form.Item label={<span>{'Repository'}&nbsp;</span>}>
          <Input
            value={archivalResource.arRepository}
            placeholder='Resource Repository'
          />
        </Form.Item>
        <Form.Item label={<span>{'Url'}&nbsp;</span>}>
          <Input value={archivalResource.arUrl} placeholder='Resource Url' />
        </Form.Item>
        <Form.Item label={<span>{'Date'}&nbsp;</span>}>
          <Input value={archivalResource.arDate} placeholder='Resource Date' />
        </Form.Item>
        <Form.Item label={<span>{'Abstract'}&nbsp;</span>}>
          <Input
            value={archivalResource.arAbstract}
            placeholder='Resource Abstract'
          />
        </Form.Item>

        <Form.Item
          wrapperCol={{ span: 12 }}
          label={<span>{'note'}&nbsp;</span>}
        >
          <TextArea value={archivalResource.arNote} rows={3} />
        </Form.Item>
        <hr />
      </React.Fragment>
    ));
    return <React.Fragment>{formItems}</React.Fragment>;
  }
}

ArchivalResourceForm.propTypes = {};

export default ArchivalResourceForm;
