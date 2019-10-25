import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Form, Input } from 'antd';

import DefaultInput from './defaultInput';
import { getColor } from '../../utils/getColor';

const { TextArea } = Input;

class PublishResourceForm extends React.Component {
  constructor(props) {
    super(props);
  }

  remove = k => {
    const { getFieldValue, setFieldsValue } = this.props;
    // can use data-binding to get
    const keys = getFieldValue(`publishResourceKey`);
    // We need at least one passenger
    // if (keys.length === 1) {
    //   return;
    // }
    // can use data-binding to set
    setFieldsValue({
      [`publishResourceKey`]: keys.filter(key => key !== k)
    });
  };

  add = () => {
    const { getFieldValue, setFieldsValue } = this.props;
    // can use data-binding to get
    const keys = getFieldValue(`publishResourceKey`);
    const info = getFieldValue(`publishResource`);
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
      [`publishResourceKey`]: nextKeys
    });
  };

  render() {
    const {
      getFieldDecorator,
      getFieldValue,
      judge,
      setFieldsValue
    } = this.props;
    getFieldDecorator(`publishResourceKey`, { initialValue: [] });
    const keys = getFieldValue(`publishResourceKey`);
    const publishResource = getFieldValue(`publishResource`);

    const formItems = keys.map((k, index) => {
      getFieldDecorator(`publishResource[${k}].checked`, {
        initialValue: false
      });

      //set border according to status
      getFieldDecorator(`publishResource[${k}].status`, {
        initialValue:
          publishResource && publishResource[k] && publishResource[k].status
      });
      let status = getFieldValue(`publishResource[${k}].status`);
      let border = getColor(status);

      return (
        <React.Fragment key={`${k}`}>
          <div style={{ border }}>
            <DefaultInput
              getFieldDecorator={getFieldDecorator}
              name='Title'
              value={
                publishResource &&
                publishResource[`${k}`] &&
                publishResource[`${k}`].title
              }
              idName={`publishResource[${k}].title`}
              required
              message='Please input resource title or delete this field '
            />
            <DefaultInput
              value={
                publishResource &&
                publishResource[`${k}`] &&
                publishResource[`${k}`].publisher
              }
              getFieldDecorator={getFieldDecorator}
              name='Publisher'
              idName={`publishResource[${k}].publisher`}
              // required
              message='Please input resource publisher or delete this field '
            />
            <DefaultInput
              value={
                publishResource &&
                publishResource[`${k}`] &&
                publishResource[`${k}`].url
              }
              getFieldDecorator={getFieldDecorator}
              name='Url'
              idName={`publishResource[${k}].url`}
              // required
              message='Please input resource url or delete this field '
            />
            <DefaultInput
              value={
                publishResource &&
                publishResource[`${k}`] &&
                publishResource[`${k}`].date
              }
              getFieldDecorator={getFieldDecorator}
              name='Date'
              idName={`publishResource[${k}].date`}
              // required
              message='Please input resource date or delete this field '
            />
            <Form.Item
              wrapperCol={{ span: 12 }}
              label={<span>{'note'}&nbsp;</span>}
            >
              {getFieldDecorator(`publishResource[${k}].note`, {
                initialValue:
                  (publishResource &&
                    publishResource[`${k}`] &&
                    publishResource[`${k}`].note) ||
                  '',
                // initialValue: moment('1990/01/01', dateFormat)
                // rules: [
                //   { type: 'object', required: true, message: 'Please select time!' }
                // ]
                rules: [
                  {
                    // required: true,
                    message: 'please input note',
                    whitespace: true
                  }
                ]
              })(
                // fileList={this.state.fileList[0]}
                <TextArea rows={3} />
              )}
            </Form.Item>
            {!judge && keys.length > 0 ? (
              <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
                <Button
                  type='dashed'
                  onClick={() => this.remove(k)}
                  style={{ width: '100%' }}
                >
                  <Icon type='minus' /> Delete
                </Button>
              </Form.Item>
            ) : null}
            {judge && keys.length > 0 ? (
              <div>
                <input
                  className='judge-div'
                  type='checkbox'
                  checked={getFieldValue(`publishResource[${k}].checked`)}
                  onChange={() => {
                    setFieldsValue({
                      [`publishResource[${k}].checked`]: !getFieldValue(
                        `publishResource[${k}].checked`
                      )
                    });
                  }}
                />
              </div>
            ) : (
              ''
            )}
          </div>
        </React.Fragment>
      );
    });

    return (
      <React.Fragment>
        {formItems}
        <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
          {judge ? (
            ''
          ) : (
            <Button type='dashed' onClick={this.add} style={{ width: '100%' }}>
              <Icon type='plus' /> Add
            </Button>
          )}
        </Form.Item>
      </React.Fragment>
    );
  }
}

PublishResourceForm.propTypes = {
  getFieldDecorator: PropTypes.func,
  getFieldValue: PropTypes.func,
  setFieldsValue: PropTypes.func
};

export default PublishResourceForm;
