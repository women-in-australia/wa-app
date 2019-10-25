import React from 'react';

import DefaultTextInput from './defaultTextInput';
import CardContainer from './cardContainer';
import { getColor } from '../../utils/getColor';

const Notes = props => {
  let color = getColor(props.status);
  console.log(props.status);
  console.log(color);
  return (
    <CardContainer title='notes' mark {...props}>
      <div style={{ border: color }}>
        <DefaultTextInput
          changeText={props.changeText}
          text={props.text}
          rows={6}
        />
      </div>
      {props.judge ? (
        <div>
          <input
            className='judge-div'
            type='checkbox'
            checked={props.checked}
            onChange={props.changeStatus}
          />
        </div>
      ) : (
        ''
      )}
    </CardContainer>
  );
};

export default Notes;
