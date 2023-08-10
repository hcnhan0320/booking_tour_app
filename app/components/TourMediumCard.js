import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FavoriteAction } from '../actions';

import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import { Colors, Fonts } from '../constants';
import { StaticImageService } from '../services';
import { LinearGradient } from 'expo-linear-gradient';

import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Display } from '../utils';

const truncate = (input) =>
   input?.length > 23 ? `${input.substring(0, 23)}...` : input;

const TourMediumCard = ({
   _id,
   title,
   image,
   departure,
   duration,
   navigate,
   toastRef,
}) => {
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
         <View style={styles.favoriteContainer}>
            <Image
               source={{ uri: StaticImageService.getTourImage(image[0]) }}
               style={styles.posterStyle}
            />

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
               <LinearGradient
                  colors={[Colors.DEFAULT_ORANGE, Colors.DEFAULT_YELLOW]}
                  start={[0, 0]}
                  end={[1, 1]}
                  location={[0.25, 0.4, 1]}
                  style={styles.linearAddFavorite}
               >
                  <AntDesign
                     name={isFavorited ? 'heart' : 'hearto'}
                     size={18}
                     color={Colors.DEFAULT_WHITE}
                  />
               </LinearGradient>
            </TouchableOpacity>

            <View style={styles.infoSection}>
               <View style={styles.rowAndCenter}>
                  <Text style={styles.titleText}>{title}</Text>
               </View>
               <View style={styles.rowAndCenter}>
                  <Entypo
                     name="location"
                     size={12}
                     color={Colors.DEFAULT_YELLOW}
                  />
                  <Text style={styles.departureText}>{departure}</Text>
               </View>
               <View style={styles.rowAndCenter}>
                  <Entypo
                     name="time-slot"
                     size={12}
                     color={Colors.DEFAULT_YELLOW}
                  />
                  <Text style={styles.durationText}>{duration}</Text>
               </View>
            </View>
         </View>
      </TouchableOpacity>
   );
};

export default TourMediumCard;

const styles = StyleSheet.create({
   container: {
      marginVertical: 10,
      marginHorizontal: 30,
   },
   addFavoriteBtn: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      zIndex: 1,
   },
   linearAddFavorite: {
      padding: 10,
      borderRadius: 20,
   },
   favoriteContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.DEFAULT_WHITE,
      paddingHorizontal: 10,
      paddingVertical: 15,
      borderRadius: 20,
      // add shadow
      shadowColor: Colors.DEFAULT_BLACK,
      shadowOffset: {
         width: 0,
         height: 4,
      },
      shadowOpacity: 0.12,
      shadowRadius: 3.84,
   },
   deleteBox: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      width: Display.setWidth(25),
      height: Display.setWidth(25),
      marginVertical: 15,
      top: 0,
      bottom: 0,
      right: 0,
   },
   posterStyle: {
      width: Display.setWidth(25),
      height: Display.setWidth(25),
      borderRadius: 20,
   },
   infoSection: {
      width: Display.setWidth(50),
      height: Display.setWidth(25),
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      marginLeft: 15,
   },
   rowAndCenter: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   titleText: {
      color: Colors.SECONDARY_BLACK,
      fontSize: 16,
      fontFamily: Fonts.POPPINS_SEMI_BOLD,
      lineHeight: 16 * 1.4,
   },
   durationText: {
      marginLeft: 5,
      color: Colors.DEFAULT_GREY,
      fontSize: 14,
      fontFamily: Fonts.POPPINS_REGULAR,
      lineHeight: 14 * 1.4,
   },
   departureText: {
      marginLeft: 5,
      color: Colors.DEFAULT_GREY,
      fontSize: 14,
      fontFamily: Fonts.POPPINS_REGULAR,
      lineHeight: 14 * 1.4,
   },
});
