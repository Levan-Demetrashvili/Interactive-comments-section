import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { addComment } from '../comments/comments';
import styles from './SendComment.module.css';

export default function SendComment() {
  const [text, setText] = useState('');
  const { user, isLoading } = useSelector(
    (store: RootState) => store.currentUser
  );
  const dispatch: AppDispatch = useDispatch();

  function handleClick() {
    if (!text) return;
    dispatch(addComment(text));
    setText('');
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
      <button onClick={handleClick}>SEND</button>
    </div>
  );
}
