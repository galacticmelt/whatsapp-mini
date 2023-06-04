import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material';
import styles from './search-input.module.scss';

const StyledIconButton = styled(IconButton)`
  border-radius: 0;
  &:hover {
    background: none;
  }
`;

interface SearchFormProps {
  inputValue: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function SearchForm({ inputValue, handleChange, handleSubmit }: SearchFormProps) {
  return (
    <form className={styles.searchForm} action="" onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles.searchFormInput}
        placeholder="Поиск"
        onChange={handleChange}
        value={inputValue}
      />
      <div className={styles.searchFormButton}>
        <StyledIconButton sx={{ height: 24, width: 24 }} type="submit">
          <SearchIcon sx={{ fontSize: 19 }} />
        </StyledIconButton>
      </div>
    </form>
  );
}
