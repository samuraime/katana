import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getBookmarks, postBookmark, deleteBookmark } from '../actions';
import { Bookmark } from '../types';

const mapStateToProps = (state) => {
  const { home, auth } = state;
  return { ...home, logged: auth.logged };
};

@withRouter
@connect(mapStateToProps)
export default class Index extends Component {
  static propTypes = {
    bookmarks: PropTypes.arrayOf(Bookmark).isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    logged: PropTypes.bool.isRequired,
  }
  componentWillMount() {
    if (!this.props.bookmarks.length) {
      this.props.dispatch(getBookmarks());
    }
  }
  handleAdd = () => {
    const link = window.prompt('添加一个书签链接');
    if (link && /^http/.test(link)) {
      this.props.dispatch(postBookmark(link));
    }
  }
  handleDelete = id => (e) => {
    e.stopPropagation();
    this.props.dispatch(deleteBookmark(id));
  }
  render() {
    const { logged, bookmarks, isFetching } = this.props;
    return (
      <div>
        <h1>Bookmarks</h1>
        <div>{logged && <button onClick={this.handleAdd}>Add</button>}</div>
        {isFetching && <div>loading...</div>}
        <ul>
          {bookmarks.map(bookmark => (
            <li key={bookmark.id}>
              <h3>{bookmark.title}</h3>
              <p>{bookmark.description}</p>
              <address><a href={bookmark.link}>{bookmark.link}</a></address>
              <div>
                {logged && <button onClick={this.handleDelete(bookmark.id)}>Delete</button>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
