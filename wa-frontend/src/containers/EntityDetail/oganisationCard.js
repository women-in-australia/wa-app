import React from 'react';

import CardContainer from '../../components/CreateEntity/cardContainer';
import RelatedEntityBaseForm from './relatedEntityBaseForm';

const OrganisationCard = props => {
  return (
    <CardContainer title='Organisation'>
      <RelatedEntityBaseForm {...props} name='organisation' />
    </CardContainer>
  );
};

export default OrganisationCard;
