import { useSelector } from 'react-redux';
import { RootState } from './store';

import Comment from './features/comments/Comment';
import styles from './App.module.css';

function App() {
  const comments = useSelector((store: RootState) => store.comments.comments);
  return (
    <div className={styles.chat}>
      {comments?.map(comment => (
        <Comment key={comment.id} data={comment} />
      ))}
    </div>
  );
}

export default App;
