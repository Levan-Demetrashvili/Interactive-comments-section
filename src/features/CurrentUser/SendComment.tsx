import styles from './SendComment.module.css';

export default function SendComment() {
  return (
    <div className={styles.box}>
      <img src='/assets/images/image-juliusomo.webp' alt='avatar' />
      <textarea name='comment' placeholder='Add a comment...'></textarea>
      <button>SEND</button>
    </div>
  );
}
