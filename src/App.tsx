import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserRepos } from './state/repo/repoSlice'; // Adjust the path as necessary
import { RootState, AppDispatch } from './state/store'; // Import the types

function App() {
  const [username, setUsername] = useState<string>('');
  const [selectedRepo, setSelectedRepo] = useState<any | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const { repos, loading, error } = useSelector((state: RootState) => state.repo);

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'white',
    margin: 20,
    marginLeft: 20,
    width: '60%',
    display: 'flex',
    justifyContent: 'left',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '200%',
    },
  }));

  const BootstrapButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    margin: 20,
    minWidth: '150px',
    backgroundColor: '#0063cc',
    borderColor: '#0063cc',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
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

  const handleSearch = () => {
    if (username.trim()) {
      dispatch(fetchUserRepos(username));
      setIsSearching(true)
    }
  };

  const handleRowClick = (repo: any) => {
    setSelectedRepo(repo);
    console.log(repo);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Search>
          <StyledInputBase
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
        </Search>
        <BootstrapButton variant="contained" className='Button' onClick={handleSearch}>
          Искать
        </BootstrapButton>
      </header>

      <div className='BodyDiv'>
        
      
        {isSearching ? (
          <div className="table-container">
            {loading && <div>Загружаем данные...</div>}
            {error && <div>Произошла ошибка: {error}</div>}
            {repos.length > 0 && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Название</TableCell>
                  <TableCell>Язык</TableCell>
                  <TableCell>Число форков</TableCell>
                  <TableCell>Число звёзд</TableCell>
                  <TableCell>Дата обновления</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {repos.map((repo) => (
                  <TableRow key={repo.id} onClick={() => handleRowClick(repo)}>
                    <TableCell>{repo.name}</TableCell>
                    <TableCell>{repo.language || 'N/A'}</TableCell>
                    <TableCell>{repo.forks || 0}</TableCell>
                    <TableCell>{repo.stars || 0}</TableCell>
                    <TableCell>{repo.description || 'No description'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>)}
        </div>
          ) : (
          <div className='BodyDiv'>
            <text className='WelcomeText'>Добро пожаловать!</text>
          </div>
          )}

        {selectedRepo && (
          <div className="selected-repo-container">
            <h2>{selectedRepo.name}</h2>
            <p>Stars: {selectedRepo.stars || 0}</p>
            <p>Languages: {selectedRepo.language || 'N/A'}</p>
            <p>License: {selectedRepo.license || 'N/A'}</p>
            <p>Дата обновления: {selectedRepo.updated_at || 'N/A'}</p>
          </div>
        )}
      </div>
      <footer className='Footer'></footer>
    </div>
  );
}

export default App;