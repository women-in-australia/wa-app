import React from 'react';

import CardContainer from '../../components/CreateEntity/cardContainer';
import PublishResourceForm from './publishResourceForm';

const PublishResourceCard = props => {
  return (
    <CardContainer title='Publish Resource' mark>
      <PublishResourceForm {...props} />
    </CardContainer>
  );
};

export default PublishResourceCard;
