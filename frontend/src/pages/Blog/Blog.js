import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AuthRoute from '../../components/AuthRoute';
import Article from './Article';
import ArticleList from './ArticleList';
import ArticleComposer from './ArticleComposer';

function Blog() {
  return (
    <Switch>
      <Route exact path="/blog" component={ArticleList} />
      <AuthRoute
        path={['/blog/compose', '/blog/:id/edit']}
        component={ArticleComposer}
      />
      <Route path="/blog/:id" component={Article} />
    </Switch>
  );
}

export default Blog;
