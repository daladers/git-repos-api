import {
    SEARCH_REPOSITORIES_REQUEST,
    SEARCH_REPOSITORIES_SUCCESS,
    SEARCH_REPOSITORIES_FAILURE,
  } from '../actions/types';
  
  const initialState = {
    loading: false,
    repositories: [],
    error: null,
    total_count: 0,
    currentPage: 1,
    perPage: 30,
    query: '',
    sort: '',
    order: '',
  };
  
  const repositoryReducer = (state = initialState, action) => {
    switch (action.type) {
      case SEARCH_REPOSITORIES_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
          query: action.payload.query,
          sort: action.payload.sort,
          order: action.payload.order,
          perPage: action.payload.perPage,
          currentPage: action.payload.page,
        };
      case SEARCH_REPOSITORIES_SUCCESS:
        return {
          ...state,
          loading: false,
          repositories: action.payload.items,
          total_count: action.payload.total_count,
        };
      case SEARCH_REPOSITORIES_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
          repositories: [],
        };
      default:
        return state;
    }
  };
  
  export default repositoryReducer;