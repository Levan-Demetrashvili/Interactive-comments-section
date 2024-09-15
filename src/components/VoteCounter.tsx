import { useDispatch } from 'react-redux';
import { upVote, downVote } from '../features/comments/comments';
import styles from './VoteCounter.module.css';

type propsTypes = { score: number; id: number; isReply: boolean };

export default function VoteCounter({ id, score, isReply }: propsTypes) {
  const dispatch = useDispatch();
  return (
    <div className={styles.voteContainer}>
      <button onClick={() => dispatch(upVote({ id, isReply }))}>
        <img src='/assets/icons/icon-plus.svg' alt='plus icon' />
      </button>
      <span>{score}</span>
      <button onClick={() => dispatch(downVote({ id, isReply }))}>
        <img src='/assets/icons/icon-minus.svg' alt='minus icon' />
      </button>
    </div>
  );
}
