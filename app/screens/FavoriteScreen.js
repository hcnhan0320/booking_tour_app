import {
   StyleSheet,
   Text,
   View,
   SafeAreaView,
   StatusBar,
   FlatList,
} from 'react-native';
import React from 'react';
import { FavoriteCard, Separator } from '../components';
import { Colors, Fonts } from '../constants';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { FavoriteAction } from '../actions';

const FavoriteScreen = () => {
   const favorites = useSelector((state) => state?.favoriteState?.favorites);
   const dispatch = useDispatch();
   const removeFavorite = (tourId) =>
      dispatch(FavoriteAction.removeFavorite({ tourId }));
   return (
      <SafeAreaView style={styles.container}>
         <StatusBar
            barStyle="light-content"
            backgroundColor={Colors.DEFAULT_GREEN}
            translucent
         />
         <Separator height={StatusBar.currentHeight} />
         <View style={styles.headerContainer}>
            <Text style={styles.titleText}>Favorites Tour</Text>
            <View style={styles.addBtn}>
               <Ionicons name="add" size={18} color={Colors.DEFAULT_BLACK} />
            </View>
         </View>
         <Separator height={15} />
         <FlatList
            data={favorites}
            key={(item) => item._id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
               return (
                  <FavoriteCard
                     {...item.tour}
                     removeFavorite={removeFavorite}
                  />
               );
            }}
         />
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
