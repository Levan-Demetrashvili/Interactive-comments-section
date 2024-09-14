import styles from './VoteCounter.module.css';
type propsTypes = { score: number };

export default function VoteCounter({ score }: propsTypes) {
  return (
    <div className={styles.voteContainer}>
      <button>
        <img src='/assets/icons/icon-plus.svg' alt='plus icon' />
      </button>
      <span>{score}</span>
      <button>
        <img src='/assets/icons/icon-minus.svg' alt='minus icon' />
      </button>
    </div>
  );
}
