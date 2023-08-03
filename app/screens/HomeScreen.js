import React, { useState, useEffect } from 'react';
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
} from 'react-native';
import {
   CategoryMenuItem,
   TourCard,
   RestaurantMediumCard,
   Separator,
} from '../components';
import { Colors, Fonts, Images, Mock } from '../constants';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import { TourService } from '../services';
import { Display } from '../utils';

const HomeScreen = ({ navigation }) => {
   const [tours, setTours] = useState(null);

   useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
         TourService.getTours().then((response) => {
            if (response?.status) {
               setTours(response?.data);
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
         {/* <View style={styles.backgroundCurvedContainer} /> */}
         <View style={styles.headerContainer}>
            <View style={styles.infoContainer}>
               <View style={styles.welcomeSection}>
                  <Image source={Images.AVATAR} style={styles.profileImage} />
                  <Text style={styles.welcomeText}>
                     Hello,<Text style={styles.nameText}> Nhan!</Text>
                  </Text>
               </View>
               <View style={styles.alertSection}>
                  <Feather name="bell" size={15} color={Colors.DEFAULT_BLACK} />
               </View>
            </View>
            <Text style={styles.introText}>Find Your Tour</Text>
            <View style={styles.searchContainer}>
               <View style={styles.searchSection}>
                  <Text style={styles.searchText}>Search here..</Text>
                  <Ionicons
                     name="search-outline"
                     size={18}
                     color={Colors.SECONDARY_BLACK}
                  />
               </View>
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
         <ScrollView style={styles.listContainer}>
            <View style={styles.horizontalListContainer}>
               <View style={styles.listHeader}>
                  <Text style={styles.listHeaderTitle}>Our Properties</Text>
                  <Text style={styles.listHeaderSubTitle}>View All</Text>
               </View>
               <FlatList
                  data={tours}
                  keyExtractor={(item) => item?._id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  ListHeaderComponent={() => <Separator width={20} />}
                  ListFooterComponent={() => <Separator width={20} />}
                  ItemSeparatorComponent={() => <Separator width={20} />}
                  renderItem={({ item }) => (
                     <TourCard
                        {...item}
                        navigate={(tourId) =>
                           navigation.navigate('TourDetail', { tourId })
                        }
                     />
                  )}
               />
            </View>
            {/* <View style={styles.sortListContainer}>
               <TouchableOpacity
                  style={sortBorderStyle(activeSortItem === 'Recent')}
                  activeOpacity={0.8}
                  onPress={() => setActiveSortItem('Recent')}
               >
                  <Text style={sortTextStyle(activeSortItem === 'Recent')}>
                     Recent
                  </Text>
               </TouchableOpacity>
               <TouchableOpacity
                  style={sortBorderStyle(activeSortItem === 'Favorite')}
                  activeOpacity={0.8}
                  onPress={() => setActiveSortItem('Favorite')}
               >
                  <Text style={sortTextStyle(activeSortItem === 'Favorite')}>
                     Favorite
                  </Text>
               </TouchableOpacity>
               <TouchableOpacity
                  style={sortBorderStyle(activeSortItem === 'Rating')}
                  activeOpacity={0.8}
                  onPress={() => setActiveSortItem('Rating')}
               >
                  <Text style={sortTextStyle(activeSortItem === 'Rating')}>
                     Rating
                  </Text>
               </TouchableOpacity>
               <TouchableOpacity
                  style={sortBorderStyle(activeSortItem === 'Popular')}
                  activeOpacity={0.8}
                  onPress={() => setActiveSortItem('Popular')}
               >
                  <Text style={sortTextStyle(activeSortItem === 'Popular')}>
                     Popular
                  </Text>
               </TouchableOpacity>
               <TouchableOpacity
                  style={sortBorderStyle(activeSortItem === 'Trending')}
                  activeOpacity={0.8}
                  onPress={() => setActiveSortItem('Trending')}
               >
                  <Text style={sortTextStyle(activeSortItem === 'Trending')}>
                     Trending
                  </Text>
               </TouchableOpacity>
            </View>
            {restaurants?.map((item) => (
               <RestaurantMediumCard {...item} key={item?.id} />
            ))} */}
            <Separator height={Display.setHeight(5)} />
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
      marginTop: 30,
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
