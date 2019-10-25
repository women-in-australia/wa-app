import React, { useState, useEffect } from 'react';
import { Form, AutoComplete } from 'antd';
import EntityService from '../../services/EntityService';

const { Option } = AutoComplete;

const RelatedName = props => {
  let {
    getFieldDecorator,
    labelCol,
    wrapperCol,
    name,
    k,
    setFieldsValue,
    value
  } = props;
  //name = woman or organisation
  const [alert, setAlert] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [input, setInput] = useState('');

  console.log();
  useEffect(() => {
    if (value) {
      if (value.name) {
        setInput(value.name);
      }
      if (value.id) {
        setFieldsValue({
          [`${name}Info[${k}].id`]: value.id
        });
      }
    }
    EntityService[`${name}Prompt`](input).then(({ data }) => {
      console.log(data);
      setDataSource(data);
    });
    // EntityService.occupationPrompt(input).then(({ data }) => {
    //   setDataSource(data);
    //   console.log(data);
    //   //   console.log(data);
    // });
  }, [input]);

  const onChange = input => {
    setInput(input);
    console.log(input);
    EntityService[`${name}Check`](input).then(({ data }) => {
      if (!data) {
        setAlert(true);
      } else {
        setAlert(false);
        console.log(data);
      }
      setFieldsValue({
        [`${name}Info[${k}].id`]: data
      });
    });
  };

  //   console.log(`${name}Info[${k}].name`);
  getFieldDecorator(`${name}Info[${k}].id`, { initialValue: undefined });
  return (
    <Form.Item
      label='Name'
      labelCol={labelCol}
      wrapperCol={wrapperCol}
      {...(alert ? { validateStatus: 'error', help: 'name is illegal' } : {})}
    >
      {getFieldDecorator(`${name}Info[${k}].name`, {
        validateTrigger: ['onBlur'],
        initialValue: input,
        rules: [
          {
            required: true,
            whitespace: true,
            message: 'name is required'
          }
        ]
      })(
        <AutoComplete onChange={onChange} placeholder='input name'>
          {dataSource.map(({ eid, name: ename }) => (
            <Option value={ename} key={eid}>
              {ename}
            </Option>
          ))}
        </AutoComplete>
      )}
    </Form.Item>
  );
};

export default RelatedName;
