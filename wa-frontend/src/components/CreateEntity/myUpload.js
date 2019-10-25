import React from 'react';
import { connect } from 'react-redux';
import { Upload, Icon, Form, Button } from 'antd';

const mapStateToProps = state => {
  const { token } = state.session;
  return {
    token
  };
};

class MyUpload extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    const { fileList } = props.value;
    this.state = {
      fileList
    };
    // console.log(this.state.fileList);
  }

  triggerChange = changedValue => {
    // Should provide an event to pass value to Form.
    const { onChange } = this.props;
    if (onChange) {
      onChange({
        ...this.state,
        ...changedValue
      });
    }
  };

  handleChange = info => {
    // let fileList = [...info.fileList];
    console.log(info);
    let curFile = info.file;
    // console.log(file.uid);
    // let uid = file.uid;
    // let newArr = fileList[uid];
    // this.setState({ fileList: { ...fileList, [uid]: newArr.slice() } });
    // // let uid = file.uid;
    if (curFile.status == 'done') {
      if (curFile.response) {
        let { response } = curFile;
        if (response.code == 200) {
          curFile.url = response.data.url;
          curFile.index = response.data.index;
          this.setState({ fileList: [curFile] });
          let fileList = this.state.fileList;
          console.log(fileList[0]);
          this.triggerChange({ fileList });
        } else if (response.code == 401) {
          //redirect
        } else {
          this.setState({ fileList: [curFile] });
        }
      }
    } else {
      // console.log(22);
      // console.log(fileEach)
      // console.log(this.state.fileList[i])
      console.log(1);
      this.setState({ fileList: [curFile] });
      //   for (let i in fileList) {
      //     let fileEach = fileList[i];
      //     this.setState({ fileList: { ...fileList, [i]: fileEach.slice() } });
      //     console.log(fileEach);
      //     console.log(this.state.fileList[i]);
      //   }
    }

    // console.log(this.state.fileList);

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    // fileList = fileList.slice(-1);
    // let fileList = fileList.map(file => {
    //   if (file.response) {
    //     // Component will show file.url as link
    //     file.url = file.response.data.url;
    //   }
    //   return file;
    // });
  };

  getProps = id => {
    const { token } = this.props;
    const props = {
      name: `file`,
      action: 'http://www.womeninau.club/api/entity/file',
      data: {
        index: id
      },

      headers: { authorization: `Bearer ${token}` },
      beforeUpload: this.beforeUpload,
      // index: 0,
      // headers: {
      //   authorization: 'authorization-text',
      // },
      onChange: this.handleChange
    };
    return props;
  };

  render() {
    const { k } = this.props;
    console.log(k);
    return (
      <Upload {...this.getProps(k)} fileList={this.state.fileList}>
        <Button>
          <Icon type='upload' /> Click to Upload
        </Button>
      </Upload>
    );
  }
}

export default connect(mapStateToProps)(MyUpload);
