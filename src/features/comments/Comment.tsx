import { CommentPropsTypes } from './comments.types';
import styles from './Comment.module.css';

export default function Comment({ data }: CommentPropsTypes) {
  return (
    <div className={styles.comment}>
      <div className={styles.voteContainer}>
        <button>
          <img src='/assets/icons/icon-plus.svg' alt='plus icon' />
        </button>
        <span>{data.score}</span>
        <button>
          <img src='/assets/icons/icon-minus.svg' alt='minus icon' />
        </button>
      </div>
      <div className={styles.content}>
        <section>
          <div className={styles.user}>
            <img
              className={styles.avatar}
              src={data.user.image.webp}
              alt={data.user.username + 'avatar'}
            />
            <strong>{data.user.username}</strong>
            <span>{data.createdAt}</span>
          </div>
          <div className={styles.reply}>
            <img src='/assets/icons/icon-reply.svg' alt='reply icon' />
            <p>Reply</p>
          </div>
        </section>
        <p>{data.content}</p>
      </div>
    </div>
  );
}
