import React from 'react';
import { View, Text, StyleSheet, StatusBar, Image } from 'react-native';
import { Colors, Images, Fonts } from '../constants';
import { Display } from '../utils';

const SplashScreen = () => {
   return (
      <View style={styles.container}>
         <StatusBar
            barStyle="light-content"
            backgroundColor={Colors.DEFAULT_GREEN}
            translucent
         />
         <Image
            source={Images.PLATE}
            resizeMode="contain"
            style={styles.image}
         />
         <Text style={styles.title}>FooDelivery</Text>
      </View>
   );
};

export default SplashScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.DEFAULT_GREEN,
   },
   image: {
      height: Display.setHeight(30),
      width: Display.setWidth(60),
   },
   title: {
      color: Colors.DEFAULT_WHITE,
      fontSize: 32,
      fontFamily: Fonts.POPPINS_LIGHT,
   },
});
