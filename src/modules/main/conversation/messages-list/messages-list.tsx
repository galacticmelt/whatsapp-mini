import { useAppSelector } from '../../../../store/hooks';
import { CircularProgress } from '@mui/material';
import MessageItem from '../message-item/message-item';
import {
  INCOMING_MESSAGE,
  INCOMING_MESSAGE_API,
  NO_WHATSAPP_INFO,
  START_MESSAGING
} from '../../../../shared/constants';
import styles from './messages-list.module.scss';

export default function MessagesList() {
  const { contactLoading, hasWhatsApp } = useAppSelector((state) => state.contactInfo);
  const { messages } = useAppSelector((state) => state.messages);

  if (contactLoading) {
    return (
      <div className={styles.noMessages}>
        <CircularProgress />
      </div>
    );
  }
  return (
    <div className={styles.messagesList}>
      {!hasWhatsApp && (
        <div className={styles.warningItem}>
          <span className={styles.warningItemText}>{NO_WHATSAPP_INFO}</span>
        </div>
      )}
      {hasWhatsApp && !messages.length && (
        <div className={styles.warningItem}>
          <span className={styles.warningItemText}>{START_MESSAGING}</span>
        </div>
      )}
      <div className={styles.messagesWrapper}>
        {messages &&
          messages.map((message) => {
            return (
              <MessageItem
                key={message.idMessage}
                isIncoming={
                  message.type === INCOMING_MESSAGE || message.type === INCOMING_MESSAGE_API
                    ? true
                    : false
                }
                text={message.textMessage}
                time={message.timestamp}
              />
            );
          })}
      </div>
    </div>
  );
}
