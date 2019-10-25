import React from 'react';
import PropType from 'prop-types';

import { Input } from 'antd';

const { TextArea } = Input;

class DefaultTextInput extends React.Component {
  static getDerivedStateFromProps(nextProps) {
    // Should be a controlled component.
    // console.log(nextProps);
    if ('text' in nextProps) {
      return {
        text: nextProps.text
      };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
  }

  change = e => {
    const changeText = this.props.changeText;
    console.log(1);
    let text = e.target.value;
    // this.setState({ text });
    changeText(text);
  };

  render() {
    const { rows, changeText } = this.props;
    const _self = this;
    return (
      <TextArea
        rows={this.props.rows}
        value={this.state.text}
        {...(changeText ? { onChange: _self.change } : {})}
      />
    );
  }
}

DefaultTextInput.propTypes = {
  rows: PropType.number
};

export default DefaultTextInput;
