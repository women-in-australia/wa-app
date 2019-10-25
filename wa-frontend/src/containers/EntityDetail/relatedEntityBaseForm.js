import React from 'react';
import { Button, Form, Input, Icon, Select, Row, Col } from 'antd';
import PropTypes from 'prop-types';

// method to get values of multi inputs
// const { keys, names } = values;
// console.log('Received values of form: ', values);
// console.log('Merged values:', keys.map(key => names[key]));
const { Option } = Select;

class RelatedEntityBaseForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { relatedEntities, name } = this.props;
    //organisation or woman
    let type = name == 'woman' ? 1 : 2;
    console.log(type);
    if (!relatedEntities) {
      relatedEntities = [];
    }

    const formItems = relatedEntities.map((relatedEntity, index) =>
      relatedEntity['relatedEtype'] == type ? (
        <Row key={relatedEntity.roid}>
          <Col span={12}>
            <Form.Item
              labelCol={{ offset: 1, span: 4 }}
              wrapperCol={{ offset: 0, span: 18 }}
              label='Name'
            >
              <Input
                placeholder='Input name'
                value={relatedEntity.relatedEname}
                //   style={{ width: "30%", marginRight: 8 }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              labelCol={{ offset: 1, span: 8 }}
              wrapperCol={{ offset: 0, span: 13 }}
              label='Relationship'
            >
              {name == 'woman' ? (
                <Select
                  placeholder='Input relationship'
                  style={{ marginRight: 20 }}
                  value={relatedEntity.relationship + ''}
                >
                  <Option value='1'>Child</Option>
                  <Option value='2'>Parent</Option>
                  <Option value='3'>Fellow</Option>
                  <Option value='4'>Friend</Option>
                  <Option value='5'>Colleague</Option>
                </Select>
              ) : (
                <Select
                  placeholder='Input relationship'
                  style={{ marginRight: 20 }}
                  value={relatedEntity.relationship + ''}
                >
                  <Option value='6'>Chair</Option>
                  <Option value='7'>Emplyee</Option>
                  <Option value='8'>Founder</Option>
                  <Option value='9'>Volunteer</Option>
                  <Option value='10'>Patron</Option>
                </Select>
              )}
            </Form.Item>
          </Col>
        </Row>
      ) : null
    );
    return <React.Fragment>{formItems}</React.Fragment>;
  }
}

RelatedEntityBaseForm.propTypes = {
  name: PropTypes.string
};

export default RelatedEntityBaseForm;
