import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

const buttonStyle = {
  marginLeft: 4,
};

const EditableField = (props) => {
  const { editor, onSave, children } = props;

  const [isEditing, setIsEditing] = useState(false);
  
  const onEdit = () => { setIsEditing(true); };
  const onCancel = () => { setIsEditing(false); };
  const _onSave = e => {
    setIsEditing(false);
    onSave(e);
  };

  return <>
    { isEditing
      ? <>
        {editor}
        <Button onClick={onCancel} style={buttonStyle}>Cancel</Button>
        <Button type='primary' onClick={_onSave} style={buttonStyle}>Save</Button>
      </>
      : <>
        {children}
        <Button type='link' icon='edit' onClick={onEdit}>Edit</Button>
      </>
    }
    
  </>;
};

EditableField.propTypes = {
  editor: PropTypes.node,
  onSave: PropTypes.func,
  children: PropTypes.node,
};

export default EditableField;