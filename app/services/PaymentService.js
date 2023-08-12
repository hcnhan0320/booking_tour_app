// import { ApiConstants } from '../constants';
// import axios from 'axios';
// import { authHeader } from '../utils/Generator';
// import { getToken } from '../Store';

// const createPaymentIntent = async (data) => {
//    console.log(`PaymentService | createPaymentIntent`);
//    try {
//       let response = await axios.post(
//          `${ApiConstants.BACKEND_API.BASE_URL}${ApiConstants.BACKEND_API.PAYMENT}/intent`,
//          data,
//          {
//             headers: authHeader(getToken()),
//          }
//       );
//       if (response?.paymentIntent) {
//          return {
//             status: true,
//             message: `Payment intent data fetched`,
//             data: response?.paymentIntent,
//          };
//       } else {
//          return {
//             status: false,
//             message: `Payment intent data not found`,
//          };
//       }
//    } catch (error) {
//       return {
//          status: false,
//          message: `Payment intent data not found`,
//       };
//    }
// };

// export default { createPaymentIntent };
