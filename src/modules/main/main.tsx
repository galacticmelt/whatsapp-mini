import { useEffect } from 'react';
import { useAppSelector } from '../../store/hooks';
import TopPanel from './top-panel/top-panel';
import ConversationScreen from './conversation/conversation';
import styles from './main.module.scss';

export default function Main() {
  const { messagesError } = useAppSelector((state) => state.messages);
  const { contactError } = useAppSelector((state) => state.contactInfo);

  const errors = [messagesError, contactError];

  useEffect(() => {
    if (errors.some((err) => err.status)) {
      const caughtError = errors.find((err) => err.status);
      throw new Error(caughtError?.value);
    }
  }, [errors]);

  return (
    <div className={styles.main}>
      <TopPanel />
      <ConversationScreen />
    </div>
  );
}
