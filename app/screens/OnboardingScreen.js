import React, { useState, useRef } from 'react';
import {
   StyleSheet,
   Text,
   View,
   StatusBar,
   TouchableOpacity,
} from 'react-native';
import { Colors, Fonts, General } from '../constants';
import { FlatList } from 'react-native-gesture-handler';
import { OnboardingCard, Separator } from '../components';
import { Display } from '../utils';
import { StorageService } from '../services';
import { useDispatch } from 'react-redux';
import { GeneralAction } from '../actions';

const pageStyle = (isActive) =>
   isActive
      ? styles.page
      : { ...styles.page, backgroundColor: Colors.DEFAULT_GREY };

const Pagination = ({ index }) => {
   return (
      <View style={styles.pageContainer}>
         {[...Array(General.ONBOARDING_CONTENTS.length).keys()].map((_, i) =>
            i === index ? (
               <View style={pageStyle(true)} key={i}></View>
            ) : (
               <View style={pageStyle(false)} key={i}></View>
            )
         )}
      </View>
   );
};

const OnboardingScreen = ({ navigation }) => {
   const [onboardingIndex, setOnboardingIndex] = useState(0);
   const onboardingList = useRef();
   const onViewRef = useRef(({ changed }) => {
      setOnboardingIndex(changed[0].index);
   });
   const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

   const pageScroll = () => {
      onboardingList.current.scrollToIndex({
         index: onboardingIndex < 2 ? onboardingIndex + 1 : onboardingIndex,
      });
   };

   const dispatch = useDispatch();

   const navigate = () => {
      StorageService.setFirstTimeUse().then(() => {
         dispatch(GeneralAction.setIsFirstTimeUse());
      });
   };

   return (
      <View style={styles.container}>
         <StatusBar
            barStyle={'dark-content'}
            backgroundColor={Colors.DEFAULT_WHITE}
            translucent
         />
         <Separator height={StatusBar.currentHeight} />

         <Separator height={Display.setHeight(8)} />
         <View style={styles.onboardingListContainer}>
            <FlatList
               ref={onboardingList}
               data={General.ONBOARDING_CONTENTS}
               keyExtractor={(item) => item.title}
               horizontal
               showsHorizontalScrollIndicator={false}
               pagingEnabled
               overScrollMode="never"
               viewabilityConfig={viewConfigRef.current}
               onViewableItemsChanged={onViewRef.current}
               renderItem={({ item }) => <OnboardingCard {...item} />}
            />
         </View>
         <Pagination index={onboardingIndex} />

         <Separator height={Display.setHeight(8)} />
         {onboardingIndex === 2 ? (
            <TouchableOpacity
               style={styles.getStartedButton}
               activeOpacity={0.6}
               onPress={() => navigation.navigate('SignIn')}
            >
               <Text style={styles.getStartedButtonText}>Get Started</Text>
            </TouchableOpacity>
         ) : (
            <View style={styles.buttonContainer}>
               <TouchableOpacity
                  style={{ marginLeft: 10 }}
                  activeOpacity={0.6}
                  onPress={() => onboardingList.current.scrollToEnd()}
               >
                  <Text style={styles.buttonText}>SKIP</Text>
               </TouchableOpacity>
               <TouchableOpacity
                  style={styles.button}
                  activeOpacity={0.6}
                  onPress={() => pageScroll()}
               >
                  <Text style={styles.buttonText}>NEXT</Text>
               </TouchableOpacity>
            </View>
         )}
      </View>
   );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: Colors.DEFAULT_WHITE,
   },
   onboardingListContainer: {
      height: Display.setHeight(70),
      // backgroundColor: Colors.DEFAULT_GREEN,
   },
   pageContainer: { flexDirection: 'row' },
   page: {
      height: 8,
      width: 15,
      backgroundColor: Colors.DEFAULT_ORANGE,
      borderRadius: 32,
      marginHorizontal: 5,
   },
   buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: Display.setWidth(90),
      alignItems: 'center',
   },
   buttonText: {
      fontSize: 16,
      fontFamily: Fonts.POPPINS_BOLD,
      lineHeight: 16 * 1.4,
   },
   button: {
      backgroundColor: Colors.LIGHT_ORANGE,
      paddingVertical: 20,
      paddingHorizontal: 10,
      borderRadius: 32,
   },
   getStartedButton: {
      backgroundColor: Colors.DEFAULT_ORANGE,
      paddingHorizontal: 50,
      paddingVertical: 10,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 2,
   },
   getStartedButtonText: {
      fontSize: 18,
      lineHeight: 18 * 1.4,
      color: Colors.DEFAULT_WHITE,
      fontFamily: Fonts.POPPINS_MEDIUM,
   },
});
