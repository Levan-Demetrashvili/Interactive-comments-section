import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { addComment } from '../comments/comments';
import Button from '../../components/Button';
import styles from './SendComment.module.css';

export default function SendComment({
  type = 'comment',
  data,
}: {
  type?: string;
  data?: any;
}) {
  const [text, setText] = useState('');
  const { user, isLoading } = useSelector((store: RootState) => store.currentUser);
  const dispatch: AppDispatch = useDispatch();

  function sendComment() {
    if (!text) return;
    dispatch(addComment(text));
    setText('');
  }

  function addReply() {
    if (!text) return data.onAddReply();
    data.onAddReply();
    dispatch(addComment(text, data.id, data.to));
  }

  if (!user || isLoading) return null;

  return (
    <div className={styles.box}>
      <img src={user.image.webp} alt={user.username + ' avatar'} />
      <textarea
        name='comment'
        placeholder='Add a comment...'
        value={text}
        onChange={e => setText(e.target.value)}
      ></textarea>
      <Button onClick={type === 'reply' ? addReply : sendComment}>
        {type === 'reply' ? 'reply' : 'send'}
      </Button>
    </div>
  );
}
