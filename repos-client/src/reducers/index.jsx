import { combineReducers } from 'redux';
import repositoryReducer from './repositoryReducer';

const rootReducer = combineReducers({
  repositoriesState: repositoryReducer,
});

export default rootReducer;