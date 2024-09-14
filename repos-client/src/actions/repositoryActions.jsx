import axios from 'axios';
import {
  SEARCH_REPOSITORIES_REQUEST,
  SEARCH_REPOSITORIES_SUCCESS,
  SEARCH_REPOSITORIES_FAILURE,
} from './types';

export const searchRepositories = (query, sort, order, perPage, page = 1) => async (dispatch) => {
  dispatch({
    type: SEARCH_REPOSITORIES_REQUEST,
    payload: { query, sort, order, perPage, page },
  });

  try {
    const params = { q: query, page };

    if (sort) params.sort = sort;
    if (order) params.order = order;
    if (perPage) params.per_page = perPage;

    const response = await axios.get('/search', { params });

    dispatch({
      type: SEARCH_REPOSITORIES_SUCCESS,
      payload: response.data, 
    });
  } catch (error) {
    dispatch({
      type: SEARCH_REPOSITORIES_FAILURE,
      payload: error.response ? error.response.data.error : error.message,
    });
  }
};