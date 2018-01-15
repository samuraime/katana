import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { upload as uploadFile } from 'qiniu-up';
import { addArchives, updateArchive, removeArchive, postArchive, deleteArchive } from '../actions';
import utils from '../utils';
import formatSize from '../utils/size';
import { Archive } from '../types';
import s from './Upload.scss';

export const [READY, UPLOADING, DONE, ERROR] = [0, 1, 2, 3];

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

const mapStateToProps = (state) => {
  const { upload } = state;
  return upload;
};

@withRouter
@connect(mapStateToProps)
export default class Upload extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    archives: PropTypes.arrayOf(Archive).isRequired,
  }
  state = {
    isDragOver: false,
  }
  handleDragCancel = (e) => {
    e.preventDefault();
    this.setState({ isDragOver: false });
  }
  handlePick = () => {
    const pickEvent = new MouseEvent('click');
    this.fileInput.dispatchEvent(pickEvent);
  }
  handleDragOver = (e) => {
    e.preventDefault();
    this.setState({ isDragOver: true });
  }
  handleDragLeave = () => {
    this.setState({ isDragOver: false });
  }
  handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.mergeArchives(e.dataTransfer.files);
  }
  handleChange = (e) => {
    this.mergeArchives(e.target.files);
  }
  handleDelete = ({ id, key }) => () => {
    const { dispatch } = this.props;
    if (id) {
      dispatch(deleteArchive(id));
    } else {
      dispatch(removeArchive(key));
    }
  }
  mergeArchives(files) {
    const { archives, dispatch } = this.props;
    const newArchives = Array.from(files).filter(file => (
      !archives.find(a => a.key === fileTempKey(file))
    )).map(wrapFile);
    dispatch((d, getState) => {
      d(addArchives(newArchives));
      this.upload(d, getState().upload.archives);
    });
  }
  upload = (dispatch, archives) => {
    archives.filter(({ status }) => status === READY).forEach((archive) => {
      dispatch(updateArchive(archive.key, {
        status: UPLOADING,
      }));
      uploadFile(archive.originFile, {
        token: async () => {
          const { token } = await utils.get('/upload/token');
          return token;
        },
        onProgress: (uploaded) => {
          dispatch(updateArchive(archive.key, {
            uploaded,
          }));
        },
      }).then(({ hash }) => {
        dispatch(postArchive({
          hash,
          name: archive.name,
          size: archive.size,
          type: archive.type,
        }, archive.key)).then(({ response }) => (
          dispatch(updateArchive(archive.key, {
            hash,
            status: DONE,
            ...response,
          }))
        ));
      }).catch(() => {
        dispatch(updateArchive(archive.key, {
          status: ERROR,
        }));
      });
    });
  }
  render() {
    const { archives } = this.props;
    return (
      <div
        className={classnames(s.root, { [s.isDragOver]: this.state.isDragOver })}
        onDragOver={this.handleDragOver}
        onDragLeave={this.handleDragLeave}
        onDrop={this.handleDragCancel}
      >
        <div
          className={s.target}
          onClick={this.handlePick}
          onDrop={this.handleDrop}
        >
          <p className={classnames(s.upload, 'icon')}>&#xf0ee;</p>
          <p>Drop your files here!</p>
          <input ref={(ref) => { this.fileInput = ref; }} className={s.file} type="file" multiple onChange={this.handleChange} />
        </div>
        {!!archives.length &&
          <div className={s.list}>
            {archives.map(a => (
              <div key={a.key} className={s.item}>
                <div className={s.name}>{a.name}{a.size}</div>
                <div className={s.progressContainer}>
                  <div
                    className={classnames(s.progress, { [s.uploading]: a.status === UPLOADING })}
                    style={{ width: `${a.uploaded / a.size * 100}%` }}
                  />
                  <div className={s.text}>{formatSize(a.uploaded)} / {formatSize(a.size)}</div>
                </div>
                <div className={s.action}>
                  {a.status === ERROR && <button className={classnames(s.action, 'icon')}>&#xf021;</button>}
                  {a.status === DONE && <button className={classnames(s.action, 'icon')}>&#xf040;</button>}
                  <button className={classnames(s.action, 'icon')} onClick={this.handleDelete(a)}>&#xf00d;</button>
                </div>
              </div>
            ))}
          </div>
        }
      </div>
    );
  }
}
