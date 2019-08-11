import React from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../../types';
import { dateEn } from '../../utils/date';
import s from './ArticleItem.module.scss';

function ArticleItem({ article, ...otherProps }) {
  const { id, title, createdAt } = article;

  return (
    <article className={s.root} {...otherProps}>
      <div className={s.meta}>
        <time className="mono-font">{dateEn(createdAt)}</time>
        {/* <ul className={s.categories}>
          {categories.map((category) => (
            <li key={category} className={s.categoryItem}>
              <Link className={s.categoryItemLink} to={`/blog/category/${category}`}>
                {category}
              </Link>
            </li>
          ))}
        </ul> */}
      </div>
      <h4>
        <Link className={s.title} to={`/blog/${id}`}>
          {title}
        </Link>
      </h4>
      {/* <div className={s.excerpt} dangerouslySetInnerHTML={{ __html: content }} /> */}
    </article>
  );
}

ArticleItem.propTypes = {
  article: Article.isRequired,
};

export default ArticleItem;
