import { useState } from 'react';
import { useAppSelector } from '../../../../store/hooks';
import { useMenu } from '../../../../shared/hooks';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { IconButton } from '@mui/material';
import styles from './message-form.module.scss';
import EmojiBoard from '../emoji-board/emoji-board';
import { sendMessage } from '../../../../api/notifications-api';
import { EMPTY_STRING } from '../../../../shared/constants';
import styled from '@emotion/styled';

const StyledIconButton = styled(IconButton)`
  border-radius: 0;
  &:hover {
    background: none;
  }
`;

export default function MessageForm() {
  const { idInstance, apiTokenInstance } = useAppSelector((state) => state.auth);
  const { chatId, hasWhatsApp } = useAppSelector((state) => state.contactInfo);
  const [messageText, setMessageText] = useState('');

  const { open, anchorEl, anchorHandler, closeHandler } = useMenu();

  const handleAddEmoji = (number: number) => {
    setMessageText((prevState) => prevState + String.fromCodePoint(number));
  };

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await sendMessage({ idInstance, apiTokenInstance, chatId, message: messageText });
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw e;
      }
    }
    setMessageText(EMPTY_STRING);
  };

  return (
    <div className={hasWhatsApp ? styles.formWrapper : `${styles.formWrapper} ${styles.disabled}`}>
      <div className={styles.attachmentWrapper}>
        <IconButton sx={{ p: 0 }} onClick={anchorHandler}>
          <InsertEmoticonIcon />
        </IconButton>
        <EmojiBoard
          anchorEl={anchorEl}
          closeHandler={closeHandler}
          open={open}
          addEmojiHandler={handleAddEmoji}
        />
      </div>
      <form className={styles.messageForm} onSubmit={handleSendMessage}>
        <input
          type="text"
          className={styles.messageInput}
          placeholder="Введите сообщение"
          value={messageText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessageText(e.target.value)}
        />
        <StyledIconButton type="submit">
          <SendRoundedIcon />
        </StyledIconButton>
      </form>
    </div>
  );
}
