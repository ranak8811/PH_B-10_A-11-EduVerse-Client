import { useEffect } from "react";

function useTitle(path) {
  useEffect(() => {
    document.title = `${path} || EduVerse`;
    return () => {};
  }, [path]);
}

export default useTitle;
