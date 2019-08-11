import { useEffect } from 'react';

function useTitle(title) {
  useEffect(() => {
    if (!title) {
      return;
    }
    document.title = title;
  }, [title]);
}

export default useTitle;
