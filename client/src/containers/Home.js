import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { getArchives, deleteArchive } from '../actions';
import { Archive } from '../types';
import formatSize from '../utils/size';
import formatIcon from '../utils/icon';
import s from './Home.scss';

const mapStateToProps = (state) => {
  const { home, auth } = state;
  return { ...home, logged: auth.logged };
};

@withRouter
@connect(mapStateToProps)
export default class Home extends Component {
  static propTypes = {
    archives: PropTypes.arrayOf(Archive).isRequired,
    // isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    logged: PropTypes.bool.isRequired,
  }
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      filter: '',
    };

    if (!this.props.archives.length) {
      this.props.dispatch(getArchives());
    }
  }
  handleSearchChange = (event) => {
    this.setState({ search: event.target.value });
  }
  // handleSearch = () => {
  //   this.props.dispatch(getArchives({
  //     name: this.state.search,
  //   }));
  // }
  handleDelete = id => () => {
    this.props.dispatch(deleteArchive(id));
  }
  render() {
    const { logged, archives } = this.props;
    const filteredList = this.state.search
      ? archives.filter(({ name }) => name.includes(this.state.search))
      : archives;

    return (
      <div>
        <div className={s.search}>
          <input type="text" value={this.state.search} onChange={this.handleSearchChange} placeholder="filename or #tagname" />
          {/* <button className="icon" onClick={this.handleSearch}>&#xf002;</button> */}
        </div>
        {filteredList.length ?
          <ul className={s.list}>
            {filteredList.map(archive => (
              <li key={archive.id} className={s.item}>
                <div className={s.left}>
                  <span className={s.title}>{archive.name}</span>
                  <span className={classnames('icon', s.icon)}>{formatIcon(archive.name)}</span>
                  <span className={s.size}>{formatSize(archive.size)}</span>
                </div>
                <div className={s.actions}>
                  <a href={`${archive.link}?attname=${encodeURIComponent(archive.name)}`} download className={classnames('icon', s.action)}>&#xf0ed;</a>
                  {logged && <button className={classnames('icon', s.action)} onClick={this.handleDelete(archive.id)}>&#xf1f8;</button>}
                </div>
              </li>
            ))}
          </ul> :
          <p className={s.empty}>empty!</p>
        }
      </div>
    );
  }
}
