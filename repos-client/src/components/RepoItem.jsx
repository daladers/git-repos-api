import {
  Card,
  CardContent,
  Typography,
  Link,
  Box,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const RepoItem = ({ repo }) => {
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">
          <Link href={repo.html_url} target="_blank" rel="noopener">
            {repo.full_name}
          </Link>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {repo.description}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <StarIcon fontSize="small" />
          <Typography variant="body2" sx={{ ml: 0.5 }}>
            {repo.stargazers_count}
          </Typography>
          {repo.language && (
            <Typography variant="body2" sx={{ ml: 2 }}>
              Language: {repo.language}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default RepoItem;