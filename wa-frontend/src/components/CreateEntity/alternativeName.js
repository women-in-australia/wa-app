import React from 'react';
import { Button, Form, Input, Icon, Select } from 'antd';
import PropTypes from 'prop-types';

import { LayoutContext } from './layoutContext';
import { getColor } from '../../utils/getColor';
// method to get values of multi inputs
// const { keys, names } = values;
// console.log('Received values of form: ', values);
// console.log('Merged values:', keys.map(key => names[key]));

class AlternativeName extends React.Component {
  static contextType = LayoutContext;
  remove = k => {
    const { getFieldValue, setFieldsValue } = this.props;
    // can use data-binding to get
    const keys = getFieldValue('alternativeNamesKey');
    // We need at least one passenger
    // if (keys.length === 1) {
    //   return;
    // }
    // can use data-binding to set
    setFieldsValue({
      alternativeNamesKey: keys.filter(key => key !== k)
    });
  };

  add = () => {
    const { getFieldValue, setFieldsValue } = this.props;
    // can use data-binding to get
    const keys = getFieldValue('alternativeNamesKey');
    const names = getFieldValue('alternativeNames');
    console.log(keys);
    console.log(names);
    let last = keys[keys.length - 1];
    if (last == undefined) {
      last = -1;
    }
    const nextKeys = keys.concat(last + 1);
    // can use data-binding to set
    // important! notify form to detect changes
    setFieldsValue({
      alternativeNamesKey: nextKeys
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
    const context = this.context;
    console.log(this.context);
    const {
      getFieldDecorator,
      getFieldValue,
      judge,
      setFieldsValue,
      type
    } = this.props;

    getFieldDecorator('alternativeNamesKey', { initialValue: [] });

    const keys = getFieldValue('alternativeNamesKey');
    const alternativeNames = getFieldValue('alternativeNames');

    const formItems = keys.map((k, index) => {
      getFieldDecorator(`alternativeNames[${k}].checked`, {
        initialValue: false
      });

      getFieldDecorator(`alternativeNames[${k}].status`, {
        initialValue:
          alternativeNames && alternativeNames[k] && alternativeNames[k].status
      });

      let status = getFieldValue(`alternativeNames[${k}].status`);
      let border = getColor(status);
      console.log(border);
      let select =
        type == 1 ? (
          <Select
            placeholder='Input alternative name type'
            style={{ width: '55%', marginRight: 10 }}
          >
            <Select.Option value='1'>previous name</Select.Option>
            <Select.Option value='2'>subsequent name</Select.Option>
          </Select>
        ) : (
          <Select
            placeholder='Input alternative name type'
            style={{ width: '55%', marginRight: 10 }}
          >
            <Select.Option value='3'>abbreviated name</Select.Option>
            <Select.Option value='4'>acronym</Select.Option>
            <Select.Option value='5'>adopted name</Select.Option>
            <Select.Option value='6'>alias</Select.Option>
            <Select.Option value='7'>also known as</Select.Option>
            <Select.Option value='8'>alternative birth name</Select.Option>
            <Select.Option value='9'>alternative name</Select.Option>
            <Select.Option value='10'>alternative spelling</Select.Option>
            <Select.Option value='11'>anglicized name</Select.Option>
            <Select.Option value='12'>assumed name</Select.Option>
            <Select.Option value='13'>birth name</Select.Option>
            <Select.Option value='14'>common misspelling</Select.Option>
            <Select.Option value='15'>family name</Select.Option>
            <Select.Option value='16'>former married name</Select.Option>
            <Select.Option value='17'>former name</Select.Option>
            <Select.Option value='18'>full name</Select.Option>
            <Select.Option value='19'>honours citation</Select.Option>
            <Select.Option value='20'>legal name</Select.Option>
            <Select.Option value='21'>married name</Select.Option>
            <Select.Option value='22'>nickname</Select.Option>
            <Select.Option value='23'>Nom de plume</Select.Option>
            <Select.Option value='24'>official title</Select.Option>
            <Select.Option value='25'>pen name</Select.Option>
            <Select.Option value='26'>preferred name</Select.Option>
            <Select.Option value='27'>previous married name</Select.Option>
            <Select.Option value='28'>professional name</Select.Option>
            <Select.Option value='29'>pseudonym</Select.Option>
            <Select.Option value='30'>religious name</Select.Option>
            <Select.Option value='31'>second married name</Select.Option>
            <Select.Option value='32'>stage name</Select.Option>
          </Select>
        );
      return (
        <Form.Item
          {...(index === 0 ? {} : context)}
          label={index === 0 ? 'Alternative names' : ''}
          // required={false}
          key={k}
        >
          <div style={{ border }}>
            {getFieldDecorator(`alternativeNames[${k}].name`, {
              validateTrigger: ['onChange', 'onBlur'],
              initialValue:
                (alternativeNames &&
                  alternativeNames[k] &&
                  alternativeNames[k].name) ||
                '',
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: 'Please input alternative name or delete this field.'
                }
              ]
            })(
              <Input
                placeholder='alternative name'
                style={{ width: '35%', marginRight: 4 }}
              />
            )}
            {getFieldDecorator(`alternativeNames[${k}].type`, {
              validateTrigger: ['onChange', 'onBlur'],
              initialValue:
                (alternativeNames &&
                  alternativeNames[k] &&
                  alternativeNames[k].type &&
                  alternativeNames[k].type + '') ||
                (type == 1 ? '1' : '3'),
              rules: [
                {
                  // initialValue: '0',
                  whitespace: true,
                  required: true,
                  message:
                    'Please select alternative name type or delete this field.'
                }
              ]
            })(select)}
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
                checked={getFieldValue(`alternativeNames[${k}].checked`)}
                onChange={() => {
                  setFieldsValue({
                    [`alternativeNames[${k}].checked`]: !getFieldValue(
                      `alternativeNames[${k}].checked`
                    )
                  });
                }}
              />
            ) : (
              ''
            )}
          </div>
        </Form.Item>
      );
    });
    return (
      <React.Fragment>
        {formItems}
        <Form.Item
          {...(keys.length === 0 ? {} : context)}
          label={keys.length === 0 ? 'Alternative names' : ''}
        >
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

AlternativeName.propTypes = {
  getFieldDecorator: PropTypes.func,
  getFieldValue: PropTypes.func,
  setFieldsValue: PropTypes.func,
  name: PropTypes.string
};

export default AlternativeName;
