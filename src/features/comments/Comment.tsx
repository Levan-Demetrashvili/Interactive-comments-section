import { CommentPropsTypes } from './comments.types';
import VoteCounter from '../../components/VoteCounter';
import styles from './Comment.module.css';

export default function Comment({ data, isReply = false }: CommentPropsTypes) {
  return (
    <div className={styles.comment}>
      <VoteCounter score={data.score} id={data.id} isReply={isReply} />
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
        <p>
          {isReply && (
            <span className={styles.replyingTo}>@{data.replyingTo}</span>
          )}{' '}
          {data.content}
        </p>
      </div>
    </div>
  );
}
