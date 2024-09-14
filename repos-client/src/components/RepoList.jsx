import { useSelector, useDispatch } from 'react-redux';
import {
  CircularProgress,
  Typography,
  Alert,
  Box,
  Pagination,
} from '@mui/material';
import RepoItem from './RepoItem';
import { searchRepositories } from '../actions/repositoryActions';

const RepoList = () => {
  const dispatch = useDispatch();
  const {
    loading,
    repositories,
    total_count,
    error,
    currentPage,
    perPage,
    query,
    sort,
    order,
  } = useSelector((state) => state.repositoriesState);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!repositories || repositories.length === 0) {
    return (
      <Typography variant="h6">
        No repositories found. Please search for something!
      </Typography>
    );
  }

  // (GitHub API limits results to 1000 items)
  const totalPages = Math.min(Math.ceil(1000 / perPage));

  const handlePageChange = (event, value) => {
    dispatch(searchRepositories(query, sort, order, perPage, value));
  };

  return (
    <div>
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1">
          Total Results: {total_count}
        </Typography>
      </Box>
      {repositories.map((repo) => (
        <RepoItem key={repo.id} repo={repo} />
      ))}
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}
    </div>
  );
};

export default RepoList;