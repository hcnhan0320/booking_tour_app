import React, { useRef } from 'react';
import {
   StyleSheet,
   Text,
   View,
   SafeAreaView,
   StatusBar,
   FlatList,
   TouchableOpacity,
} from 'react-native';
import { FavoriteCard, Separator, Toast } from '../components';
import { Colors, Fonts } from '../constants';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { FavoriteAction } from '../actions';
import { Display } from '../utils';

const FavoriteScreen = ({ navigation }) => {
   const favorites = useSelector((state) => state?.favoriteState?.favorites);
   const dispatch = useDispatch();
   const removeFavorite = (tourId) =>
      dispatch(FavoriteAction.removeFavorite({ tourId }));

   const toastRef = useRef();

   const handleRemovedToastMessage = () => {
      toastRef.current.show({
         type: 'info',
         text: 'Remove from favorites successful',
         duration: 1500,
      });
   };
   return (
      <SafeAreaView style={styles.container}>
         <StatusBar
            barStyle="light-content"
            backgroundColor={Colors.DEFAULT_GREEN}
            translucent
         />
         <Toast ref={toastRef} />
         <Separator height={StatusBar.currentHeight} />
         <View style={styles.headerContainer}>
            <Text style={styles.titleText}>Favorites Tour</Text>
            <TouchableOpacity
               style={styles.addBtn}
               activeOpacity={0.6}
               onPress={() => navigation.goBack()}
            >
               <Ionicons name="add" size={18} color={Colors.DEFAULT_BLACK} />
            </TouchableOpacity>
         </View>
         <Separator height={25} />
         <FlatList
            data={favorites}
            key={(item) => item._id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
               return (
                  <FavoriteCard
                     {...item.tour}
                     handleRemovedToastMessage={() =>
                        toastRef.current.show({
                           type: 'info',
                           text: 'Remove from favorites successful',
                           duration: 1500,
                        })
                     }
                     removeFavorite={removeFavorite}
                     navigate={(tourId) =>
                        navigation.navigate('TourDetail', { tourId })
                     }
                  />
               );
            }}
         />
         <Separator height={Display.setHeight(8)} />
      </SafeAreaView>
   );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: Colors.THIRD_WHITE,
   },
   headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 10,
      marginHorizontal: 30,
   },
   titleText: {
      color: Colors.SECONDARY_BLACK,
      fontSize: 24,
      fontFamily: Fonts.POPPINS_SEMI_BOLD,
      lineHeight: 24 * 1.4,
   },
   addBtn: {
      backgroundColor: Colors.DEFAULT_WHITE,
      alignItems: 'center',
      justifyContent: 'center',
      width: 40,
      height: 40,
      borderRadius: 40,
      // add shadow
      shadowColor: Colors.DEFAULT_BLACK,
      shadowOffset: {
         width: 0,
         height: 4,
      },
      shadowOpacity: 0.12,
      shadowRadius: 3.84,
      elevation: 5,
   },
});
