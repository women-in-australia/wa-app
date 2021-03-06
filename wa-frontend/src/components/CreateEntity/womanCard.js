import React from 'react';

import CardContainer from './cardContainer';
import RelatedEntityBaseForm from './relatedEntityBaseForm';

const WomanCard = props => {
  return (
    <CardContainer title='Women'>
      <RelatedEntityBaseForm {...props} name='woman' />
    </CardContainer>
  );
};

export default WomanCard;
