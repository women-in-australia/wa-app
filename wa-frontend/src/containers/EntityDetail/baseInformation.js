import React from 'react';
import PropTypes from 'prop-types';
import { Row, Form, Input } from 'antd';

import DefaultInput from '../../components/CreateEntity/defaultInput';
import DateAndAddressInputWrapper from '../../components/CreateEntity/dateAndAddressInputWrapper';
import AlternativeNameWrapper from './alternativeNameWrapper';
import OccupationWrapper from './occupationWrapper';
// import Occupation from '../../components/CreateEntity/occupation';

const BaseInformation = props => {
  // console.log(contextType);

  const {
    judge,
    name,
    subname,
    occupations,
    startDate,
    birthPlace,
    birthState,
    birthCountry,
    endDate,
    deathPlace,
    deathState,
    deathCountry,
    alternativeNames,
    type
  } = props;
  console.log(type);
  return (
    <React.Fragment>
      <Form.Item label={<span>{'Name'}&nbsp;</span>}>
        <Input value={name} placeholder='name' />
      </Form.Item>
      <Form.Item
        label={
          <span>{type == '1' ? 'Titles/Honours' : 'Binomial name'}&nbsp;</span>
        }
      >
        <Input value={subname} placeholder='subname' />
      </Form.Item>
      {type == '1' ? <OccupationWrapper occupations={occupations} /> : ''}

      <DateAndAddressInputWrapper
        name='born'
        value={{
          startDate,
          birthPlace,
          birthCountry,
          birthState
        }}
      />
      <DateAndAddressInputWrapper
        name='dead'
        value={{
          endDate,
          deathCountry,
          deathPlace,
          deathState
        }}
      />
      <AlternativeNameWrapper
        alternativeNames={alternativeNames}
        name='Alternative name'
        judge
        type={type}
      />
    </React.Fragment>
  );
};

BaseInformation.propTypes = {
  getFieldDecorator: PropTypes.func,
  getFieldValue: PropTypes.func,
  setFieldsValue: PropTypes.func,
  changeOccupation: PropTypes.func
};
export default BaseInformation;
