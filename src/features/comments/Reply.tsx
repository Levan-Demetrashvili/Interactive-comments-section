import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import styles from './Reply.module.css';

import { RootState, AppDispatch } from '../../store';
import { addComment } from './comments';

type ReplyPropsTypes = { id: number; to: string; onAddReply: () => void };

export default function Reply({ id, to, onAddReply }: ReplyPropsTypes) {
  const [text, setText] = useState('');
  const user = useSelector((store: RootState) => store.currentUser.user);
  const dispatch: AppDispatch = useDispatch();

  function addReply() {
    if (!text) return;
    onAddReply();
    dispatch(addComment(text, id, to));
  }

  if (!user) return null;

  return (
    <div className={styles.box}>
      <img src={user.image.webp} alt={user.username + ' avatar'} />
      <textarea name='reply' value={text} onChange={e => setText(e.target.value)} />
      <Button onClick={addReply}>reply</Button>
    </div>
  );
}
