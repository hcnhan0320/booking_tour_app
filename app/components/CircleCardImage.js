import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { StaticImageService } from '../services';
import { Display } from '../utils';

const CircleCardImage = ({ image }) => {
   return (
      <View style={styles.imgContainer}>
         <Image
            source={{
               uri: StaticImageService.getTourImage(image),
            }}
            resizeMethod="cover"
            style={styles.posterStyle}
         />
      </View>
   );
};

export default CircleCardImage;

const styles = StyleSheet.create({
   imgContainer: {
      paddingRight: 30,
   },
   posterStyle: {
      width: 60,
      height: 60,
      borderRadius: 60,
   },
});
