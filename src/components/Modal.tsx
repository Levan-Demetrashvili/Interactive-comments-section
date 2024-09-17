import styles from './Modal.module.css';

interface ModalPropsTypes {
  onCancel: () => void;
  onDelete: () => void;
}

export default function Modal({ onCancel, onDelete }: ModalPropsTypes) {
  return (
    <div className={styles.modalContainer}>
      <div className={styles.overlay} onClick={onCancel}></div>
      <div className={styles.modal}>
        <h1>Delete comment</h1>
        <p>
          Are you sure you want to delete this comment? This will remove the
          comment and can’t be undone.
        </p>
        <div className={styles.buttons}>
          <button className={styles.cancelBtn} onClick={onCancel}>
            NO, CANCEL
          </button>
          <button className={styles.deleteBtn} onClick={onDelete}>
            YES, DELETE
          </button>
        </div>
      </div>
    </div>
  );
}
