import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTitle } from '../../hooks';
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

  useTitle(article ? article.title : '');

  if (!article) {
    return null;
  }

  const { html } = article;
  return (
    <div className={s.root}>
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
