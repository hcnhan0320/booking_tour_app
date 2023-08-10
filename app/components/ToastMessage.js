import { Image, Platform, StyleSheet, Text } from 'react-native';
import React, {
   useState,
   useCallback,
   useImperativeHandle,
   forwardRef,
} from 'react';
import Animated, {
   useSharedValue,
   useAnimatedStyle,
   useAnimatedGestureHandler,
   withSequence,
   withDelay,
   withTiming,
   withSpring,
   runOnJS,
} from 'react-native-reanimated';
import Ionicons from '@expo/vector-icons/Ionicons';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { Colors, Fonts } from '../constants';

const Toast = forwardRef(({}, ref) => {
   const toastTopAnimation = useSharedValue(-100);
   const [showing, setShowing] = useState(false);
   const [toastType, setToastType] = useState('success');
   const [toastText, setToastText] = useState('');
   const [toastDuration, setToastDuration] = useState(0);
   const TOP_VALUE = Platform.OS === 'ios' ? 60 : 20;
   useImperativeHandle(
      ref,
      () => ({
         show,
      }),
      [show]
   );

   const show = useCallback(
      ({ type, text, duration }) => {
         setShowing(true);
         setToastType(type);
         setToastText(text);
         setToastDuration(duration);
         toastTopAnimation.value = withSequence(
            withTiming(TOP_VALUE),
            withDelay(
               duration,
               withTiming(-100, null, (finish) => {
                  if (finish) {
                     runOnJS(setShowing)(false);
                  }
               })
            )
         );
      },
      [TOP_VALUE, toastTopAnimation]
   );

   const animatedTopStyles = useAnimatedStyle(() => {
      return {
         top: toastTopAnimation.value,
      };
   });

   const gestureHandler = useAnimatedGestureHandler({
      onStart: (_, ctx) => {
         ctx.startY = toastTopAnimation.value;
      },
      onActive: (event, ctx) => {
         if (event.translationY < 100) {
            toastTopAnimation.value = withSpring(
               ctx.startY + event.translationY,
               {
                  damping: 600,
                  stiffness: 100,
               }
            );
         }
      },
      onEnd: (event) => {
         if (event.translationY < 0) {
            toastTopAnimation.value = withTiming(-100, null, (finish) => {
               if (finish) {
                  runOnJS(setShowing)(false);
               }
            });
         } else if (event.translationY > 0) {
            toastTopAnimation.value = withSequence(
               withTiming(TOP_VALUE),
               withDelay(
                  toastDuration,
                  withTiming(-100, null, (finish) => {
                     if (finish) {
                        runOnJS(setShowing)(false);
                     }
                  })
               )
            );
         }
      },
   });

   return (
      <>
         {showing && (
            <PanGestureHandler onGestureEvent={gestureHandler}>
               <Animated.View
                  style={[
                     styles.toastContainer,
                     toastType === 'info'
                        ? styles.infoToastContainer
                        : toastType === 'success'
                        ? styles.successToastContainer
                        : toastType === 'warning'
                        ? styles.warningToastContainer
                        : styles.errorToastContainer,
                     animatedTopStyles,
                  ]}
               >
                  <Ionicons
                     name={
                        toastType === 'info'
                           ? 'checkmark-circle'
                           : toastType === 'success'
                           ? 'checkmark-circle'
                           : toastType === 'warning'
                           ? 'warning'
                           : 'close-circle'
                     }
                     size={24}
                     color={
                        toastType === 'info'
                           ? Colors.DEFAULT_WHITE
                           : toastType === 'success'
                           ? Colors.DEFAULT_GREEN
                           : toastType === 'warning'
                           ? Colors.DEFAULT_YELLOW
                           : Colors.DEFAULT_RED
                     }
                  />
                  <Text
                     style={[
                        styles.toastText,
                        toastType === 'info'
                           ? styles.infoToastText
                           : toastType === 'success'
                           ? styles.successToastText
                           : toastType === 'warning'
                           ? styles.warningToastText
                           : styles.errorToastText,
                     ]}
                  >
                     {toastText}
                  </Text>
               </Animated.View>
            </PanGestureHandler>
         )}
      </>
   );
});

export default Toast;

const styles = StyleSheet.create({
   toastContainer: {
      position: 'absolute',
      top: 0,
      width: '90%',
      padding: 10,
      borderRadius: 10,
      borderWidth: 1,
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      zIndex: 1000,
   },
   toastText: {
      marginLeft: 10,
      fontSize: 14,
      fontFamily: Fonts.POPPINS_MEDIUM,
   },
   infoToastContainer: {
      backgroundColor: '#535353',
   },
   successToastContainer: {
      backgroundColor: Colors.LIGHT_GREEN,
      borderColor: Colors.DEFAULT_GREEN,
   },
   warningToastContainer: {
      backgroundColor: Colors.LIGHT_YELLOW,
      borderColor: Colors.DEFAULT_YELLOW,
   },
   errorToastContainer: {
      backgroundColor: Colors.LIGHT_RED,
      borderColor: Colors.DEFAULT_RED,
   },
   infoToastText: {
      color: Colors.DEFAULT_WHITE,
   },
   successToastText: {
      color: Colors.DEFAULT_GREEN,
   },
   warningToastText: {
      color: Colors.DEFAULT_YELLOW,
   },
   errorToastText: {
      color: Colors.DEFAULT_RED,
   },
});
