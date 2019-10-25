import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'antd';

import DefaultInput from '../../components/CreateEntity/defaultInput';
import DateAndAddressInputWrapper from '../../components/CreateEntity/dateAndAddressInputWrapper';
import AlternativeNameWrapper from '../../components/CreateEntity/alternativeNameWrapper';
import Occupation from '../../components/CreateEntity/occupation';
import OccupationWrapper from '../../components/CreateEntity/occupationWrapper';

const BaseInformation = props => {
  // console.log(contextType);

  const {
    getFieldDecorator,
    getFieldValue,
    setFieldsValue,
    judge,
    changeOccupation,
    occupation,
    occupationAlert,
    changeStatusStart,
    changeStatusEnd,
    changeStatusName,
    statusStart,
    statusEnd,
    statusName,
    type
  } = props;

  return (
    <React.Fragment>
      <DefaultInput
        getFieldDecorator={getFieldDecorator}
        name='Family Name'
        message={'please input Family Name'}
        required
        disabled={judge}
      />
      <DefaultInput
        getFieldDecorator={getFieldDecorator}
        name='Given Name'
        message={'please input Given Name'}
        required
        disabled={judge}
      />
      {/* <DefaultInput
        getFieldDecorator={getFieldDecorator}
        name='Occupation'
        message={'please input Occupation'}
        judge
        required
      /> */}
      <OccupationWrapper
        getFieldDecorator={getFieldDecorator}
        setFieldsValue={setFieldsValue}
        getFieldValue={getFieldValue}
        name='occupation'
        required
        judge={judge}
      />
      <DefaultInput
        getFieldDecorator={getFieldDecorator}
        name='Titles/Honours'
        status={statusName}
        changeStatus={changeStatusName}
        message={'please input titles and honors'}
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
        name='born'
        judge={judge}
      />
      <DateAndAddressInputWrapper
        status={statusEnd}
        changeStatus={changeStatusEnd}
        getFieldDecorator={getFieldDecorator}
        name='dead'
        judge={judge}
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
