import { normalizeMessageTime } from '../../../../shared/helpers';
import styles from './message-item.module.scss';

interface MessageItemProps {
  isIncoming: boolean;
  text: string;
  time: Date;
}

export default function MessageItem({ isIncoming, text, time }: MessageItemProps) {
  return (
    <div className={isIncoming ? styles.messageWrapperL : styles.messageWrapperR}>
      <div
        className={
          isIncoming
            ? `${styles.messageItem} ${styles.left}`
            : `${styles.messageItem} ${styles.right}`
        }
      >
        <span className={styles.messageItemText}>
          <span>{text}</span>
          <span className={styles.messageItemTime}>{normalizeMessageTime(time)}</span>
        </span>
      </div>
    </div>
  );
}
