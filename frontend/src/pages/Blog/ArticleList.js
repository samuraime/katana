import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ArticleItem from './ArticleItem';
import { getArticles } from '../../utils/API';
import s from './ArticleList.module.scss';

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const isSuperUser = useSelector(({ user }) => user.superUser);

  useEffect(() => {
    getArticles().then(setArticles);
  }, []);

  return (
    <div className={s.root}>
      {isSuperUser && (
        <div className={s.compose}>
          <Link to="/blog/composer">Compose</Link>
        </div>
      )}
      {articles.map(article => (
        <ArticleItem key={article.id} article={article} />
      ))}
    </div>
  );
}
