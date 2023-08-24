import React, { useState, useEffect, useRef } from 'react';
import {
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
   Image,
   SafeAreaView,
   StatusBar,
   ScrollView,
   FlatList,
   Dimensions,
} from 'react-native';
import { TourCard, Separator, Toast, TourMediumCard } from '../components';
import { Colors, Fonts, Images, Mock } from '../constants';
import { LinearGradient } from 'expo-linear-gradient';
import { TourService } from '../services';
import { Display } from '../utils';

import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';

const HomeScreen = ({ navigation }) => {
   const [tours, setTours] = useState([]);
   const [dailyTours, setDailyTours] = useState([]);
   const toastRef = useRef();
   const [selectedTour, setSelectedTour] = useState();

   useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
         TourService.getTours().then((response) => {
            if (response?.status) {
               setTours(response?.data);
               setDailyTours(
                  response?.data.filter((tour) => tour.duration === '1 ngày')
               );
            }
         });
      });
      return unsubscribe;
   }, []);

   return (
      <SafeAreaView style={styles.container}>
         <StatusBar
            barStyle="light-content"
            backgroundColor={Colors.DEFAULT_GREEN}
            translucent
         />
         <Separator height={StatusBar.currentHeight} />
         {/* toast message */}
         <Toast ref={toastRef} />
         <View style={styles.headerContainer}>
            <View style={styles.infoContainer}>
               <View style={styles.welcomeSection}>
                  <Image source={Images.AVATAR} style={styles.profileImage} />
                  <Text style={styles.welcomeText}>
                     Chào,<Text style={styles.nameText}> Nhân!</Text>
                  </Text>
               </View>
               <View style={styles.alertSection}>
                  <Feather name="bell" size={15} color={Colors.DEFAULT_BLACK} />
               </View>
            </View>
            <Text style={styles.introText}>Tìm kiếm tour </Text>
            <View style={styles.searchContainer}>
               <TouchableOpacity
                  style={styles.searchSection}
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate('Search')}
               >
                  <Text style={styles.searchText}>Nhập từ khóa...</Text>
                  <Ionicons
                     name="search-outline"
                     size={18}
                     color={Colors.SECONDARY_BLACK}
                  />
               </TouchableOpacity>
               <LinearGradient
                  colors={[Colors.DEFAULT_ORANGE, Colors.DEFAULT_YELLOW]}
                  start={[0, 0]}
                  end={[1, 1]}
                  location={[0.25, 0.4, 1]}
                  style={styles.filterSection}
               >
                  <Feather
                     name="sliders"
                     size={20}
                     color={Colors.DEFAULT_WHITE}
                  />
               </LinearGradient>
            </View>
         </View>
         <ScrollView style={styles.listContainer} scroll>
            {/* tour hàng ngày */}
            <View style={styles.horizontalListContainer}>
               <View style={styles.listHeader}>
                  <Text style={styles.listHeaderTitle}>Tour nổi bật</Text>
                  <Text style={styles.listHeaderSubTitle}>Xem tất cả</Text>
               </View>
               <FlatList
                  data={tours}
                  keyExtractor={(item) => item?._id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  ListHeaderComponent={() => <Separator width={30} />}
                  ListFooterComponent={() => <Separator width={30} />}
                  ItemSeparatorComponent={() => <Separator width={20} />}
                  renderItem={({ item }) => (
                     <TourCard
                        {...item}
                        toastRef={toastRef}
                        selectedTour={selectedTour}
                        navigate={(tourId) => {
                           navigation.navigate('TourDetail', { tourId });
                           setSelectedTour(tourId);
                        }}
                     />
                  )}
               />
            </View>

            {/* tour nổi bật */}
            <View style={styles.horizontalListContainer}>
               <View style={styles.listHeader}>
                  <Text style={styles.listHeaderTitle}>Tour hàng ngày</Text>
                  <Text style={styles.listHeaderSubTitle}>Xem tất cả</Text>
               </View>
               {dailyTours.map((item) => (
                  <TourMediumCard
                     {...item}
                     toastRef={toastRef}
                     navigate={(tourId) =>
                        navigation.navigate('TourDetail', { tourId })
                     }
                  />
               ))}
            </View>
            <Separator height={Display.setHeight(8)} />
         </ScrollView>
      </SafeAreaView>
   );
};

