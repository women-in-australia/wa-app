import React from 'react';
import PropTypes from 'prop-types';

import CardContainer from '../../components/CreateEntity/cardContainer';
import WomanCard from './womanCard';
import OganisationCard from './oganisationCard';

class RelatedEntities extends React.Component {
  constructor(props) {
    super(props);
    // this.setState();
  }

  render() {
    return (
      <CardContainer mark title='Related entities'>
        <WomanCard {...this.props} />
        <OganisationCard {...this.props} />
      </CardContainer>
    );
  }
}

RelatedEntities.propTypes = {};
export default RelatedEntities;
