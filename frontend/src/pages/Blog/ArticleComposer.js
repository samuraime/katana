import React, { useState, useEffect } from 'react';
import marked from 'marked';
import classnames from 'classnames';
import { useHistory, useParams } from 'react-router-dom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import s from './ArticleComposer.module.scss';
import { getArticle, putArticle } from '../../utils/API';
import 'github-markdown-css';

function ArticleComposer() {
  const [title, setTitle] = useState('');
  const [markdown, setMarkdown] = useState('');
  const [html, setHTML] = useState('');
  const [previewMode, setPreviewMode] = useState(false);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getArticle(id).then(article => {
        setTitle(article.title);
        setMarkdown(article.draft || article.markdown);
        setPreviewMode(false);
      });
    }
  }, [id]);

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
      setHTML(marked(markdown));
    }
  }

  function save(isPublish) {
    return putArticle({
      id,
      title,
      markdown,
      draft: isPublish ? '' : markdown,
      html: isPublish ? marked(markdown) : '',
      isPublish,
      categories: ['essay'],
    });
  }

  async function handleSave() {
    const saved = await save(false);
    history.replace({ pathname: `/blog/${saved.id}/edit` });
  }

  async function handleSubmit() {
    await save(true);
    history.push({ pathname: '/blog' });
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
          dangerouslySetInnerHTML={{ __html: html }}
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
        <Button variant="contained" color="secondary" onClick={handleSave}>
          Save Draft
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
}

export default ArticleComposer;
