import { combineReducers } from 'redux';

import GeneralReducer from './GeneralReducer';
import FavoriteReducer from './FavoriteReducer';

export default combineReducers({
   generalState: GeneralReducer,
   favoriteState: FavoriteReducer,
});
