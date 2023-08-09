import { FavoriteAction } from '../actions';

const initialState = {
   favorites: [],
   isLoading: false,
};

export default (state = initialState, action) => {
   switch (action.type) {
      case FavoriteAction.types.GET_FAVORITES:
         return { ...state, favorites: action?.payload };
      case FavoriteAction.types.SET_IS_LOADING:
         return { ...state, isLoading: action?.payload };
      default:
         return state;
   }
};
