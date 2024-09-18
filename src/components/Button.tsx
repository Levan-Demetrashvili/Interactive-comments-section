import { ButtonPropsTypes } from '../types/Button.types';
import styles from './Button.module.css';

export default function Button({ children, onClick }: ButtonPropsTypes) {
  return (
    <button className={styles.btn} onClick={onClick}>
      {children}
    </button>
  );
}
