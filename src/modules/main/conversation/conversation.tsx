import { useAppSelector } from '../../../store/hooks';
import MessageForm from './message-form/message-form';
import MessagesList from './messages-list/messages-list';
import { CircularProgress } from '@mui/material';
import { DevicesIcon } from '../../../assets/coded-svg-icons';
import { STARTER_INFO, STARTER_TITLE } from '../../../shared/constants';
import styles from './conversation.module.scss';

export default function Conversation() {
  const { phoneNumber, contactLoading } = useAppSelector((state) => state.contactInfo);

  return (
    <div className={styles.conversation}>
      {phoneNumber ? (
        <>
          <MessagesList />
          <MessageForm />
        </>
      ) : contactLoading ? (
        <CircularProgress size={60} />
      ) : (
        <div className={styles.starterInfo}>
          <DevicesIcon />
          <h1>{STARTER_TITLE}</h1>
          <p>{STARTER_INFO}</p>
        </div>
      )}
    </div>
  );
}
