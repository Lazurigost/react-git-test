// Search.tsx
import React, { useRef } from 'react';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';

interface SearchProps {
  username: string;
  setUsername: (username: string) => void;
  handleSearch: () => void;
}

const SearchContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center', // Center items vertically
  margin: 20,
  width: '60%',
}));

const InputWrapper = styled('div')(({ theme }) => ({
  flex: 1,
  backgroundColor: '#333', // Dark background color
  borderRadius: theme.shape.borderRadius,
  padding: '10px', // Add padding to the input container
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'white', // Change text color to white for visibility
  width: '100%',
  '& .MuiInputBase-input': {
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%', // Full width of the container
    color: 'white', // Ensure input text is white
    backgroundColor: 'transparent', // Transparent background for input
    border: 'none', // Remove border
    outline: 'none', // Remove outline
  },
}));

const BootstrapButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 12px',
  border: '1px solid',
  lineHeight: 1.5,
  marginLeft: 10, // Add margin to separate from input
  minWidth: '150px',
  backgroundColor: '#0063cc',
  borderColor: '#0063cc',
  color: 'white', // Change button text color to white
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

export default Search;