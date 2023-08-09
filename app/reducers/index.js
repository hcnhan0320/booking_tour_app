import { combineReducers } from 'redux';

import GeneralReducer from './GeneralReducer';
import CartReducer from './CartReducer';
import FavoriteReducer from './FavoriteReducer';

export default combineReducers({
   generalState: GeneralReducer,
   cartState: CartReducer,
   favoriteState: FavoriteReducer,
});
