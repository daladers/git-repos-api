import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchRepositories } from "../actions/repositoryActions";
import {
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("best-match");
  const [order, setOrder] = useState("default");
  const [perPage, setPerPage] = useState(10);

  const dispatch = useDispatch();

  const handleSearch = () => {
    if (query.trim() !== "") {
      dispatch(searchRepositories(query, sort, order, perPage, 1));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: "flex", mb: 2 }}>
        <TextField
          label="Search GitHub Repositories"
          variant="outlined"
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyUp={handleKeyPress}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          sx={{ ml: 2, px: 4 }}
        >
          Search
        </Button>
      </Box>
      <Box sx={{ display: "flex", gap: 2 }}>
        <FormControl variant="outlined" sx={{ minWidth: 150 }}>
          <InputLabel id="sort-label">Sort by</InputLabel>
          <Select
            labelId="sort-label"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            label="Sort By"
          >
            <MenuItem value="best-match">Best match</MenuItem>
            <MenuItem value="stars">Stars</MenuItem>
            <MenuItem value="forks">Forks</MenuItem>
            <MenuItem value="help-wanted-issues">Help Wanted Issues</MenuItem>
            <MenuItem value="updated">Updated</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" sx={{ minWidth: 150 }}>
          <InputLabel id="order-label">Order</InputLabel>
          <Select
            labelId="order-label"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            label="Order"
          >
            <MenuItem value="default">Default</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
            <MenuItem value="asc">Ascending</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Per page"
          variant="outlined"
          type="number"
          value={perPage}
          onChange={(e) => {
            const value = Math.max(1, Math.min(100, Number(e.target.value)));
            setPerPage(value);
          }}
          slotProps={{
            input: { min: 1, max: 100 },
          }}
        />
      </Box>
    </Box>
  );
};

export default SearchBar;
