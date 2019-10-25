import React from 'react';
import PropTypes from 'prop-types';
import { Upload, Icon, Form, Button, DatePicker, Input } from 'antd';
import moment from 'moment';

import DefaultInput from './defaultInput';
import MyUpload from './myUpload';
import MyDatePicker from './myDatePicker';
import { getColor } from '../../utils/getColor';

const { TextArea } = Input;

class DigitalResourceForm extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   fileList: { 0: [] }
    // };
  }

  // check = (rule, value, callback) => {
  //   // console.log(2);
  //   if (value.fileList.length && value.fileList[0].index) {
  //     callback();
  //     return;
  //   }
  //   callback('File should not be empty!');
  // };

  // beforeUpload(file, fileList) {
  //   console.log(111);
  //   // const fileList = info.fileList;
  //   console.log(fileList);

  //   if (fileList.length > 1) {
  //     return false;
  //   }
  //   // console.log(fileList);
  // }

  remove = k => {
    const { getFieldValue, setFieldsValue } = this.props;
    // can use data-binding to get
    const keys = getFieldValue(`digitalResourceKey`);
    // We need at least one passenger
    // if (keys.length === 1) {
    //   return;
    // }
    // can use data-binding to set
    setFieldsValue({
      [`digitalResourceKey`]: keys.filter(key => key !== k)
    });
  };

  add = () => {
    const { getFieldValue, setFieldsValue } = this.props;

    // can use data-binding to get
    const keys = getFieldValue(`digitalResourceKey`);
    const info = getFieldValue(`digitalResource`);
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
      [`digitalResourceKey`]: nextKeys
    });
  };

  onPanelChange(value) {
    console.log(1);
    console.log(value);
  }

  render() {
    const {
      getFieldDecorator,
      getFieldValue,
      judge,
      setFieldsValue
    } = this.props;
    getFieldDecorator(`digitalResourceKey`, { initialValue: [] });
    // getFieldDecorator(`digitalResource`, { initialValue: [] });
    // getFieldDecorator(`file`, { initialValue: [] });
    const keys = getFieldValue(`digitalResourceKey`);
    const digitalResource = getFieldValue(`digitalResource`);
    const file = getFieldValue(`file`);
    console.log(file);

    const check = this.check;

    // console.log(getFieldValue(`digitalResource`));

    const formItems = keys.map((k, index) => {
      getFieldDecorator(`digitalResource[${k}].checked`, {
        initialValue: false
      });

      //set border
      getFieldDecorator(`digitalResource[${k}].status`, {
        initialValue:
          digitalResource && digitalResource[k] && digitalResource[k].status
      });

      let status = getFieldValue(`digitalResource[${k}].status`);
      let border = getColor(status);

      return (
        <React.Fragment key={k}>
          <div style={{ border }}>
            <DefaultInput
              getFieldDecorator={getFieldDecorator}
              name='Title'
              value={
                digitalResource &&
                digitalResource[`${k}`] &&
                digitalResource[`${k}`].title
              }
              idName={`digitalResource[${k}].title`}
              message='Please input file title or delete this field '
              required
            />
            <DefaultInput
              getFieldDecorator={getFieldDecorator}
              name='Date'
              value={
                digitalResource &&
                digitalResource[`${k}`] &&
                digitalResource[`${k}`].date
              }
              idName={`digitalResource[${k}].date`}
              message='Please input file date or delete this field '
              // required
            />
            <DefaultInput
              value={file && file[k]}
              getFieldDecorator={getFieldDecorator}
              name='Url'
              idName={`file[${k}]`}
              required
              message='Please input resource url or delete this field '
            />
            <DefaultInput
              getFieldDecorator={getFieldDecorator}
              value={
                digitalResource &&
                digitalResource[`${k}`] &&
                digitalResource[`${k}`].repository
              }
              name='Repository'
              idName={`digitalResource[${k}].repository`}
              message='Please input file repository or delete this field '
              // required
            />
            {/* <DefaultInput
          getFieldDecorator={getFieldDecorator}
          name='File Date'
          idName={}
        /> */}
            <Form.Item
              wrapperCol={{ span: 12 }}
              label={<span>{'note'}&nbsp;</span>}
            >
              {getFieldDecorator(`digitalResource[${k}].note`, {
                // initialValue: moment('1990/01/01', dateFormat)
                // rules: [
                //   { type: 'object', required: true, message: 'Please select time!' }
                // ]
                initialValue:
                  (digitalResource &&
                    digitalResource[`${k}`] &&
                    digitalResource[`${k}`].note) ||
                  '',
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

            {/* <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
            {getFieldDecorator(`file[${k}]`, {
              initialValue: {
                fileList: fileList || []
              },
              rules: [
                {
                  validator: check
                  //自定义
                }
              ]
            })(
              // fileList={this.state.fileList[0]}
              <MyUpload k={k} />
            )}
          </Form.Item> */}
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
                  checked={getFieldValue(`digitalResource[${k}].checked`)}
                  onChange={() => {
                    setFieldsValue({
                      [`digitalResource[${k}].checked`]: !getFieldValue(
                        `digitalResource[${k}].checked`
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

DigitalResourceForm.propTypes = {
  getFieldDecorator: PropTypes.func,
  getFieldValue: PropTypes.func,
  setFieldsValue: PropTypes.func
};

export default DigitalResourceForm;
