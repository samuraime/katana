import { useState, useEffect } from 'react';

function useTitle(defaultTitle) {
  const [title, setTitle] = useState(defaultTitle);

  useEffect(() => {
    document.title = title;
  }, [title]);

  return [title, setTitle];
}

export default useTitle;
