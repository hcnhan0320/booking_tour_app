import {
   StyleSheet,
   Text,
   View,
   StatusBar,
   SafeAreaView,
   Image,
   ScrollView,
   TouchableOpacity,
   FlatList,
   Dimensions,
   Animated,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Colors, Fonts } from '../constants';
import { CircleCardImage, Separator, Toast } from '../components';

import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';

import { StaticImageService, TourService } from '../services';
import { Display } from '../utils';
import { LinearGradient } from 'expo-linear-gradient';
import { FavoriteAction } from '../actions';

const tabs = [
   {
      id: 1,
      name: 'Mô tả',
   },
   {
      id: 2,
      name: 'Thông tin',
   },
   {
      id: 3,
      name: 'Đánh giá',
   },
];

const currencyFormat = (number) => {
   const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
   });
   return formatter.format(number);
};

const discountPrice = (number, discount) => {
   return number - (number * discount) / 100;
};

const { width, height } = Dimensions.get('screen');
const ITEM_WIDTH = width * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 1.27;

const TourDetailScreen = ({ route, navigation }) => {
   // get params
   const { tourId } = route.params;
   const [detailsTour, setDetailsTour] = useState(null);
   const [imagesTour, setImagesTour] = useState([]);

   //tabs hook
   const [tabActive, setTabActive] = useState('Mô tả');
   const setTabFilter = (tabActive) => {
      setTabActive(tabActive);
   };

   // toast ref
   const toastRef = useRef();

   // animated image
   const scrollX = useRef(new Animated.Value(0)).current;

   useEffect(() => {
      TourService.getOneTourById(tourId).then((response) => {
         if (response?.status) {
            setImagesTour(response?.data?.image);
            setDetailsTour(response?.data);
         }
      });
   }, []);

   const dispatch = useDispatch();
   const isFavorited = useSelector(
      (state) =>
         state?.favoriteState?.favorites?.filter(
            (item) => item?.tourId === tourId
         )?.length > 0
   );

   const addFavorite = () => dispatch(FavoriteAction.addFavorite({ tourId }));
   const removeFavorite = () =>
      dispatch(FavoriteAction.removeFavorite({ tourId }));

   if (!detailsTour?.image) {
      return <Text>Loading...</Text>;
   }

   return (
      <SafeAreaView style={styles.container}>
         <StatusBar
            barStyle="light-content"
            backgroundColor={Colors.DEFAULT_GREEN}
            translucent
         />
         <Separator height={StatusBar.currentHeight} />
         <Toast ref={toastRef} />
         <View style={styles.headerContainer}>
            <TouchableOpacity
               style={styles.headerIcon}
               onPress={() => {
                  navigation.goBack();
               }}
            >
               <AntDesign name="arrowleft" size={18} />
            </TouchableOpacity>
            <Text style={styles.headerText}>Chi tiết tour</Text>
            <View style={styles.headerIcon}>
               <Entypo name="dots-three-horizontal" size={18} />
            </View>
         </View>

         <View style={styles.imgTourContainer}>
            <Animated.FlatList
               data={detailsTour?.image}
               key={(item) => item.index}
               keyExtractor={(item) => item.index}
               horizontal
               showsHorizontalScrollIndicator={false}
               pagingEnabled
               onScroll={Animated.event(
                  [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                  { useNativeDriver: true }
               )}
               renderItem={({ item, index }) => {
                  const inputRange = [
                     (index - 1) * width,
                     index * width,
                     (index + 1) * width,
                  ];
                  const translateX = scrollX.interpolate({
                     inputRange,
                     outputRange: [-width * 0.7, 0, width * 0.7],
                  });
                  return (
                     <View
                        style={{
                           width,
                           height: ITEM_WIDTH * 1.47,
                           justifyContent: 'center',
                           alignItems: 'center',
                        }}
                     >
                        <View
                           style={{
                              borderRadius: 18,
                              shadowColor: Colors.DEFAULT_BLACK,
                              shadowOpacity: 0.5,
                              shadowRadius: 10,
                              shadowOffset: {
                                 width: 0,
                                 height: 0,
                              },
                              padding: 12,
                              backgroundColor: Colors.DEFAULT_WHITE,
                           }}
                        >
                           <View
                              style={{
                                 width: ITEM_WIDTH,
                                 height: ITEM_HEIGHT,
                                 overflow: 'hidden',
                                 alignItems: 'center',
                                 borderRadius: 18,
                              }}
                           >
                              <Animated.Image
                                 source={{
                                    uri: StaticImageService.getTourImage(
                                       imagesTour[index]
                                    ),
                                 }}
                                 style={{
                                    width: ITEM_WIDTH * 1.4,
                                    height: ITEM_HEIGHT,
                                    resizeMode: 'cover',
                                    transform: [
                                       {
                                          translateX,
                                       },
                                    ],
                                 }}
                              />
                           </View>
                           <TouchableOpacity
                              activeOpacity={1}
                              style={styles.addFavoriteBtn}
                              onPress={() => {
                                 if (isFavorited) {
                                    removeFavorite();
                                    toastRef.current.show({
                                       type: 'info',
                                       text: 'Remove from favorites successful',
                                       duration: 1500,
                                    });
                                 } else {
                                    addFavorite();
                                    toastRef.current.show({
                                       type: 'info',
                                       text: 'Add to favorites successful',
                                       duration: 1500,
                                    });
                                 }
                              }}
                           >
                              <AntDesign
                                 name={isFavorited ? 'heart' : 'hearto'}
                                 size={20}
                                 color={Colors.DEFAULT_ORANGE}
                              />
                           </TouchableOpacity>
                        </View>
                     </View>
                  );
               }}
            />
         </View>

         <View style={styles.listTab}>
            {tabs.map((tab, index) => {
               return (
                  <TouchableOpacity
                     style={[
                        styles.btnTab,
                        tab.name === tabActive && styles.btnTabActive,
                     ]}
                     onPress={() => {
                        setTabFilter(tab.name);
                     }}
                  >
                     <Text
                        style={[
                           styles.btnText,
                           tab.name === tabActive && styles.btnTextActive,
                        ]}
                     >
                        {tab.name}
                     </Text>
                  </TouchableOpacity>
               );
            })}
         </View>
         <ScrollView>
            <View style={styles.contentTab}>
               {tabActive === 'Mô tả' ? (
                  <Text style={styles.descText}>
                     {detailsTour?.content?.description}
                  </Text>
               ) : tabActive === 'Thông tin' ? (
                  <>
                     <Text style={styles.descText}>
                        <Text style={styles.boldText}>Mã tour: </Text>{' '}
                        {detailsTour?.code}
                     </Text>
                     <Text style={styles.descText}>
                        <Text style={styles.boldText}>Khởi hành tại: </Text>
                        {detailsTour?.departure}
                     </Text>
                     <Text style={styles.descText}>
                        <Text style={styles.boldText}>Lịch trình: </Text>
                        {detailsTour?.schedule}
                     </Text>
                     <Text style={styles.descText}>
                        <Text style={styles.boldText}>Phương tiện: </Text>
                        {detailsTour?.transport}
                     </Text>
                     <Text style={styles.descText}>
                        <Text style={styles.boldText}>Thời gian: </Text>
                        {detailsTour?.duration}
                     </Text>
                     <Text style={styles.descText}>
                        <Text style={styles.boldText}>Hình thức: </Text>
                        {detailsTour?.type}
                     </Text>
                  </>
               ) : (
                  <Text></Text>
               )}
            </View>
         </ScrollView>
         <Separator width={20} />

         <View style={styles.overlayBottom}>
            <View style={styles.overlayInfo}>
               <View style={styles.priceInfo}>
                  <Text style={styles.priceText}>
                     {currencyFormat(detailsTour?.price?.adult)}
                  </Text>
                  <Text style={styles.saleText}>
                     {currencyFormat(
                        discountPrice(
                           detailsTour?.price?.adult,
                           detailsTour?.promotion
                        )
                     )}
                  </Text>
               </View>
               <TouchableOpacity
                  style={styles.bookingBtn}
                  onPress={() =>
                     navigation.navigate('BookingInfo', {
                        title: detailsTour.title,
                        tourId: tourId,
                        adultPrice: discountPrice(
                           detailsTour?.price?.adult,
                           detailsTour?.promotion
                        ),
                        childrenPrice: discountPrice(
                           detailsTour?.price?.children,
                           detailsTour?.promotion
                        ),
                     })
                  }
               >
                  <Text style={styles.bookingText}>
                     Tiếp tục <AntDesign name="arrowright" size={18} />
                  </Text>
               </TouchableOpacity>
            </View>
         </View>
      </SafeAreaView>
   );
};

export default TourDetailScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: Colors.THIRD_WHITE,
   },
   headerContainer: {
      marginTop: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 30,
      alignItems: 'center',
   },
   headerIcon: {
      backgroundColor: Colors.DEFAULT_WHITE,
      padding: 10,
      borderRadius: 20,
      // add shadow
      shadowColor: Colors.SECONDARY_BLACK,
      shadowOffset: {
         width: 0,
         height: 4,
      },
      shadowOpacity: 0.12,
      shadowRadius: 3.84,
      elevation: 3,
   },
   headerText: {
      fontFamily: Fonts.POPPINS_SEMI_BOLD,
      fontSize: 16,
   },
   imgTourContainer: {
      marginTop: 10,
   },
   addFavoriteBtn: {
      position: 'absolute',
      bottom: -10,
      right: 30,
      backgroundColor: Colors.DEFAULT_WHITE,
      padding: 10,
      borderRadius: 20,
   },
   overlay: {
      position: 'absolute',
      borderRadius: 30,
      width: '100%',
      height: Display.setWidth(100),
      zIndex: 1,
      bottom: 0,
   },
   infoTour: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 20,
      zIndex: 100,
      paddingHorizontal: 20,
   },
   subTitle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
   },
   destination: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   subIcon: {
      flexDirection: 'row',
   },
   title: {
      color: Colors.DEFAULT_WHITE,
      fontSize: 22,
      fontFamily: Fonts.POPPINS_SEMI_BOLD,
      lineHeight: 22 * 1.4,
   },
   destinationText: {
      marginLeft: 5,
      color: Colors.DEFAULT_GREY,
      fontSize: 16,
      fontFamily: Fonts.POPPINS_LIGHT,
      lineHeight: 16 * 1.4,
   },
   listImg: {
      marginTop: 20,
      paddingHorizontal: 30,
   },
   listTab: {
      marginTop: 20,
      paddingHorizontal: 30,
      flexDirection: 'row',
   },
   btnTabActive: {
      backgroundColor: Colors.DEFAULT_ORANGE,
      // add shadow
      shadowColor: Colors.DEFAULT_ORANGE,
      shadowOffset: {
         width: 0,
         height: 4,
      },
      shadowOpacity: 0.5,
      shadowRadius: 3.84,
   },
   btnTab: {
      backgroundColor: Colors.DEFAULT_WHITE,
      paddingVertical: 8,
      paddingHorizontal: 16,
      marginRight: 12,
      borderRadius: 10,
      // add shadow
      shadowColor: Colors.DEFAULT_BLACK,
      shadowOffset: {
         width: 0,
         height: 4,
      },
      shadowOpacity: 0.08,
      shadowRadius: 3.84,
   },
   btnTextActive: {
      color: Colors.DEFAULT_WHITE,
   },
   btnText: {
      color: Colors.DEFAULT_BLACK,
      fontSize: 11,
      fontFamily: Fonts.POPPINS_MEDIUM,
      lineHeight: 11 * 1.4,
   },
   contentTab: {
      marginTop: 20,
      paddingHorizontal: 30,
      justifyContent: 'space-between',
   },
   descText: {
      color: '#8B8B8B',
      fontSize: 14,
      fontFamily: Fonts.POPPINS_LIGHT,
      lineHeight: 14 * 1.4,
   },
   boldText: {
      color: Colors.SECONDARY_ORANGE,
      fontFamily: Fonts.POPPINS_SEMI_BOLD,
      lineHeight: 14 * 1.4,
   },
   overlayBottom: {
      width: '100%',
      position: 'absolute',
      paddingHorizontal: 10,
      bottom: 35,
   },
   overlayInfo: {
      backgroundColor: Colors.THIRD_WHITE,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 5,
      borderRadius: 15,
      // add shadow
      shadowColor: Colors.DEFAULT_BLACK,
      shadowOffset: {
         width: 0,
         height: 4,
      },
      shadowOpacity: 0.12,
      shadowRadius: 3.84,
   },
   bookingBtn: {
      backgroundColor: Colors.DEFAULT_ORANGE,
      paddingVertical: 10,
      paddingHorizontal: 25,
      borderRadius: 10,
      // add shadow
      shadowColor: Colors.DEFAULT_ORANGE,
      shadowOffset: {
         width: 0,
         height: 4,
      },
      shadowOpacity: 0.5,
      shadowRadius: 3.84,
   },
   bookingText: {
      color: Colors.DEFAULT_WHITE,
      fontSize: 20,
      fontFamily: Fonts.POPPINS_SEMI_BOLD,
      lineHeight: 20 * 1.4,
   },
   priceText: {
      color: Colors.DEFAULT_GREY,
      fontSize: 18,
      fontFamily: Fonts.POPPINS_SEMI_BOLD,
      lineHeight: 18 * 1.4,
      textDecorationLine: 'line-through',
      textAlign: 'center',
   },
   saleText: {
      color: Colors.DEFAULT_BLACK,
      fontSize: 24,
      fontFamily: Fonts.POPPINS_SEMI_BOLD,
      lineHeight: 24 * 1.4,
   },
});
