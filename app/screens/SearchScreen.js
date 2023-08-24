import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
   StyleSheet,
   Text,
   View,
   Image,
   SafeAreaView,
   StatusBar,
   TouchableOpacity,
   FlatList,
   TextInput,
} from 'react-native';
import { Colors, Fonts, Images } from '../constants';
import { Separator, Toast, TourMediumCard } from '../components';
import { Display } from '../utils';
import { LinearGradient } from 'expo-linear-gradient';

import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import { TourService } from '../services';
import { debounce } from 'lodash';
import AnimatedLottieView from 'lottie-react-native';

const SearchScreen = ({ navigation }) => {
   const [tours, setTours] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const toastRef = useRef();

   const inputRef = useRef();

   const handleSearch = (search) => {
      if (search && search.length > 1) {
         TourService.searchTour('title', search).then((response) => {
            setIsLoading(false);
            if (response.status) {
               setTours(response.data);
            } else {
               setTours([]);
            }
         });
         setIsLoading(true);
      } else {
         setIsLoading(false);
         setTours([]);
      }
   };

   const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

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
            <Text style={styles.titleText}>Tìm kiếm tour</Text>
            <View style={styles.searchContainer}>
               <View style={styles.searchSection}>
                  <TextInput
                     style={styles.searchText}
                     placeholder="Nhập từ khóa..."
                     placeholderTextColor={Colors.DEFAULT_GREY}
                     onChangeText={handleTextDebounce}
                     selectionColor={Colors.DEFAULT_ORANGE}
                     ref={inputRef}
                  />
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

         {tours?.length > 0 ? (
            isLoading ? (
               <AnimatedLottieView
                  source={Images.LOADING}
                  colorFilters={Colors.DEFAULT_ORANGE}
                  autoPlay
               />
            ) : (
               <View style={styles.horizontalListContainer}>
                  <View style={styles.resultRow}>
                     <View>
                        <Text style={styles.countText}>Có </Text>
                     </View>
                     <View style={styles.countRow}>
                        <Text
                           style={[
                              styles.countText,
                              { color: Colors.DEFAULT_WHITE },
                           ]}
                        >
                           {tours?.length}
                        </Text>
                     </View>
                     <View>
                        <Text style={styles.countText}>
                           {' '}
                           kết quả được tìm thấy
                        </Text>
                     </View>
                  </View>
                  <FlatList
                     data={tours}
                     keyExtractor={(item) => item?._id}
                     showsVerticalScrollIndicator={false}
                     renderItem={({ item }) => (
                        <TourMediumCard
                           {...item}
                           toastRef={toastRef}
                           navigate={(tourId) =>
                              navigation.navigate('TourDetail', { tourId })
                           }
                        />
                     )}
                  />
                  <Separator height={Display.setHeight(8)} />
               </View>
            )
         ) : isLoading ? (
            <AnimatedLottieView
               source={Images.LOADING}
               colorFilters={Colors.DEFAULT_ORANGE}
               autoPlay
            />
         ) : (
            <View style={styles.emptySearch}>
               <Image
                  style={styles.image}
                  source={Images['EMPTY']}
                  resizeMode="contain"
               />
            </View>
         )}
      </SafeAreaView>
   );
};

export default SearchScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: Colors.THIRD_WHITE,
   },
   headerContainer: {
      marginTop: 10,
      marginHorizontal: 30,
   },
   titleText: {
      color: Colors.SECONDARY_BLACK,
      fontSize: 24,
      fontFamily: Fonts.POPPINS_SEMI_BOLD,
      lineHeight: 24 * 1.4,
   },
   searchContainer: {
      height: 50,
      marginTop: 10,
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
      width: '90%',
      height: '100%',
      color: Colors.DEFAULT_BLACK,
      fontSize: 12,
      fontFamily: Fonts.POPPINS_MEDIUM,
      lineHeight: 12 * 1.4,
   },
   horizontalListContainer: {},
   resultRow: {
      marginHorizontal: 30,
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
   },
   resultText: {
      // color: Colors.DEFAULT_BLACK,
      // fontFamily: Fonts.POPPINS_SEMI_BOLD,
   },
   countRow: {
      backgroundColor: Colors.DEFAULT_ORANGE,
      justifyContent: 'center',
      alignItems: 'center',
      width: 25,
      height: 25,
      borderRadius: 25,
   },
   countText: {
      color: Colors.DEFAULT_BLACK,
      fontFamily: Fonts.POPPINS_SEMI_BOLD,
      fontSize: 14,
      lineHeight: 14 * 1.4,
   },
   emptySearch: {
      marginTop: 30,
      marginHorizontal: 30,
      justifyContent: 'center',
      alignItems: 'center',
   },
   image: {
      height: Display.setWidth(100),
      width: Display.setWidth(80),
   },
   notFoundText: {
      color: Colors.DEFAULT_BLACK,
      fontFamily: Fonts.POPPINS_SEMI_BOLD,
      fontSize: 18,
      lineHeight: 18 * 1.4,
   },
});
