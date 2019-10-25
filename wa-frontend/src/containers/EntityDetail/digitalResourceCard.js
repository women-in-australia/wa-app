import React from 'react';

import CardContainer from '../../components/CreateEntity/cardContainer';
import DigitalResourceForm from './digitalResourceForm';

const DigitalResourceCard = props => {
  return (
    <CardContainer title='Digital Resource' mark>
      <DigitalResourceForm {...props} />
    </CardContainer>
  );
};

export default DigitalResourceCard;
