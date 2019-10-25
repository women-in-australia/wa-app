import React from 'react';

import { Upload, Icon, message } from 'antd';
import PropTypes from 'prop-types';

// import './style.less';

class Avatar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    //if we should add judge(check and close) to the view
    const { imageUrl } = this.props;

    return (
      // style={{
      //     display: "flex",
      //     alignItems: "center",
      //     justifyContent: "center",
      //     width: 300,
      //     height: 300
      //   }}
      // my--upload-container
      <React.Fragment>
        <Upload
          name='avatar'
          listType='picture-card'
          showUploadList={false}
          disabled
          className='upload-wrapper'
        >
          <div className='upload-div'>
            <img src={imageUrl} alt='avatar' style={{ width: '100%' }} />
          </div>
        </Upload>
      </React.Fragment>
    );
  }
}

Avatar.propTypes = {};

export default Avatar;
