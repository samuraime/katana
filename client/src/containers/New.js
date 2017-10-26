import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import upload from '../utils/upload';

const mapStateToProps = (state) => {
  const { home, auth } = state;
  return { ...home, logged: auth.logged };
};

const [READY, UPLOADING, DONE, ERROR] = [0, 1, 2, 3];
const fileTempKey = ({ size, name, lastModified }) => `${name}-${size}-${lastModified}`;
const wrapFile = (file) => {
  const { size, name, type } = file;
  return {
    key: fileTempKey(file),
    name,
    size,
    type,
    uploaded: 0,
    status: READY,
    originFile: file,
    hash: '',
  };
};

@withRouter
@connect(mapStateToProps)
export default class Index extends Component {
  state = {
    archives: [],
  }
  updateOne = (archive, command) => {
    const index = this.state.archives.findIndex(a => a.key === archive.key);
    this.setState(update(this.state, {
      archives: {
        [index]: command,
      },
    }));
  }
  handleChange = (event) => {
    const { archives } = this.state;
    const newArchives = Array.from(event.target.files).filter(file => (
      !this.state.archives.find(a => a.key === fileTempKey(file))
    )).map(wrapFile);
    this.setState({
      archives: [...archives, ...newArchives],
    }, this.upload);
  }
  upload = async () => {
    const { archives } = this.state;
    archives.filter(a => a.status === READY).forEach((archive) => {
      this.updateOne(archive, {
        status: { $set: UPLOADING },
      });
      upload(archive.originFile, {
        onProgress: (uploaded) => {
          this.updateOne(archive, {
            uploaded: { $set: uploaded },
          });
        },
      }).then(({ hash }) => {
        this.updateOne(archive, {
          hash: { $set: hash },
          status: { $set: DONE },
        });
      }).catch(() => {
        this.updateOne(archive, {
          status: { $set: ERROR },
        });
      });
    });
  }
  render() {
    const { archives } = this.state;
    return (
      <div>
        <h1>New</h1>
        <input type="file" multiple onChange={this.handleChange} />
        <p>1234</p>
        <div>
          {archives.map(a => (
            <div key={a.key}>
              {a.name} - {a.size} {a.uploaded} / {a.size} -
              {a.status === DONE && <a>Edit</a>}
              <a>Delete</a>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
