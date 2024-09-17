import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteComment } from './comments';
import { CommentPropsTypes } from './comments.types';
import VoteCounter from '../../components/VoteCounter';
import Modal from '../../components/Modal';
import styles from './Comment.module.css';

export default function Comment({
  data,
  isCurrentUser,
  isReply = false,
}: CommentPropsTypes) {
  return (
    <div className={styles.comment}>
      <VoteCounter
        id={data.id}
        score={data.score}
        defaultScore={data.defaultScore}
        isReply={isReply}
      />
      <div className={styles.content}>
        <section>
          <div className={styles.user}>
            <img
              className={styles.avatar}
              src={data.user.image.webp}
              alt={data.user.username + 'avatar'}
            />
            <strong>{data.user.username}</strong>
            {isCurrentUser && <p>you</p>}

            <span>{data.createdAt}</span>
          </div>
          {isCurrentUser ? (
            <CurrentUserButtons id={data.id} />
          ) : (
            <ReplyButton />
          )}
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

function CurrentUserButtons({ id }: { id: number }) {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  function handleCancel() {
    setShowModal(false);
  }

  function handleDelete(id: number) {
    setShowModal(false);
    dispatch(deleteComment(id));
  }
  return (
    <>
      <div className={styles.currentUserBtns}>
        <button className={styles.deleteBtn} onClick={() => setShowModal(true)}>
          <img src='/assets/icons/icon-delete.svg' alt='delete icon' />
          <p>Delete</p>
        </button>
        <button className={styles.editBtn}>
          <img src='/assets/icons/icon-edit.svg' alt='edit icon' /> <p>Edit</p>
        </button>
      </div>
      {showModal && (
        <Modal onCancel={handleCancel} onDelete={() => handleDelete(id)} />
      )}
    </>
  );
}

function ReplyButton() {
  return (
    <div className={styles.reply}>
      <button>
        <img src='/assets/icons/icon-reply.svg' alt='reply icon' />
        <p>Reply</p>
      </button>
    </div>
  );
}
