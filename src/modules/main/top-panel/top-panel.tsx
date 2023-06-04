import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useMenu } from '../../../shared/hooks';
import { IconButton, Avatar } from '@mui/material';
import HiddenMenu from './hidden-menu/hidden-menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchInput from './search-input/search-input';
import { authActions } from '../../../store/features/auth/auth.slice';
import { contactInfoActions } from '../../../store/features/contactInfo/contactInfo.slice';
import { messagesActions } from '../../../store/features/messages/messages.slice';
import { formatPhoneNumber } from '../../../shared/helpers';
import { EMPTY_NAME, EMPTY_STRING } from '../../../shared/constants';
import styles from './top-panel.module.scss';

export default function TopPanel() {
  const { idInstance, apiTokenInstance } = useAppSelector((state) => state.auth);
  const { chatId, name, phoneNumber } = useAppSelector((state) => state.contactInfo);
  const { open, anchorEl, anchorHandler, closeHandler } = useMenu();
  const [contactSearchValue, setContactSearchValue] = useState<string>(EMPTY_STRING);
  const [notificationCounter, setNotificationCounter] = useState(0);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (chatId) {
      dispatch(messagesActions.listenForMessages({ idInstance, apiTokenInstance })).then(() => {
        setNotificationCounter((prev) => prev + 1);
      });
    }
  }, [chatId, notificationCounter]);

  const handleSearchValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContactSearchValue(e.currentTarget.value);
  };

  const handleRequestContactInfo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setContactSearchValue(EMPTY_STRING);
    let numberValid;
    if (contactSearchValue) {
      numberValid = formatPhoneNumber(contactSearchValue);
    }
    if (!numberValid) {
      return;
    }
    dispatch(
      contactInfoActions.checkWhatsAppStatus({
        idInstance,
        apiTokenInstance,
        phoneNumber: Number(contactSearchValue)
      })
    );
    dispatch(
      contactInfoActions.setContactInfo({
        idInstance,
        apiTokenInstance,
        chatId: numberValid
      })
    );
    dispatch(messagesActions.unsetMessages());
  };

  const handleLogOut = () => {
    dispatch(authActions.logOut());
    dispatch(contactInfoActions.unsetContactInfo());
  };

  return (
    <div className={styles.topPanel}>
      <div className={styles.infoWrapper}>
        <div className={styles.contactInfo}>
          <Avatar sx={{ height: 40, width: 40 }} />
          <div className={styles.nameAndNumber}>
            <span>{name && name !== EMPTY_NAME ? name : phoneNumber}</span>
            <span className={styles.phoneNumber}>
              {name && name !== EMPTY_NAME ? phoneNumber : null}
            </span>
          </div>
        </div>
        <div className={styles.showMenuButton}>
          <IconButton onClick={anchorHandler} disableRipple sx={{ height: 1, width: 1 }}>
            <MoreVertIcon fontSize="medium" />
          </IconButton>
        </div>
        <HiddenMenu
          anchorEl={anchorEl}
          closeHandler={closeHandler}
          open={open}
          options={[{ name: 'Выйти', handler: handleLogOut }]}
        />
      </div>
      <div className={styles.searchWrapper}>
        <SearchInput
          inputValue={contactSearchValue}
          handleChange={handleSearchValueChange}
          handleSubmit={handleRequestContactInfo}
        />
      </div>
    </div>
  );
}
