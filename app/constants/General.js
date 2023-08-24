const ONBOARDING_CONTENTS = [
   {
      image: 'DISCOVER',
      title: 'Discover the world',
      content:
         'Sign up and discover new destinations, plan your trip, and enjoy unforgettable experiences around the world with our travel app.',
   },
   {
      image: 'BOOKING',
      title: 'Easy tour booking',
      content:
         'Use our app to quickly and easily search for and book tours. Stay up-to-date with special promotions and enjoy great tour around the world.',
   },
   {
      image: 'EXPERIENCE',
      title: 'Unforgettable travel experiences',
      content:
         'Experience unforgettable travel moments with our travel app. Learn about local activities and attractions, book tour tickets, and discover unique cultures and cuisines at your destination.',
   },
];

const currencyFormat = (number) => {
   const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
   });
   return formatter.format(number);
};

export default { ONBOARDING_CONTENTS, currencyFormat };
