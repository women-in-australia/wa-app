import React from 'react';
import { Button, Form, Input, Icon, Select } from 'antd';

import { LayoutContext } from '../../components/CreateEntity/layoutContext';

class Occupation extends React.Component {
  static contextType = LayoutContext;

  constructor(props) {
    super(props);
  }

  render() {
    const context = this.context;

    let { occupations } = this.props;

    if (!occupations) {
      occupations = [];
    }
    const formItems = occupations.map((occupation, index) => {
      return (
        <Form.Item
          {...(index === 0 ? {} : context)}
          label={index === 0 ? 'Occupation' : ''}
          key={occupation.oid}
        >
          <Input
            value={occupation && occupation.oname}
            placeholder='occupation'
          />
        </Form.Item>
      );
    });
    return <React.Fragment>{formItems}</React.Fragment>;
  }
}

export default Occupation;