export default HomeScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: Colors.THIRD_WHITE,
   },
   backgroundCurvedContainer: {
      backgroundColor: Colors.DEFAULT_ORANGE,
      height: 2000,
      width: 2000,
      position: 'absolute',
      top: -1 * (2000 - 230),
      borderRadius: 2000,
      alignSelf: 'center',
      zIndex: -1,
   },
   headerContainer: {
      justifyContent: 'space-evenly',
   },
   infoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 10,
      marginHorizontal: 30,
   },
   welcomeSection: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   profileImage: {
      width: 45,
      height: 45,
      borderRadius: 58,
      flexDirection: 'row',
   },
   welcomeText: {
      marginLeft: 10,
      color: Colors.SECONDARY_BLACK,
      fontSize: 15,
      fontFamily: Fonts.POPPINS_REGULAR,
      lineHeight: 15 * 1.4,
   },
   nameText: {
      color: Colors.SECONDARY_BLACK,
      fontSize: 18,
      fontFamily: Fonts.POPPINS_MEDIUM,
      lineHeight: 18 * 1.4,
   },
   alertSection: {
      backgroundColor: Colors.DEFAULT_WHITE,
      alignItems: 'center',
      justifyContent: 'center',
      width: 40,
      height: 40,
      borderRadius: 40,
      // add shadow
      shadowColor: Colors.DEFAULT_ORANGE,
      shadowOffset: {
         width: 0,
         height: 4,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
   },
   introText: {
      color: Colors.SECONDARY_BLACK,
      marginTop: 20,
      marginHorizontal: 30,
      fontSize: 22,
      fontFamily: Fonts.POPPINS_SEMI_BOLD,
      lineHeight: 22 * 1.4,
   },
   searchContainer: {
      height: 50,
      marginTop: 5,
      marginHorizontal: 30,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
   },
   searchSection: {
      backgroundColor: Colors.DEFAULT_WHITE,
      paddingHorizontal: 12,
      borderRadius: 10,
      width: '80%',
      height: 50,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
   },
   filterSection: {
      borderRadius: 10,
      height: 50,
      width: '15%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
   },
   searchText: {
      color: Colors.DEFAULT_GREY,
      fontSize: 12,
      fontFamily: Fonts.POPPINS_MEDIUM,
      lineHeight: 12 * 1.4,
   },
   categoryContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      marginTop: 20,
   },
   listContainer: {
      paddingVertical: 5,
      zIndex: -5,
   },
   horizontalListContainer: {
      marginTop: 20,
   },
   listHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginHorizontal: 30,
      marginBottom: 5,
   },
   listHeaderTitle: {
      color: Colors.DEFAULT_BLACK,
      fontFamily: Fonts.POPPINS_SEMI_BOLD,
      fontSize: 22,
      lineHeight: 22 * 1.4,
   },
   listHeaderSubTitle: {
      color: Colors.DEFAULT_ORANGE,
      fontFamily: Fonts.POPPINS_LIGHT,
      fontSize: 14,
      lineHeight: 14 * 1.4,
   },
   sortListContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      backgroundColor: Colors.DEFAULT_WHITE,
      marginTop: 8,
   },
   sortListItem: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: Colors.DEFAULT_YELLOW,
      height: 40,
   },
   sortListItemText: {
      color: Colors.DEFAULT_BLACK,
      fontFamily: Fonts.POPPINS_SEMI_BOLD,
      fontSize: 13,
      lineHeight: 13 * 1.4,
   },
});
