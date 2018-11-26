import React from 'react';
import PropTypes from 'prop-types';

const fileStyle = {
    visibility:'hidden',
    width:'0px',
    height:'0px'
}

export default class UploadButton extends React.Component {

  constructor(props) {
    super(props);

    this.handleUpload = this.handleUpload.bind(this);
    this.showFileDialog = this.showFileDialog.bind(this);
  }

  handleUpload() {
      this.props.onFileSelect(this.file.files[0]);
  }

  showFileDialog() {
    this.file.click();
  }

  render() {
    return(
      <div>
        <input style={fileStyle} ref={node => this.file = node} type='file' onChange={this.handleUpload} />
        <button className='upload' onClick={this.showFileDialog}>{this.props.label}</button>
      </div>
    )
  }
}

UploadButton.propTypes = {
  label: PropTypes.string.isRequired,
  onFileSelect: PropTypes.func.isRequired
}
