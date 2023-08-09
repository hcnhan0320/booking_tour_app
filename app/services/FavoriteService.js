import { ApiConstants } from '../constants';
import axios from 'axios';
import { authHeader } from '../utils/Generator';
import { getToken } from '../Store';

const getFavorites = async () => {
   console.log(`FavoriteService | getFavorites`);
   try {
      let response = await axios.get(
         `${ApiConstants.BACKEND_API.BASE_URL}${ApiConstants.BACKEND_API.FAVORITE}`,
         {
            headers: authHeader(getToken()),
         }
      );
      if (response?.status === 200) {
         return {
            status: true,
            message: `Favorite data fetched`,
            data: response?.data?.data,
         };
      } else {
         return {
            status: false,
            message: `Favorite data not found`,
         };
      }
   } catch (error) {
      return {
         status: false,
         message: `Favorite data not found`,
      };
   }
};

const addFavorite = async ({ tourId }) => {
   console.log(`FavoriteService | addFavorite`);
   try {
      let response = await axios.post(
         `${ApiConstants.BACKEND_API.BASE_URL}${ApiConstants.BACKEND_API.FAVORITE}/${tourId}`,
         {},
         {
            headers: authHeader(getToken()),
         }
      );
      if (response?.status === 200) {
         return {
            status: true,
            message: `Add to favorites successfully`,
            data: response?.data?.data,
         };
      } else {
         return {
            status: false,
            message: `Add to favorites failed`,
         };
      }
   } catch (error) {
      return {
         status: false,
         message: `Add to favorites failed`,
      };
   }
};

const removeFavorite = async ({ tourId }) => {
   console.log(`FavoriteService | removeFavorite`);
   try {
      let response = await axios.delete(
         `${ApiConstants.BACKEND_API.BASE_URL}${ApiConstants.BACKEND_API.FAVORITE}/${tourId}`,
         {
            headers: authHeader(getToken()),
         }
      );
      if (response?.status === 200) {
         return {
            status: true,
            message: `Removed from favorites successfully`,
            data: response?.data?.data,
         };
      } else {
         return {
            status: false,
            message: `Removed from favorites failed`,
         };
      }
   } catch (error) {
      return {
         status: false,
         message: `Removed from favorites failed`,
      };
   }
};

export default { addFavorite, removeFavorite, getFavorites };
