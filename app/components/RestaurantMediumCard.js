import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Colors, Fonts, Images } from '../constants';
import { Display } from '../utils';
import { StaticImageService } from '../services';

const RestaurantMediumCard = ({ _id, title, image, departure, navigate }) => {
   return (
      <TouchableOpacity style={styles.container} activeOpacity={0.8}>
         <View>
            <Image
               source={{ uri: StaticImageService.getTourImage(image[0]) }}
               style={styles.posterStyle}
            />
         </View>
         <View style={styles.labelContainer}>
            <View style={styles.titleContainer}>
               <Text style={styles.titleText}>{title}</Text>
               <View style={styles.rowAndCenter}>
                  <FontAwesome />
                  <Text style={styles.ratingText}>4.2</Text>
                  <Text style={styles.reviewsText}>({233})</Text>
               </View>
            </View>
            <Text style={styles.tagsText}>22</Text>
            <View style={styles.deliveryDetailsContainer}>
               <View style={styles.rowAndCenter}>
                  <Image
                     source={Images.DELIVERY_CHARGE}
                     style={styles.deliveryDetailsIcon}
                  />
                  <Text style={styles.deliveryDetailsText}>Free Delivery</Text>
               </View>
               <View style={styles.rowAndCenter}>
                  <Image
                     source={Images.DELIVERY_TIME}
                     style={styles.deliveryDetailsIcon}
                  />
                  <Text style={styles.deliveryDetailsText}>
                     {departure} min
                  </Text>
               </View>
               <View style={styles.rowAndCenter}>
                  <Image style={styles.deliveryDetailsIcon} />
                  <Text style={styles.deliveryDetailsText}>{distance}</Text>
               </View>
            </View>
         </View>
      </TouchableOpacity>
   );
};

const styles = StyleSheet.create({
   container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 15,
      elevation: 1,
      borderRadius: 8,
      backgroundColor: Colors.DEFAULT_WHITE,
      marginTop: 10,
   },
   posterStyle: {
      width: Display.setWidth(20),
      height: Display.setWidth(20),
      borderRadius: 10,
      margin: 5,
   },
   labelContainer: {
      flex: 1,
      marginHorizontal: 8,
   },
   titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
   },
   deliveryDetailsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
   },
   titleText: {
      fontSize: 14,
      lineHeight: 14 * 1.4,
      fontFamily: Fonts.POPPINS_BOLD,
      color: Colors.DEFAULT_BLACK,
      marginBottom: 5,
   },
   tagsText: {
      fontSize: 11,
      lineHeight: 11 * 1.4,
      fontFamily: Fonts.POPPINS_MEDIUM,
      color: Colors.DEFAULT_GREY,
      marginBottom: 7,
   },
   deliveryDetailsText: {
      marginLeft: 3,
      fontSize: 12,
      lineHeight: 12 * 1.4,
      fontFamily: Fonts.POPPINS_SEMI_BOLD,
      color: Colors.DEFAULT_BLACK,
   },
   deliveryDetailsIcon: {
      height: 16,
      width: 16,
   },
   rowAndCenter: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   ratingText: {
      marginLeft: 5,
      fontSize: 10,
      lineHeight: 10 * 1.4,
      fontFamily: Fonts.POPPINS_BOLD,
      color: Colors.DEFAULT_BLACK,
   },
   reviewsText: {
      fontSize: 10,
      lineHeight: 10 * 1.4,
      fontFamily: Fonts.POPPINS_MEDIUM,
      color: Colors.DEFAULT_BLACK,
   },
});

export default RestaurantMediumCard;
