import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';

import { Colors, Fonts } from '../constants';
import { StaticImageService } from '../services';
import { Display } from '../utils';

import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Entypo from '@expo/vector-icons/Entypo';

import {
   PanGestureHandler,
   PanGestureHandlerGestureEvent,
   Swipeable,
   TouchableOpacity,
} from 'react-native-gesture-handler';
import Animated, {
   runOnJS,
   useAnimatedGestureHandler,
   useAnimatedStyle,
   useDerivedValue,
   useSharedValue,
   withTiming,
} from 'react-native-reanimated';
import { useDispatch } from 'react-redux';
import { FavoriteAction } from '../actions';

const LIST_FAVORITE_HEIGHT = Display.setWidth(25) + 30;

const { width: SCREEN_WIDTH, height } = Dimensions.get('window');
const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.3;

const FavoriteCard = ({
   _id,
   title,
   image,
   departure,
   duration,
   navigate,
   removeFavorite,
}) => {
   const translateX = useSharedValue(0);
   const itemHeight = useSharedValue(LIST_FAVORITE_HEIGHT);
   const marginVertical = useSharedValue(10);
   const opacity = useSharedValue(1);

   const panGesture = useAnimatedGestureHandler({
      onActive: (event) => {
         translateX.value = event.translationX;
      },
      onEnd: () => {
         const shouldBeDismissed = translateX.value < TRANSLATE_X_THRESHOLD;
         if (shouldBeDismissed) {
            translateX.value = withTiming(-SCREEN_WIDTH);
            itemHeight.value = withTiming(0);
            marginVertical.value = withTiming(0);
            opacity.value = withTiming(0);
         } else {
            translateX.value = withTiming(0);
         }
      },
   });

   const rStyle = useAnimatedStyle(() => ({
      transform: [
         {
            translateX: translateX.value,
         },
      ],
   }));

   const rIconContainerStyle = useAnimatedStyle(() => {
      const opacity = withTiming(
         translateX.value < TRANSLATE_X_THRESHOLD ? 1 : 0
      );
      return { opacity };
   });

   const rContainerStyle = useAnimatedStyle(() => {
      return {
         height: itemHeight.value,
         marginVertical: marginVertical.value,
         opacity: opacity.value,
      };
   });

   const endPanGesture = () => {
      if (translateX.value < TRANSLATE_X_THRESHOLD) {
         removeFavorite(_id);
      }
   };

   return (
      <Animated.View style={[styles.container, rContainerStyle]} key={_id}>
         <Animated.View style={[styles.deleteBox, rIconContainerStyle]}>
            <FontAwesome5
               name="trash-alt"
               size={22}
               color={Colors.DEFAULT_RED}
            />
         </Animated.View>
         <PanGestureHandler
            onGestureEvent={panGesture}
            // onEnded={endPanGesture}
         >
            <Animated.View style={[styles.favoriteContainer, rStyle]}>
               <Image
                  source={{ uri: StaticImageService.getTourImage(image[0]) }}
                  style={styles.posterStyle}
               />
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
            </Animated.View>
         </PanGestureHandler>
      </Animated.View>
   );
};

export default FavoriteCard;

const styles = StyleSheet.create({
   container: {
      marginVertical: 10,
      marginHorizontal: 30,
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
