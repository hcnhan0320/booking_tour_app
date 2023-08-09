import { FavoriteService } from '../services';

const types = {
   GET_FAVORITES: 'GET_FAVORITES',
   SET_IS_LOADING: 'SET_IS_LOADING',
};

const addFavorite = ({ tourId }) => {
   return (dispatch) => {
      dispatch({
         type: types.SET_IS_LOADING,
         payload: true,
      });
      FavoriteService.addFavorite({ tourId })
         .then((favoriteResponse) => {
            dispatch({
               type: types.GET_FAVORITES,
               payload: favoriteResponse?.data,
            });
            dispatch({
               type: types.SET_IS_LOADING,
               payload: false,
            });
         })
         .catch(() => {
            dispatch({
               type: types.SET_IS_LOADING,
               payload: false,
            });
         });
   };
};

const removeFavorite = ({ tourId }) => {
   return (dispatch) => {
      dispatch({
         type: types.SET_IS_LOADING,
         payload: true,
      });
      FavoriteService.removeFavorite({ tourId })
         .then((favoriteResponse) => {
            dispatch({
               type: types.GET_FAVORITES,
               payload: favoriteResponse?.data,
            });
            dispatch({
               type: types.SET_IS_LOADING,
               payload: false,
            });
         })
         .catch(() => {
            dispatch({
               type: types.SET_IS_LOADING,
               payload: false,
            });
         });
   };
};

const getFavorites = () => {
   return (dispatch) => {
      dispatch({
         type: types.SET_IS_LOADING,
         payload: true,
      });
      FavoriteService.getFavorites()
         .then((favoriteResponse) => {
            dispatch({
               type: types.GET_FAVORITES,
               payload: favoriteResponse?.data,
            });
            dispatch({
               type: types.SET_IS_LOADING,
               payload: false,
            });
         })
         .catch(() => {
            dispatch({
               type: types.SET_IS_LOADING,
               payload: false,
            });
         });
   };
};

export default { types, addFavorite, removeFavorite, getFavorites };
