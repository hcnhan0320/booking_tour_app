import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FavoriteAction } from '../actions';

import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import { Colors, Fonts } from '../constants';
import { StaticImageService } from '../services';
import { LinearGradient } from 'expo-linear-gradient';

import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const truncate = (input) =>
   input?.length > 25 ? `${input.substring(0, 25)}...` : input;

const TourCard = ({ _id, title, image, departure, navigate }) => {
   const dispatch = useDispatch();

   const isFavorited = useSelector(
      (state) =>
         state?.favoriteState?.favorites?.filter((item) => item?.tourId === _id)
            ?.length > 0
   );

   const addFavorite = () =>
      dispatch(FavoriteAction.addFavorite({ tourId: _id }));
   const removeFavorite = () =>
      dispatch(FavoriteAction.removeFavorite({ tourId: _id }));

   return (
      <TouchableOpacity
         key={_id}
         style={styles.container}
         activeOpacity={0.8}
         onPress={() => navigate(_id)}
      >
         <TouchableOpacity
            activeOpacity={1}
            style={styles.addFavoriteBtn}
            onPress={() => {
               isFavorited ? removeFavorite() : addFavorite();
            }}
         >
            <AntDesign
               name={isFavorited ? 'heart' : 'hearto'}
               size={18}
               color={Colors.DEFAULT_ORANGE}
            />
         </TouchableOpacity>
         <Image
            source={{ uri: StaticImageService.getTourImage(image[0]) }}
            style={styles.posterStyle}
         />
         <View style={styles.infoContainer}>
            <View style={styles.infoSection}>
               <Text style={styles.titleText}>{truncate(title)}</Text>
               <View style={styles.locationSection}>
                  <Ionicons
                     name="location"
                     size={16}
                     color={Colors.DEFAULT_ORANGE}
                  />
                  <Text style={styles.locationText}>{departure}</Text>
               </View>
            </View>
            <LinearGradient
               colors={[Colors.DEFAULT_ORANGE, Colors.DEFAULT_YELLOW]}
               start={[0, 0]}
               end={[1, 1]}
               location={[0.25, 0.4, 1]}
               style={styles.buttonSection}
            >
               <MaterialIcons
                  name="arrow-forward-ios"
                  size={14}
                  color={Colors.DEFAULT_WHITE}
               />
            </LinearGradient>
         </View>
      </TouchableOpacity>
   );
};

export default TourCard;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: Colors.DEFAULT_WHITE,
      borderRadius: 25,
      marginVertical: 10,
      // add shadow
      shadowColor: Colors.DEFAULT_BLACK,
      shadowOffset: {
         width: 0,
         height: 4,
      },
      shadowOpacity: 0.12,
      shadowRadius: 3.84,
      elevation: 3,
   },
   addFavoriteBtn: {
      position: 'absolute',
      top: 20,
      right: 20,
      backgroundColor: Colors.DEFAULT_WHITE,
      padding: 10,
      borderRadius: 20,
      zIndex: 1,
   },
   posterStyle: {
      width: 1920 * 0.15,
      height: 1080 * 0.15,
      borderRadius: 20,
      marginHorizontal: 12,
      marginVertical: 14,
      // add shadow
   },
   infoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginHorizontal: 20,
   },
   infoSection: { marginBottom: 20 },
   titleText: {
      fontSize: 18,
      lineHeight: 18 * 1.4,
      fontFamily: Fonts.POPPINS_SEMI_BOLD,
      color: Colors.DEFAULT_BLACK,
   },
   locationSection: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   locationText: {
      fontSize: 14,
      lineHeight: 14 * 1.4,
      fontFamily: Fonts.POPPINS_MEDIUM,
      color: Colors.DEFAULT_GREY,
      marginLeft: 5,
   },
   buttonSection: {
      width: 28,
      height: 28,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
   },
   footerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 8,
      marginBottom: 6,
      justifyContent: 'space-between',
   },
});
