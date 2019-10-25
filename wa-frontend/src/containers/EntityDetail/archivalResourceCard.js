import React from 'react';

import CardContainer from '../../components/CreateEntity/cardContainer';
import ArchivalResourceForm from './archivalResourceForm';

const DigitalResourceCard = props => {
  return (
    <CardContainer title='Archival Resource' mark>
      <ArchivalResourceForm {...props} />
    </CardContainer>
  );
};

export default DigitalResourceCard;
