import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserRepos, fetchRepoLanguages } from './state/repo/repoSlice'; 
import { RootState, AppDispatch } from './state/store'; 
import Search from './components/Search'; 
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip'; 
import Star from '@mui/icons-material/Star'; 
import { format } from 'date-fns';
import TablePagination from '@mui/material/TablePagination'; 
import ArrowUpward from '@mui/icons-material/ArrowUpward'; 
import ArrowDownward from '@mui/icons-material/ArrowDownward'; 
import './App.scss';
import { Margin } from '@mui/icons-material';

//Определение свойств по которым будет проводиться сортировка
type SortableKeys = 'name' | 'forks' | 'stargazers_count' | 'updated_at';

const App: React.FC = () => {
  //Строка для поиска 
  const [username, setUsername] = useState<string>('');
  //Выбранный из списка репозиторий
  const [selectedRepo, setSelectedRepo] = useState<any | null>(null);
  //Настройка начальной сортировки
  const [sortConfig, setSortConfig] = useState<{
    key: SortableKeys;
    direction: 'ascending' | 'descending';
  }>({
    key: 'name',
    direction: 'ascending', 
  });
  //Свойства страниц для пагинации
  const [page, setPage] = useState(0); 
  const [rowsPerPage, setRowsPerPage] = useState(5); 
  const dispatch = useDispatch<AppDispatch>();
  //Селектор для репозиториев и языков
  const { repos, error, languages } = useSelector((state: RootState) => state.repo);

  //Функция поиска после нажатия на кнопку
  const handleSearch = async () => {
    if (username.trim()) {
      const action = await dispatch(fetchUserRepos(username));
      if (fetchUserRepos.fulfilled.match(action)) {
        
      }
    }
  };
  //Функция для отображения информации после нажатия на репозиторий из списка
  const handleRowClick = async (repo: any) => {
    setSelectedRepo(repo);
    console.log(repo)
    await dispatch(fetchRepoLanguages(repo.languages_url));
  };
  //Функция при нажатии на столбец
  const handleSort = (key: SortableKeys) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  //Сортировка
  const sortedRepos = [...repos].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
  
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortConfig.direction === 'ascending'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    } else if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortConfig.direction === 'ascending' ? aValue - bValue : bValue - aValue;
    } else {
      return 0; 
    }
  });
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentRepos = sortedRepos.slice(startIndex, endIndex);

  return (
    <div className="App">
      <header className="App-header">
        <Search username={username} setUsername={setUsername} handleSearch={handleSearch} />
      </header>

      <div className='BodyDiv'>
        
        {error && <div>Произошла ошибка: {error}</div>}
        {repos.length === 0 && <div className='welcomeDiv'>Добро пожаловать!</div>}
        
        {repos.length > 0 && (
          <div className="content-container">
            
            <div className="table-container">
              <div className='resultDiv'>
                <h1 className='resultH'>Результаты поиска</h1>
              </div>
              {/* Таблица */}
              <TableContainer sx={{ height: '92%' }} component={Paper}>
                <Table sx={{ height: '100%' }}>
                  <TableHead>
                    <TableRow>
                    <TableCell   style={{ width: '20%' }}>
                        Название 
                      </TableCell>
                    <TableCell  style={{ width: '20%' }}>
                        Язык 
                      </TableCell>
                      <TableCell onClick={() => handleSort('forks')} style={{ cursor: 'pointer', width: '20%' }}>
                        Число форков {sortConfig.key === 'forks' && (sortConfig.direction === 'ascending' ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />)}
                      </TableCell>
                      <TableCell onClick={() => handleSort('stargazers_count')} style={{ cursor: 'pointer', width: '20%' }}>
                        Число звёзд {sortConfig.key === 'stargazers_count' && (sortConfig.direction === 'ascending' ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />)}
                      </TableCell>
                      <TableCell onClick={() => handleSort('updated_at')} style={{ cursor: 'pointer', width: '20%' }}>
                        Дата обновления {sortConfig.key === 'updated_at' && (sortConfig.direction === 'ascending' ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />)}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentRepos.map((repo) => (
                      <TableRow key={repo.id} onClick={() => handleRowClick(repo)}
                      style={{ 
                        backgroundColor: selectedRepo?.id === repo.id ? '#f5f5f5' : 'transparent', 
                      }}>
                        <TableCell>{repo.name}</TableCell>
                        <TableCell>{repo.language || 'N/A'}</TableCell>
                        <TableCell>{repo.forks || 0}</TableCell>
                        <TableCell>{repo.stargazers_count || 0}</TableCell>
                        <TableCell>{repo.updated_at ? format(new Date(repo.updated_at), 'yyyy-MM-dd') : 'N/A'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                 
              </TableContainer>
              <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              
              count={sortedRepos.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(event, newPage) => setPage(newPage)}
              onRowsPerPageChange={(event) => {
                setRowsPerPage(parseInt(event.target.value, 10));
                setPage(0); 
              }}
              />
            </div>

            
            <div className="selected-repo-container">
              {/* Отображение выбранного репозитория */}
              {selectedRepo ? (
                <div className='selectedDiv'>
                  <h2>{selectedRepo.name}</h2>
                  <div className='langStarDiv'>
                    <Chip 
                      label={selectedRepo.language || 'N/A'} 
                      variant="outlined" 
                      style={{ 
                        margin: '4px', 
                        backgroundColor: '#2196F3', 
                        color: 'white', 
                        fontSize: '1.2rem', 
                        padding: '10px 15px', 
                      }} 
                    />

                      <div>
                      <Star style={{ color: '#FFD700' }} /> 
                      {selectedRepo.stargazers_count || 0}
                      </div>
                    
                  </div>

                  
                  
                      {/* Особое отображение самого использованного языка */}
                  <div className='languageDiv'>
                    {Object.entries(languages).filter(lang => lang[0] !== selectedRepo.language).map(([lang]) => (
                      <Chip 
                        key={lang}
                        label={lang} 
                        variant="outlined" 
                        style={{ 
                          margin: '4px', 
                          width: 'fit-content',
                          backgroundColor: lang === selectedRepo.language ? '#2196F3' : 'transparent', 
                          color: lang === selectedRepo.language ? 'white' : 'inherit' 
                        }} 
                      />
                    ))}
                  </div>
                  <p>{selectedRepo.license ? selectedRepo.license.name : 'Лицензии отсутствуют'}</p>
                </div>
              ) : (
                <p>Выберите репозиторий</p> 
              )}
            </div>

           
          </div>
          
        )}
        
      </div>
      <footer className='Footer'></footer>
    </div>
  );
}

export default App;
