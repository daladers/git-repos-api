import { Container, Typography, Box } from '@mui/material';
import SearchBar from './components/SearchBar';
import RepoList from './components/RepoList';

function App() {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          GitHub Repository Search
        </Typography>
        <SearchBar />
        <RepoList />
      </Box>
    </Container>
  );
}

export default App;