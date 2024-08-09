import React, { useRef } from 'react';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
//Создание свойств для поиска
interface SearchProps {
  username: string;
  setUsername: (username: string) => void;
  handleSearch: () => void;
}
//Стилизация строки поиска
const SearchContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center', 
  margin: 20,
  width: '60%',
}));

const InputWrapper = styled('div')(({ theme }) => ({
  flex: 1,
  backgroundColor: '#fff', 
  borderRadius: theme.shape.borderRadius,
  padding: '10px', 
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'black', 
  width: '100%',
  '& .MuiInputBase-input': {
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%', 
    color: 'black', 
    backgroundColor: 'transparent', 
    border: 'none', 
    outline: 'none', 
    '&::placeholder': {
      color: '#555', 
    },
  },
}));
//Стилизация кнопки поиска
const BootstrapButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 20,
  padding: '10px 12px', 
  height: '100%', 
  border: '1px solid',
  lineHeight: 2.2,
  marginLeft: 10, 
  minWidth: '150px',
  backgroundColor: '#0063cc',
  borderColor: '#0063cc',
  color: 'white', 
  '&:hover': {
    backgroundColor: '#0069d9',
    borderColor: '#0062cc',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#0062cc',
    borderColor: '#005cbf',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
});

const Search: React.FC<SearchProps> = ({ username, setUsername, handleSearch }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <SearchContainer>
      <InputWrapper>
        <StyledInputBase
          inputRef={inputRef}
          placeholder="Введите поисковый запрос"
          inputProps={{ 'aria-label': 'search' }}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />
      </InputWrapper>
      <BootstrapButton variant="contained" className='Button' onClick={handleSearch}>
        Искать
      </BootstrapButton>
    </SearchContainer>
    
  );
};
//Экспорт строки поиска для дальнейшего использования в другом месте программы
export default Search;
