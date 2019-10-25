import React from 'react';
import { Button } from 'antd';

class Statement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      iconLoading: false
    };
  }

  enterLoading = () => {
    this.setState({ loading: true });
  };

  render() {
    return (
      <React.Fragment>
        <Button
          type='primary'
          loading={this.state.loading}
          onClick={this.enterLoading}
        >
          Click me!
        </Button>
      </React.Fragment>
    );
  }
}

export default Statement;
