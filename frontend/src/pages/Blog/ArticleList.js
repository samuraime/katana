import React, { useState, useEffect } from 'react';
import ArticleItem from './ArticleItem';
import { getArticles } from '../../utils/API';
import s from './ArticleList.module.scss';

export default function ArticleList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticles().then(setArticles);
  }, []);

  return (
    <div className={s.root}>
      {articles.map(article => (
        <ArticleItem key={article.id} article={article} />
      ))}
    </div>
  );
}
