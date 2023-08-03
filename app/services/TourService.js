import { ApiConstants } from '../constants';
import axios from 'axios';
import { authHeader } from '../utils/Generator';
import { getToken } from '../Store';

const getTours = async () => {
   console.log(`ToursService | getTours`);
   try {
      let tourResponse = await axios.get(
         `${ApiConstants.BACKEND_API.BASE_URL}${ApiConstants.BACKEND_API.TOUR}`,
         {
            headers: authHeader(getToken()),
         }
      );
      if (tourResponse?.status === 200) {
         return {
            status: true,
            message: `Tour data fetched`,
            data: tourResponse?.data?.data,
         };
      } else {
         return {
            status: false,
            message: `Tour data not found`,
         };
      }
   } catch (error) {
      return {
         status: false,
         message: `Tour data not found`,
      };
   }
};

const getOneTourById = async (tourId) => {
   console.log(`ToursService | getOneTourById`);
   try {
      let tourResponse = await axios.get(
         `${ApiConstants.BACKEND_API.BASE_URL}${ApiConstants.BACKEND_API.TOUR}/${tourId}`,
         {
            headers: authHeader(getToken()),
         }
      );
      if (tourResponse?.status === 200) {
         return {
            status: true,
            message: `Tour data fetched`,
            data: tourResponse?.data?.data,
         };
      } else {
         return {
            status: false,
            message: `Tour data not found`,
         };
      }
   } catch (error) {
      return {
         status: false,
         message: `Tour data not found`,
      };
   }
};

export default { getOneTourById, getTours };
