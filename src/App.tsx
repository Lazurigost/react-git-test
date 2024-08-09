import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserRepos } from './state/repo/repoSlice'; // Adjust the path as necessary
import { RootState, AppDispatch } from './state/store'; // Import the types
import Search from './components/Search'; // Import the Search component
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { format } from 'date-fns';
import './App.scss';

const App: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [selectedRepo, setSelectedRepo] = useState<any | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const { repos, loading, error } = useSelector((state: RootState) => state.repo);

  const handleSearch = () => {
    if (username.trim()) {
      dispatch(fetchUserRepos(username));
      setIsSearching(true);
    }
  };

  const handleRowClick = (repo: any) => {
    setSelectedRepo(repo);
    console.log(repo);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Search username={username} setUsername={setUsername} handleSearch={handleSearch} />
      </header>

      <div className='BodyDiv'>
        {loading && <div>Загружаем данные...</div>}
        {error && <div>Произошла ошибка: {error}</div>}
        {repos.length === 0 && isSearching && <div>Нет данных для отображения.</div>}
        
        {repos.length > 0 && (
          <div className="table-container">
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
                      <TableCell>{repo.updated_at ? format(new Date(repo.updated_at), 'yyyy-MM-dd') : 'N/A'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}

        {selectedRepo && (
          <div className="selected-repo-container">
            <h2>{selectedRepo.name}</h2>
            <p>Stars: {selectedRepo.stars || 0}</p>
            <p>Languages: {selectedRepo.language || 'N/A'}</p>
            <p>License: {selectedRepo.license ? selectedRepo.license.name : 'N/A'}</p>
            <p>Дата обновления: {selectedRepo.updated_at ? format(new Date(selectedRepo.updated_at), 'yyyy-MM-dd') : 'N/A'}</p>
          </div>
        )}
      </div>
      <footer className='Footer'></footer>
    </div>
  );
}

export default App;