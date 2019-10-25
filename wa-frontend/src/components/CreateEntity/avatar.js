import React from 'react';
import { connect } from 'react-redux';

import { Upload, Icon, message, Checkbox } from 'antd';
import PropTypes from 'prop-types';

// import './style.less';

const mapStateToProps = state => {
  console.log(state);
  const { token } = state.session;
  return {
    token
  };
};

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

class Avatar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      remoteUrl: '',
      avatar: false
    };
  }

  componentWillReceiveProps(nextProps) {
    let { imageUrl } = nextProps;
    if (imageUrl) {
      this.setState({ imageUrl });
    }
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      console.log(info.file);
      let response = info.file.response;
      if (response) {
        if (response.code == 200) {
          let remoteUrl = response.data.url;
          console.log(remoteUrl);
          this.setState({ remoteUrl });
          console.log(this.props);
          this.props.changeAvatar(remoteUrl);
        } else if (response.code == 401) {
          //image is too large
        } else {
        }
      } else {
        //may not happen
      }
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => {
        this.setState({
          imageUrl,
          loading: false
        });
      });
    }
  };

  render() {
    const uploadButton = (
      <div style={{ fontSize: '3em' }}>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className='ant-upload-text'>Upload</div>
      </div>
    );
    const { imageUrl, avatar } = this.state;

    //if we should add judge(check and close) to the view
    const { judge, token } = this.props;

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
          name='file'
          action='http://www.womeninau.club/api/entity/file'
          data={{ index: 1 }}
          headers={{ authorization: `Bearer ${token}` }}
          beforeUpload={beforeUpload}
          onChange={this.handleChange}
          className='upload-wrapper'
          disabled={judge}
        >
          <div className='upload-div'>
            {imageUrl ? (
              <img src={imageUrl} alt='avatar' style={{ width: '100%' }} />
            ) : (
              uploadButton
            )}
          </div>
        </Upload>
      </React.Fragment>
    );
  }
}

Avatar.propTypes = {
  changeAvatar: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(Avatar);
