import axios from 'axios';
import { ApiConstants } from '../constants';
import { authHeader } from '../utils/Generator';
import { getToken } from '../Store';

const savedBooking = async (bookingInfo) => {
   if (
      !bookingInfo?.fullname ||
      !bookingInfo?.email ||
      !bookingInfo?.phoneNum
   ) {
      return { status: false, message: 'Please fill up all fields' };
   }
   try {
      let requestBody = {
         tourId: bookingInfo?.tourId,
         fullname: bookingInfo?.fullname,
         email: bookingInfo?.email,
         phoneNum: bookingInfo?.phoneNum,
         adult: bookingInfo?.adult,
         children: bookingInfo?.children,
         departureDay: bookingInfo?.departureDay,
         departure: bookingInfo?.departure,
         total: bookingInfo?.total,
      };
      let response = await axios.post(
         `${ApiConstants.BACKEND_API.BASE_URL}${ApiConstants.BACKEND_API.BOOKING}`,
         requestBody,
         {
            headers: authHeader(getToken()),
         }
      );
      if (response?.status === 200) {
         return {
            status: true,
            message: `Add booking info successfully`,
         };
      } else {
         return {
            status: false,
            message: `Add booking info failed`,
         };
      }
   } catch (error) {
      console.log(error);
      return { status: false, message: 'Oops! Something went wrong' };
   }
};

export default { savedBooking };
