import React from 'react';
import PropTypes from 'prop-types';
import { Upload, Icon, Form, Button, DatePicker, Input } from 'antd';
import moment from 'moment';

import DefaultInput from './defaultInput';
import MyUpload from './myUpload';
import MyDatePicker from './myDatePicker';
import { getColor } from '../../utils/getColor';

const { TextArea } = Input;

//

//archival resource form
class ArchivalResourceForm extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   fileList: { 0: [] }
    // };
  }

  //remove an archival resource
  remove = k => {
    const { getFieldValue, setFieldsValue } = this.props;
    // can use data-binding to get
    const keys = getFieldValue(`archivalResourceKey`);
    // We need at least one passenger
    // if (keys.length === 1) {
    //   return;
    // }
    // can use data-binding to set
    setFieldsValue({
      [`archivalResourceKey`]: keys.filter(key => key !== k)
    });
  };

  //add an archival resource
  add = () => {
    const { getFieldValue, setFieldsValue } = this.props;
    // can use data-binding to get
    const keys = getFieldValue(`archivalResourceKey`);
    const info = getFieldValue(`archivalResource`);
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
      [`archivalResourceKey`]: nextKeys
    });
  };

  render() {
    const {
      getFieldDecorator,
      getFieldValue,
      judge,
      setFieldsValue
    } = this.props;
    getFieldDecorator(`archivalResourceKey`, { initialValue: [] });
    const keys = getFieldValue(`archivalResourceKey`);
    const archivalResource = getFieldValue(`archivalResource`);

    const formItems = keys.map((k, index) => {
      getFieldDecorator(`archivalResource[${k}].checked`, {
        initialValue: false
      });

      getFieldDecorator(`archivalResource[${k}].status`, {
        initialValue:
          archivalResource && archivalResource[k] && archivalResource[k].status
      });

      let status = getFieldValue(`archivalResource[${k}].status`);
      let border = getColor(status);

      return (
        <React.Fragment key={`${k}`}>
          <div style={{ border }}>
            <DefaultInput
              value={
                archivalResource &&
                archivalResource[`${k}`] &&
                archivalResource[`${k}`].title
              }
              getFieldDecorator={getFieldDecorator}
              name='Title'
              idName={`archivalResource[${k}].title`}
              required
              message='Please input resource title or delete this field '
            />
            <DefaultInput
              value={
                archivalResource &&
                archivalResource[`${k}`] &&
                archivalResource[`${k}`].repository
              }
              getFieldDecorator={getFieldDecorator}
              name='Repository'
              idName={`archivalResource[${k}].repository`}
              // required
              message='Please input repository or delete this field '
            />
            <DefaultInput
              value={
                archivalResource &&
                archivalResource[`${k}`] &&
                archivalResource[`${k}`].url
              }
              getFieldDecorator={getFieldDecorator}
              name='Url'
              idName={`archivalResource[${k}].url`}
              // required
              message='Please input resource url or delete this field '
            />
            <DefaultInput
              value={
                archivalResource &&
                archivalResource[`${k}`] &&
                archivalResource[`${k}`].date
              }
              getFieldDecorator={getFieldDecorator}
              name='Date'
              idName={`archivalResource[${k}].date`}
              // required
              message='Please input resource date or delete this field '
            />
            <DefaultInput
              value={
                archivalResource &&
                archivalResource[`${k}`] &&
                archivalResource[`${k}`].abstract
              }
              getFieldDecorator={getFieldDecorator}
              name='Abstract'
              idName={`archivalResource[${k}].abstract`}
              // required
              message='Please input resource abstract or delete this field '
            />
            <Form.Item
              wrapperCol={{ span: 12 }}
              label={<span>{'note'}&nbsp;</span>}
            >
              {getFieldDecorator(`archivalResource[${k}].note`, {
                initialValue:
                  (archivalResource &&
                    archivalResource[`${k}`] &&
                    archivalResource[`${k}`].note) ||
                  '',
                // rules: [
                //   { type: 'object', required: true, message: 'Please select time!' }
                // ]
                rules: [
                  {
                    // required: true,
                    message: 'Please input note or delete this field ',
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
                  checked={getFieldValue(`archivalResource[${k}].checked`)}
                  onChange={() => {
                    setFieldsValue({
                      [`archivalResource[${k}].checked`]: !getFieldValue(
                        `archivalResource[${k}].checked`
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

ArchivalResourceForm.propTypes = {
  getFieldDecorator: PropTypes.func,
  getFieldValue: PropTypes.func,
  setFieldsValue: PropTypes.func
};

export default ArchivalResourceForm;
