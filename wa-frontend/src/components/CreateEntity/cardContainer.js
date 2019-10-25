import React from 'react';
import { Card, Icon, Tooltip } from 'antd';
import PropTypes from 'prop-types';

class CardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      card: false
    };
  }

  render() {
    const { mark, judge } = this.props;
    const { card } = this.state;

    const tips = {
      summarys: 'describing entity, one paragraph only',
      details: 'describing entity, multiple paragraphs allowed',
      notes: 'other notes, this will not be published',
      'Digital Resource': 'related digital resources ',
      'Publish Resource': 'related published resources',
      'Archival Resource': 'related archival resources',
      'Related entities': 'related organisations and women'
    };

    const title = (
      <React.Fragment>
        {this.props.required ? <span style={{ color: 'red' }}>*</span> : ''}
        {this.props.title}
        {mark ? (
          <Tooltip title={tips[this.props.title]}>
            <Icon type='question' />
          </Tooltip>
        ) : (
          ''
        )}
      </React.Fragment>
    );
    return (
      <Card
        title={title}
        // extra={<a href="#">More</a>}
        style={{ margin: '10 auto' }}
      >
        {this.props.children}
      </Card>
    );
  }
}

CardContainer.propTypes = {
  title: PropTypes.string
};

export default CardContainer;
