import React from 'react';
import { Button, Form, Input, Icon, Select, Row, Col } from 'antd';

import Occupation from './occupation';

const { Option } = Select;
class OccupationWrapper extends React.Component {
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
    const {
      getFieldDecorator,
      getFieldValue,
      name,
      setFieldsValue,
      judge
    } = this.props;
    getFieldDecorator(`${name}InfoKey`, { initialValue: [] });
    const keys = getFieldValue(`occupationInfoKey`);
    const occupationInfo = getFieldValue(`occupationInfo`);

    const formItems = keys.map((k, index) => (
      <Row key={k}>
        <Occupation
          judge={judge}
          keys={keys}
          remove={() => this.remove(k)}
          key={`Name+${k}`}
          getFieldDecorator={getFieldDecorator}
          setFieldsValue={setFieldsValue}
          getFieldValue={getFieldValue}
          name={name}
          value={occupationInfo && occupationInfo[k]}
          k={k}
          index={index}
        />
      </Row>
    ));
    return (
      <React.Fragment>
        {formItems}
        <Form.Item
          label={keys.length == 0 ? 'occupation' : ''}
          wrapperCol={
            keys.length == 0
              ? {
                  xs: { span: 24, offset: 0 },
                  sm: { span: 12, offset: 0 }
                }
              : {
                  xs: { span: 24, offset: 0 },
                  sm: { span: 12, offset: 8 }
                }
          }
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

export default OccupationWrapper;
