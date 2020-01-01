import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { getArticle } from '../../utils/API';
import s from './Article.module.scss';

function Article() {
  const [article, setArticle] = useState(null);
  const isSuperUser = useSelector(({ user }) => user.superUser);
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      return;
    }

    getArticle(id).then(setArticle);
  }, [id]);

  if (!article) {
    return null;
  }

  const { title, html } = article;
  return (
    <div className={s.root}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {isSuperUser && (
        <div className={s.edit}>
          <Link to={`/blog/${id}/edit`}>edit</Link>
        </div>
      )}
      <article dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

export default Article;
