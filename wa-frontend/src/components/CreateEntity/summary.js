import React from 'react';

import DefaultTextInput from './defaultTextInput';
import CardContainer from './cardContainer';
import { getColor } from '../../utils/getColor';

const Summary = props => {
  let border = getColor(props.status);
  return (
    <CardContainer title='summarys' mark {...props}>
      <div style={{ border }}>
        <DefaultTextInput
          changeText={props.changeText}
          text={props.text}
          rows={6}
        />
      </div>
      {props.alert && (
        <span style={{ color: 'red' }}>{'please fill this blank'}</span>
      )}

      {props.judge ? (
        <div>
          <input
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

export default Summary;
