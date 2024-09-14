const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

app.use(express.json());

app.get("/search", async (req, res) => {
    const query = req.query.q;
    if (!query) {
      return res
        .status(400)
        .json({ error: "Missing search query parameter ?q=..." });
    }
  
    const params = { q: query };
  
    if (req.query.sort) params.sort = req.query.sort;
    if (req.query.order) params.order = req.query.order;
    if (req.query.per_page) params.per_page = req.query.per_page;
    if (req.query.page) params.page = req.query.page;
  
    try {
      const response = await axios.get(
        "https://api.github.com/search/repositories",
        {
          headers: {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${GITHUB_TOKEN}`,
          },
          params: params,
        }
      );
  
      res.json(response.data);
    } catch (error) {
      console.error(error);
  
      if (error.response) {
        res
          .status(error.response.status)
          .json({ error: error.response.data.message });
      } else {
        res
          .status(500)
          .json({ error: "An error occurred while fetching data from GitHub" });
      }
    }
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
