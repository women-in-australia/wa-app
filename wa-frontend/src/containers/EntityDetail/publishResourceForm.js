import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Form, Input } from 'antd';

const { TextArea } = Input;

class PublishResourceForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { publishedResources } = this.props;

    if (!publishedResources) {
      publishedResources = [];
    }

    const formItems = publishedResources.map((publishedResource, index) => (
      <React.Fragment key={`${publishedResource.prid}`}>
        <Form.Item label={<span>{'Title'}&nbsp;</span>}>
          <Input
            value={publishedResource.prTitle}
            placeholder='resource title'
          />
        </Form.Item>
        <Form.Item label={<span>{'Publisher'}&nbsp;</span>}>
          <Input
            value={publishedResource.prPublisher}
            placeholder='resource publisher'
          />
        </Form.Item>
        <Form.Item label={<span>{'Url'}&nbsp;</span>}>
          <Input value={publishedResource.prUrl} placeholder='resource url' />
        </Form.Item>
        <Form.Item label={<span>{'Date'}&nbsp;</span>}>
          <Input value={publishedResource.prDate} placeholder='resource date' />
        </Form.Item>

        <Form.Item
          wrapperCol={{ span: 12 }}
          label={<span>{'note'}&nbsp;</span>}
        >
          <TextArea value={publishedResource.prNote} rows={3} />
        </Form.Item>
        <hr />
      </React.Fragment>
    ));
    return <React.Fragment>{formItems}</React.Fragment>;
  }
}

PublishResourceForm.propTypes = {};

export default PublishResourceForm;
