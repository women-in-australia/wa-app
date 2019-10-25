import React from 'react';
import { Button, Form, Input, Icon, Select, Row, Col } from 'antd';
import PropTypes from 'prop-types';

import RelatedName from './relatedName';

import { getColor } from '../../utils/getColor';
// method to get values of multi inputs
// const { keys, names } = values;
// console.log('Received values of form: ', values);
// console.log('Merged values:', keys.map(key => names[key]));

const { Option } = Select;

class RelatedEntityBaseForm extends React.Component {
  constructor(props) {
    super(props);
  }

  remove = k => {
    const { getFieldValue, setFieldsValue, name } = this.props;
    // can use data-binding to get
    const keys = getFieldValue(`${name}InfoKey`);
    // We need at least one passenger
    // if (keys.length === 1) {
    //   return;
    // }
    // can use data-binding to set
    setFieldsValue({
      [`${name}InfoKey`]: keys.filter(key => key !== k)
    });
  };

  add = () => {
    const { getFieldValue, setFieldsValue, name } = this.props;
    // can use data-binding to get
    const keys = getFieldValue(`${name}InfoKey`);
    const info = getFieldValue(`${name}Info`);
    console.log(keys);
    console.log(info);
    let last = keys[keys.length - 1];
    if (last == undefined) {
      last = -1;
    }
    const nextKeys = keys.concat(last + 1);
    // can use data-binding to set
    // important! notify form to detect changes
    setFieldsValue({
      [`${name}InfoKey`]: nextKeys
    });
  };

  render() {
    // const formItemLayout = {
    //   labelCol: {
    //     xs: { span: 24 },
    //     sm: { span: 4 }
    //   },
    //   wrapperCol: {
    //     xs: { span: 24 },
    //     sm: { span: 20 }
    //   }
    // };
    const {
      getFieldDecorator,
      getFieldValue,
      name,
      setFieldsValue,
      judge
    } = this.props;
    getFieldDecorator(`${name}InfoKey`, { initialValue: [] });
    const keys = getFieldValue(`${name}InfoKey`);
    const relatedEntities = getFieldValue(`${name}Info`);

    const formItems = keys.map((k, index) => {
      getFieldDecorator(`${name}Info[${k}].checked`, {
        initialValue: false
      });

      getFieldDecorator(`${name}Info[${k}].status`, {
        initialValue:
          relatedEntities && relatedEntities[k] && relatedEntities[k].status
      });
      let status = getFieldValue(`${name}Info[${k}].status`);
      let border = getColor(status);
      console.log(name);
      return (
        <Row key={k} style={{ border }}>
          <Col span={8}>
            <RelatedName
              labelCol={{ offset: 1, span: 8 }}
              wrapperCol={{ offset: 0, span: 15 }}
              key={`Name+${k}`}
              getFieldDecorator={getFieldDecorator}
              setFieldsValue={setFieldsValue}
              name={name}
              value={{
                name:
                  relatedEntities &&
                  relatedEntities[k] &&
                  relatedEntities[k].name,
                id:
                  relatedEntities && relatedEntities[k] && relatedEntities[k].id
              }}
              k={k}
            />
          </Col>
          <Col span={16}>
            <Form.Item
              labelCol={{ offset: 1, span: 10 }}
              wrapperCol={{ offset: 0, span: 13 }}
              label='Relationship'
              key={`Relation+${k}`}
            >
              {getFieldDecorator(`${name}Info[${k}.relation]`, {
                validateTrigger: ['onChange', 'onBlur'],
                initialValue:
                  (relatedEntities &&
                    relatedEntities[`${k}`] &&
                    relatedEntities[`${k}`].relation &&
                    relatedEntities[`${k}`].relation + '') ||
                  '',
                rules: [
                  {
                    required: true,
                    message: 'Please input relationship or delete this field.'
                  }
                ]
              })(
                name == 'woman' ? (
                  <Select
                    placeholder='Input relationship'
                    style={{ width: '70%', marginRight: 20 }}
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
                    style={{ width: '70%', marginRight: 20 }}
                  >
                    <Option value='6'>Chair</Option>
                    <Option value='7'>Emplyee</Option>
                    <Option value='8'>Founder</Option>
                    <Option value='9'>Volunteer</Option>
                    <Option value='10'>Patron</Option>
                  </Select>
                )
              )}
              {!judge && keys.length > 0 ? (
                <Icon
                  className='dynamic-delete-button'
                  type='minus-circle-o'
                  onClick={() => this.remove(k)}
                />
              ) : null}
              {judge && keys.length > 0 ? (
                <input
                  className='judge-div'
                  type='checkbox'
                  checked={getFieldValue(`${name}Info[${k}].checked`)}
                  onChange={() => {
                    setFieldsValue({
                      [`${name}Info[${k}].checked`]: !getFieldValue(
                        `${name}Info[${k}].checked`
                      )
                    });
                  }}
                />
              ) : (
                ''
              )}
            </Form.Item>
          </Col>
        </Row>
      );
    });
    return (
      <React.Fragment>
        {formItems}
        <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
          {judge ? (
            ''
          ) : (
            <Button type='dashed' onClick={this.add} style={{ width: '100%' }}>
              <Icon type='plus' /> Add field
            </Button>
          )}
        </Form.Item>
      </React.Fragment>
    );
  }
}

RelatedEntityBaseForm.propTypes = {
  getFieldDecorator: PropTypes.func,
  getFieldValue: PropTypes.func,
  setFieldsValue: PropTypes.func,
  name: PropTypes.string
};

export default RelatedEntityBaseForm;
