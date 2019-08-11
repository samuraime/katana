import React, { useState } from 'react';
import marked from 'marked';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import s from './ArticleComposer.module.scss';
import { postArticle } from '../../utils/API';
import 'github-markdown-css';

function ArticleComposer() {
  const [title, setTitle] = useState('');
  const [markdown, setMarkdown] = useState('');
  const [content, setContent] = useState('');

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  function handleContentChange(event) {
    setMarkdown(event.target.value);
  }

  function handlePrevew() {
    setContent(marked(markdown));
  }

  function handleSubmit() {
    postArticle({
      title,
      markdown,
      content: marked(markdown),
      categories: ['essay'],
    });
  }

  return (
    <div className={s.root}>
      <TextField
        label="Title"
        value={title}
        onChange={handleTitleChange}
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="Content"
        multiline
        rows={20}
        value={markdown}
        onChange={handleContentChange}
        // className={s.text}
        margin="normal"
        variant="outlined"
      />
      <div
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <Button variant="contained" color="primary" onClick={handlePrevew}>
        Preview
      </Button>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
}

export default ArticleComposer;
