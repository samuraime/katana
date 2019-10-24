import React, { useState } from 'react';
import marked from 'marked';
import classnames from 'classnames';
import { useHistory } from 'react-router-dom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import s from './ArticleComposer.module.scss';
import { postArticle } from '../../utils/API';
import 'github-markdown-css';

function ArticleComposer() {
  const [title, setTitle] = useState('');
  const [markdown, setMarkdown] = useState('');
  const [content, setContent] = useState('');
  const [previewMode, setPreviewMode] = useState(false);
  const history = useHistory();

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  function handleContentChange(event) {
    setMarkdown(event.target.value);
  }

  function handlePreview(event) {
    const { checked } = event.target;
    setPreviewMode(checked);
    if (checked) {
      setContent(marked(markdown));
    }
  }

  function handleSubmit() {
    postArticle({
      title,
      markdown,
      content: marked(markdown),
      categories: ['essay'],
    }).then(() => {
      history.push({ pathname: '/blog' });
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
      <div className={s.alignRight}>
        <FormControlLabel
          control={
            <Switch
              checked={previewMode}
              onChange={handlePreview}
              value
              color="primary"
            />
          }
          label={previewMode ? 'Preview' : 'Compose'}
        />
      </div>
      {previewMode ? (
        <div
          className={classnames('markdown-body', s.previewBody)}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      ) : (
        <TextField
          label="Content"
          multiline
          rows={20}
          value={markdown}
          onChange={handleContentChange}
          // className={s.text}
          margin="normal"
          variant="outlined"
          className={s.hidden}
        />
      )}
      <div className={s.alignRight}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
}

export default ArticleComposer;
