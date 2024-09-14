import { useSelector } from 'react-redux';
import { RootState } from './store';

import Comment from './features/comments/Comment';
import SendComment from './features/CurrentUser/SendComment';
import styles from './App.module.css';

function App() {
  const comments = useSelector((store: RootState) => store.comments.comments);
  return (
    <div className={styles.chat}>
      {comments?.map(comment => (
        <div key={comment.id} className={styles.commentContainer}>
          <Comment data={comment} />
          {comment.replies[0] && (
            <div className={styles.repliesCont}>
              <hr />
              <div className={styles.replies}>
                {comment.replies.map((reply: Record<string, any>) => (
                  <Comment key={reply.id} isReply={true} data={reply} />
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
      <SendComment />
    </div>
  );
}

export default App;
