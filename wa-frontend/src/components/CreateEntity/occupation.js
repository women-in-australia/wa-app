import React, { useState, useEffect } from 'react';
import { Form, Input, Icon, AutoComplete } from 'antd';
import ProTypes from 'prop-types';

import { EntityService } from '../../services/';
import { getColor } from '../../utils/getColor';
const { Option } = AutoComplete;

const Occupation = props => {
  //name: given name
  /*
  idName means the parent component assign the field name on purpose. 
  You can get input value through idName
  */
  const idName = props.idName ? props.idName : props.name;

  const {
    getFieldDecorator,
    getFieldValue,
    name,
    judge,
    required,
    keys,
    remove,
    k,
    setFieldsValue,
    wrapperCol,
    index,
    value
  } = props;

  const [dataSource, setDataSource] = useState([]);
  const [input, setInput] = useState('');
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    // EntityService.occupationPrompt(input).then(({ data }) => {
    //   setDataSource(data);
    //   //   console.log(data);
    // });
    if (value) {
      if (value.name) {
        setInput(value.name);
      }
      if (value.id) {
        setFieldsValue({ [`${name}Info[${k}].id`]: value.id });
      }
    }
    console.log(name);
    EntityService[`${name}Prompt`](input).then(({ data }) => {
      console.log(data);
      setDataSource(data);
    });
  }, [input]);

  const onSelect = selectValue => {
    console.log(selectValue);
  };

  const onChange = input => {
    console.log(input);
    setInput(input);
    EntityService.occupationCheck(input).then(({ data }) => {
      if (data == null) {
        // changeOccupation({ oid: undefined, oname: input });
        setAlert(true);
      } else {
        // changeOccupation({ oid: data, oname: input });
        setAlert(false);
      }
      setFieldsValue({ [`${name}Info[${k}].id`]: data });
    });
  };

  //   const onSearch = searchText => {

  //     console.log(searchText);
  //   };

  // console.log(required);
  const occupation = props.value;
  console.log(occupation);
  getFieldDecorator(`${name}Info[${k}].id`, { initialValue: undefined });
  getFieldDecorator(`${name}Info[${k}].checked`, { initialValue: false });
  getFieldDecorator(`${name}Info[${k}].status`, {
    initialValue: occupation && occupation.status
  });
  let status = getFieldValue(`${name}Info[${k}].status`);
  console.log(status);
  let border = getColor(status);

  return (
    <Form.Item
      // label={<span>{name}&nbsp;</span>}
      wrapperCol={
        index == 0
          ? {
              xs: { span: 24, offset: 0 },
              sm: { span: 12, offset: 0 },
              style: { border }
            }
          : {
              xs: { span: 24, offset: 0 },
              sm: { span: 12, offset: 8 },
              style: { border }
            }
      }
      label={index == 0 ? `${name}` : ''}
      {...(alert
        ? { validateStatus: 'error', help: 'occupation is illegal' }
        : {})}
    >
      {getFieldDecorator(`${name}Info[${k}].name`, {
        validateTrigger: ['onBlur'],
        initialValue: input,
        rules: [
          {
            required: true,
            whitespace: true,
            message: 'occupation is required'
          }
        ]
      })(
        <AutoComplete
          style={{ width: '70%', marginRight: '10%' }}
          onSelect={onSelect}
          //   onSearch={onSearch}
          onChange={onChange}
          placeholder='input here'
        >
          {dataSource.map(({ oid, oname }) => (
            <Option value={oname} key={oid}>
              {oname}
            </Option>
          ))}
        </AutoComplete>
      )}
      {!judge && keys.length > 0 ? (
        <Icon
          className='dynamic-delete-button'
          type='minus-circle-o'
          onClick={remove}
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
  );
};

Occupation.propTypes = {
  getFieldDecorator: ProTypes.func,
  setFieldsValue: ProTypes.func,
  name: ProTypes.string
};

export default Occupation;
