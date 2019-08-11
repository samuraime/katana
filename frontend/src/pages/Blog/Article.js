import React, { useState, useEffect } from 'react';
import { useTitle } from '../../hooks';
import { getArticle } from '../../utils/API';
import { shape, string } from '../../types';
import s from './Article.module.scss';

function Article({ match }) {
  const [article, setArticle] = useState(null);
  const { id } = match.params;

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

  const { content } = article;
  return (
    <article className={s.root} dangerouslySetInnerHTML={{ __html: content }} />
  );
}

Article.propTypes = {
  match: shape({
    params: shape({ id: string }),
  }).isRequired,
};

export default Article;
