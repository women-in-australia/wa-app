import React from 'react';
import { Button, Form, Input, Icon, Select } from 'antd';
import PropTypes from 'prop-types';

import { LayoutContext } from '../../components/CreateEntity/layoutContext';
// method to get values of multi inputs
// const { keys, names } = values;
// console.log('Received values of form: ', values);
// console.log('Merged values:', keys.map(key => names[key]));

class AlternativeName extends React.Component {
  static contextType = LayoutContext;

  constructor(props) {
    super(props);
  }

  render() {
    const context = this.context;
    console.log(this.context);

    let { alternativeNames, type } = this.props;
    if (!alternativeNames) {
      alternativeNames = [];
    }

    const formItems = alternativeNames.map((alternativeName, index) => (
      <Form.Item
        {...(index === 0 ? {} : context)}
        label={index === 0 ? 'Alternative names' : ''}
        // required={false}
        key={alternativeName.anid}
      >
        <Input
          placeholder='alternative name'
          value={alternativeName.aname}
          style={{ width: '35%', marginRight: 4 }}
        />
        {type == 1 ? (
          <Select
            placeholder='alternative name type'
            value={alternativeName.atype + ''}
            style={{ width: '55%', marginRight: 10 }}
          >
            <Select.Option value='1'>previous name</Select.Option>
            <Select.Option value='2'>subsequent name</Select.Option>
          </Select>
        ) : (
          <Select
            placeholder='alternative name type'
            value={alternativeName.atype + ''}
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
        )}
      </Form.Item>
    ));
    return <React.Fragment>{formItems}</React.Fragment>;
  }
}

export default AlternativeName;
