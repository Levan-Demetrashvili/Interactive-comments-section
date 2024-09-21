import { useDispatch } from 'react-redux';
import { upVote, downVote } from '../features/comments/comments';
import { VoteCounterPropsTypes } from '../types/VoteCounter.types';
import styles from './VoteCounter.module.css';

export default function VoteCounter({
  id,
  score,
  defaultScore,
  isReply,
}: VoteCounterPropsTypes) {
  const dispatch = useDispatch();
  return (
    <div className={styles.voteCounter}>
      <button
        className={score === defaultScore + 1 ? styles.voted : ''}
        onClick={() => dispatch(upVote({ id, isReply }))}
      >
        <img src='/assets/icons/icon-plus.svg' alt='plus icon' />
      </button>
      <span>{score}</span>
      <button
        className={score === defaultScore - 1 ? styles.voted : ''}
        onClick={() => dispatch(downVote({ id, isReply }))}
      >
        <img src='/assets/icons/icon-minus.svg' alt='minus icon' />
      </button>
    </div>
  );
}
