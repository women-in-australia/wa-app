import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'antd';

import DefaultInput from '../../components/CreateEntity/defaultInput';
import DateAndAddressInputWrapper from '../../components/CreateEntity/dateAndAddressInputWrapper';
import AlternativeNameWrapper from '../../components/CreateEntity/alternativeNameWrapper';

const BaseInformation = props => {
  // console.log(contextType);

  const {
    getFieldDecorator,
    getFieldValue,
    setFieldsValue,
    judge,
    statusName,
    changeStatusName,
    statusStart,
    changeStatusStart,
    statusEnd,
    changeStatusEnd,
    type
  } = props;
  return (
    <React.Fragment>
      <DefaultInput
        getFieldDecorator={getFieldDecorator}
        name='Organisation Name'
        message={'please input Organization Name'}
        disabled={judge}
        required
      />
      <DefaultInput
        getFieldDecorator={getFieldDecorator}
        name='Binomial name'
        status={statusName}
        changeStatus={changeStatusName}
        message={'please input binomial name'}
        judge={judge}
      />
      <AlternativeNameWrapper
        getFieldDecorator={getFieldDecorator}
        getFieldValue={getFieldValue}
        setFieldsValue={setFieldsValue}
        name='Alternative name'
        judge={judge}
        type={type}
      />
      <DateAndAddressInputWrapper
        status={statusStart}
        changeStatus={changeStatusStart}
        getFieldDecorator={getFieldDecorator}
        name='start'
        judge={judge}
      />
      <DateAndAddressInputWrapper
        status={statusEnd}
        changeStatus={changeStatusEnd}
        getFieldDecorator={getFieldDecorator}
        name='end'
        judge={judge}
      />
    </React.Fragment>
  );
};

BaseInformation.propTypes = {
  getFieldDecorator: PropTypes.func,
  getFieldValue: PropTypes.func,
  setFieldsValue: PropTypes.func
};
export default BaseInformation;
