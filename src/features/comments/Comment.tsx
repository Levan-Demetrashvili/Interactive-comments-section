import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteComment, editComment } from './comments';
import { CommentPropsTypes, ContentTextPropsTypes } from './comments.types';
import VoteCounter from '../../components/VoteCounter';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import styles from './Comment.module.css';

export default function Comment({
  data,
  isCurrentUser,
  isReply = false,
}: CommentPropsTypes) {
  const [isEditable, setIsEditable] = useState(false);

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
            <CurrentUserButtons id={data.id} onEdit={() => setIsEditable(true)} />
          ) : (
            <ReplyButton />
          )}
        </section>
        <ContentText
          data={data}
          isReply={isReply}
          isEditable={isEditable}
          setIsEditable={setIsEditable}
        />
      </div>
    </div>
  );
}

function ContentText({
  data,
  isReply,
  isEditable,
  setIsEditable,
}: ContentTextPropsTypes) {
  const [text, setText] = useState(data.content);
  const dispatch = useDispatch();

  function updateComment(id: number, text: string) {
    setIsEditable(false);
    dispatch(editComment({ id, text }));
  }
  return (
    <>
      <pre>
        {isReply && <span className={styles.replyingTo}>@{data.replyingTo}</span>}{' '}
        {isEditable ? (
          <textarea
            autoFocus={true}
            value={text}
            onFocus={moveCaretAtEnd}
            onChange={e => setText(e.target.value)}
          ></textarea>
        ) : (
          text
        )}
      </pre>
      {isEditable && <Button onClick={() => updateComment(data.id, text)}>update</Button>}
    </>
  );
}

function CurrentUserButtons({ id, onEdit }: { id: number; onEdit: () => void }) {
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
        <button className={styles.editBtn} onClick={onEdit}>
          <img src='/assets/icons/icon-edit.svg' alt='edit icon' /> <p>Edit</p>
        </button>
      </div>
      {showModal && <Modal onCancel={handleCancel} onDelete={() => handleDelete(id)} />}
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

function moveCaretAtEnd(e: React.FocusEvent<HTMLTextAreaElement>) {
  const temp_value = e.target.value;
  e.target.value = '';
  e.target.value = temp_value;
}
