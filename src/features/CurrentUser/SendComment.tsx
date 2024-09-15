import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import styles from './SendComment.module.css';

export default function SendComment() {
  const { user, isLoading } = useSelector(
    (store: RootState) => store.currentUser
  );
  if (!user || isLoading) return null;
  return (
    <div className={styles.box}>
      <img src={user.image.webp} alt={user.username + ' avatar'} />
      <textarea name='comment' placeholder='Add a comment...'></textarea>
      <button>SEND</button>
    </div>
  );
}
