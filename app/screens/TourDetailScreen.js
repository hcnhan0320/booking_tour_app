import {
   StyleSheet,
   Text,
   View,
   StatusBar,
   SafeAreaView,
   Image,
   ScrollView,
   TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors, Fonts } from '../constants';
import { CircleCardImage, Separator } from '../components';

import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';

import { StaticImageService, TourService } from '../services';
import { Display } from '../utils';
import { LinearGradient } from 'expo-linear-gradient';

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

const TourDetailScreen = ({ route, navigation }) => {
   const { tourId } = route.params;
   const [detailsTour, setDetailsTour] = useState(null);
   const [imagesTour, setImagesTour] = useState([]);

   //tabs hook
   const [tabActive, setTabActive] = useState('Mô tả');
   const setTabFilter = (tabActive) => {
      setTabActive(tabActive);
   };

   useEffect(() => {
      TourService.getOneTourById(tourId).then((response) => {
         if (response?.status) {
            setImagesTour(response?.data?.image);
            setDetailsTour(response?.data);
         }
      });
   }, []);

   return (
      <SafeAreaView style={styles.container}>
         <StatusBar
            barStyle="light-content"
            backgroundColor={Colors.DEFAULT_GREEN}
            translucent
         />
         <Separator height={StatusBar.currentHeight} />
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
            <Image
               source={{
                  uri: StaticImageService.getTourImage(imagesTour[0]),
               }}
               resizeMode="cover"
               style={styles.posterStyle}
            />
            <LinearGradient
               colors={['transparent', 'rgba(0,0,0,0.9)']}
               style={styles.overlay}
            ></LinearGradient>
            {/* <View style={styles.overlay}></View> */}
            <View style={styles.infoTour}>
               <View>
                  <Text style={styles.title}>{detailsTour?.title}</Text>
               </View>
               <View style={styles.subTitle}>
                  <View style={styles.destination}>
                     <Ionicons
                        name="location"
                        size={16}
                        color={Colors.LIGHT_GREY}
                     />
                     <Text style={styles.destinationText}>
                        {detailsTour?.departure}
                     </Text>
                  </View>
                  <View style={styles.subIcon}>
                     <AntDesign
                        name="sharealt"
                        size={20}
                        color={Colors.LIGHT_GREY}
                     />
                     <AntDesign
                        name="hearto"
                        size={20}
                        color={Colors.LIGHT_GREY}
                        style={{ paddingLeft: 15 }}
                     />
                  </View>
               </View>
            </View>
         </View>

         {/* <View style={styles.listImg}>
               <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {imagesTour.map((item) => {
                     return <CircleCardImage image={item} />;
                  })}
               </ScrollView>
            </View> */}
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
               <View style={styles.bookingBtn}>
                  <Text style={styles.bookingText}>
                     Đặt tour <AntDesign name="arrowright" size={18} />
                  </Text>
               </View>
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
      marginTop: 20,
      marginHorizontal: 30,
   },
   posterStyle: {
      height: Display.setWidth(100),
      borderRadius: 30,
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
      bottom: 30,
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
