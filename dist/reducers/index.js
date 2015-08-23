import { combineReducers } from 'redux';
import searchBox from './searchBox';
import categories from './categories';

const rootReducer = combineReducers({
  searchBox,
  categories,
});

export default rootReducer;
