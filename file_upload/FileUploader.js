import React from 'react';
import PropTypes from 'prop-types';

import UploadButton from './UploadButton';
import axios from 'axios';

const ALLOWED_LIMIT_IN_MB = 1024*1024*1024;

export default class FileUploader extends React.Component {
  constructor(props)
  {
      super(props);
      this.state = {
        files:{}
      };
      this.acceptFile = this.acceptFile.bind(this);
  }

  acceptFile(selectedFile) {

    if(!this.isValidFile(selectedFile))
    {
      return;
    }

    this.updateStatus(selectedFile.name,'New',0);
    this.postFile(selectedFile);
  }

  isValidFile(selectedFile)
  {
    if(selectedFile === undefined)
    {
        this.updateStatus('An Invalid File','Invalid File',0);
        return false;
    }

    if(selectedFile.size > ALLOWED_LIMIT_IN_MB)
    {
      this.updateStatus(selectedFile.name,'Large File',0);
      return false;
    }

    return true;
  }

  updateStatus(key,status,progress)
  {
    const fileItem = {key: key, status:status, progress:progress};
    const files = this.state.files;
    files[key] = fileItem

    this.setState({files:files});
  }

  postFile(selectedFile) {

    const formData = new FormData();
    formData.append('file', selectedFile);

    axios.post(
      this.props.targetURL,
      formData,
      {
        onUploadProgress: (progressEvent) => {
          var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
          this.updateStatus(formData.get('file').name,'Progess',percentCompleted);
        }
      })
      .then(response => {
        this.updateStatus(formData.get('file').name,'Done',100);
      })
      .catch(error => {
        this.updateStatus(formData.get('file').name,'Error',0);
      })
  }

  showUploadHistory() {
    const aList = Object.values(this.state.files);
      return (
        <ul>
        {
          aList.map(
            item => (
              <li key={item.key}>
                {item.key} {item.status} {item.progress}
              </li>
            )
          )
      }
      </ul>
    )
  }

  render() {
    return (
      <div>
        <UploadButton label={this.props.label} onFileSelect={this.acceptFile}/>
        {this.showUploadHistory()}
      </div>
    );
  }
}

FileUploader.propTypes = {
  label: PropTypes.string.isRequired,
  targetURL: PropTypes.string.isRequired
}
