import React, { useState } from 'react';
import marked from 'marked';
import 'github-markdown-css';

function Composer() {
  const [markdown, setMarkdown] = useState('');
  const [preview, setPreview] = useState('');

  function handleChange(event) {
    setMarkdown(event.target.value);
  }

  function handlePrevew() {
    setPreview(marked(markdown));
  }

  return (
    <div>
      <textarea onChange={handleChange} value={markdown} />
      <button type="button" onClick={handlePrevew}>
        Preview
      </button>
      <div
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: preview }}
      />
    </div>
  );
}

export default Composer;
