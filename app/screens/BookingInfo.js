import {
   StyleSheet,
   Text,
   View,
   SafeAreaView,
   StatusBar,
   TouchableOpacity,
   TextInput,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import React from 'react';
import { Separator } from '../components';
import { Colors, Fonts } from '../constants';

import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { Display } from '../utils';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Alert } from 'react-native';

const adult = [
   { label: '1 người', value: 1 },
   { label: '2 người', value: 2 },
   { label: '3 người', value: 3 },
   { label: '4 người', value: 4 },
   { label: '5 người', value: 5 },
   { label: '6 người', value: 6 },
   { label: '7 người', value: 7 },
   { label: '8 người', value: 8 },
   { label: '9 người', value: 9 },
   { label: '10 người', value: 10 },
];

const children = [
   { label: '1 người', value: 1 },
   { label: '2 người', value: 2 },
   { label: '3 người', value: 3 },
   { label: '4 người', value: 4 },
   { label: '5 người', value: 5 },
   { label: '6 người', value: 6 },
   { label: '7 người', value: 7 },
   { label: '8 người', value: 8 },
   { label: '9 người', value: 9 },
   { label: '10 người', value: 10 },
];

const BookingInfo = ({ route, navigation }) => {
   const { title } = route.params;

   const [isAdultFocus, setIsAdultFocus] = useState(false);
   const [isChildrenFocus, setIsChildrenFocus] = useState(false);

   const [fullName, setfullName] = useState('');
   const [email, setEmail] = useState('');
   const [phoneNum, setPhoneNum] = useState('');
   const [adultAmount, setAdultAmount] = useState([]);
   const [chilrenAmount, setChilrenAmount] = useState([]);
   const [departureDay, setDepartureDay] = useState('');
   const [departure, setDeparture] = useState('');
   const [total, setTotal] = useState(0);

   const [date, setDate] = useState(new Date());
   const [showPicker, setShowPicker] = useState(false);

   const toggleShowPicker = () => {
      setShowPicker(!showPicker);
   };

   const onChangePicker = ({ type }, selectedDate) => {
      if (type == 'set') {
         const currentDate = selectedDate;
         setDate(currentDate);
      } else {
         toggleShowPicker();
      }
   };

   const formatDate = (rawDate) => {
      let date = new Date(rawDate);
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();

      return `${day} / ${month} / ${year}`;
   };

   const confirmDate = () => {
      setDepartureDay(formatDate(date));
      toggleShowPicker();
   };

   const totalMoney = (adult, children) => {
      const money = 1500000;
      let total = adult * money + children * money;
      return total;
   };

   const submitForm = () => {
      let tourInfo = {
         fullName,
         email,
         phoneNum,
         adultAmount,
         chilrenAmount,
         departureDay,
         departure,
         total,
      };
      return console.log(tourInfo);
   };

   return (
      <SafeAreaView style={styles.container}>
         <StatusBar
            barStyle="light-content"
            backgroundColor={Colors.DEFAULT_GREEN}
            translucent
         />
         <Separator height={StatusBar.currentHeight} />
         <View style={styles.headerContainer}>
            <TouchableOpacity
               style={styles.headerIcon}
               onPress={() => {
                  navigation.goBack();
               }}
            >
               <AntDesign name="arrowleft" size={18} />
            </TouchableOpacity>
            <Text style={styles.headerText}>Thông tin đặt tour</Text>
            <View style={styles.headerIcon}>
               <Entypo name="dots-three-horizontal" size={18} />
            </View>
         </View>
         <Text style={styles.title}>{title}</Text>
         <Separator height={15} />
         <View style={styles.inputContainer}>
            <View style={styles.inputSubContainer}>
               <Feather
                  name="user"
                  size={22}
                  color={Colors.DEFAULT_GREY}
                  style={{ marginRight: 10 }}
               />
               <TextInput
                  placeholder="Họ tên *"
                  placeholderTextColor={Colors.DEFAULT_GREY}
                  selectionColor={Colors.DEFAULT_GREY}
                  style={styles.inputText}
                  onChangeText={(text) => setfullName(text)}
               />
            </View>
         </View>
         <Separator height={15} />
         <View style={styles.inputContainer}>
            <View style={styles.inputSubContainer}>
               <MaterialIcons
                  name="alternate-email"
                  size={22}
                  color={Colors.DEFAULT_GREY}
                  style={{ marginRight: 10 }}
               />
               <TextInput
                  placeholder="Email *"
                  placeholderTextColor={Colors.DEFAULT_GREY}
                  selectionColor={Colors.DEFAULT_GREY}
                  style={styles.inputText}
                  onChangeText={(text) => setEmail(text)}
               />
            </View>
         </View>
         <Separator height={15} />
         <View style={styles.inputContainer}>
            <View style={styles.inputSubContainer}>
               <Feather
                  name="phone"
                  size={22}
                  color={Colors.DEFAULT_GREY}
                  style={{ marginRight: 10 }}
               />
               <TextInput
                  placeholder="Số điện thoại *"
                  placeholderTextColor={Colors.DEFAULT_GREY}
                  selectionColor={Colors.DEFAULT_GREY}
                  style={styles.inputText}
                  onChangeText={(text) => setPhoneNum(text)}
               />
            </View>
         </View>
         <Separator height={15} />

         <Dropdown
            style={[
               styles.inputContainer,
               isAdultFocus && { borderColor: Colors.SECONDARY_ORANGE },
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={adult}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={setIsAdultFocus ? 'Số người lớn' : '...'}
            value={adultAmount}
            onFocus={() => setIsAdultFocus(true)}
            onBlur={() => setIsAdultFocus(false)}
            onChange={(item) => {
               setAdultAmount(item.value);
               setIsAdultFocus(false);
            }}
         />
         <Separator height={15} />

         <Dropdown
            style={[
               styles.inputContainer,
               isChildrenFocus && { borderColor: Colors.SECONDARY_ORANGE },
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={children}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isChildrenFocus ? 'Trẻ em 5-9 tuổi' : '...'}
            value={chilrenAmount}
            onFocus={() => setIsChildrenFocus(true)}
            onBlur={() => setIsChildrenFocus(false)}
            onChange={(item) => {
               setChilrenAmount(item.value);
               setIsChildrenFocus(false);
            }}
         />
         <Separator height={15} />
         <View style={styles.inputContainer}>
            <View style={styles.inputSubContainer}>
               <AntDesign
                  name="calendar"
                  size={22}
                  color={Colors.DEFAULT_GREY}
                  style={{ marginRight: 10 }}
               />
               {!showPicker && (
                  <TouchableOpacity onPress={toggleShowPicker}>
                     <TextInput
                        placeholder="Sat Aug 21 2023"
                        placeholderTextColor={Colors.DEFAULT_GREY}
                        selectionColor={Colors.DEFAULT_GREY}
                        style={styles.inputText}
                        value={departureDay}
                        onChangeText={setDepartureDay}
                        editable={false}
                        onPressIn={toggleShowPicker}
                     />
                  </TouchableOpacity>
               )}
            </View>
         </View>
         <View style={styles.showPicker}>
            {showPicker && (
               <>
                  <View
                     style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                     }}
                  >
                     <TouchableOpacity style={styles.pickerBtn}>
                        <Text style={styles.pickerText}>Cancel</Text>
                     </TouchableOpacity>
                     <TouchableOpacity
                        style={styles.pickerBtn}
                        onPress={confirmDate}
                     >
                        <Text
                           style={{
                              ...styles.pickerText,
                              color: Colors.FABEBOOK_BLUE,
                           }}
                        >
                           Done
                        </Text>
                     </TouchableOpacity>
                  </View>
                  <DateTimePicker
                     mode="date"
                     display="spinner"
                     value={date}
                     onChange={onChangePicker}
                  />
               </>
            )}
         </View>
         <Separator height={15} />
         <View style={styles.inputContainer}>
            <View style={styles.inputSubContainer}>
               <Entypo
                  name="location"
                  size={22}
                  color={Colors.DEFAULT_GREY}
                  style={{ marginRight: 10 }}
               />
               <TextInput
                  placeholder="Địa chỉ/ Điểm đón *"
                  placeholderTextColor={Colors.DEFAULT_GREY}
                  selectionColor={Colors.DEFAULT_GREY}
                  style={styles.inputText}
                  onChangeText={(text) => setDeparture(text)}
               />
            </View>
         </View>
         <Separator height={15} />
         <View style={styles.total}>
            <Text style={styles.totalText}>
               Tổng tiền: {totalMoney(adultAmount, chilrenAmount)} VND
            </Text>
         </View>
         <Separator height={15} />
         <TouchableOpacity style={styles.bookingBtn} onPress={submitForm}>
            <Text style={styles.bookingText}>Đặt tour</Text>
         </TouchableOpacity>
      </SafeAreaView>
   );
};

export default BookingInfo;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: Colors.THIRD_WHITE,
   },
   headerContainer: {
      marginTop: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 30,
      alignItems: 'center',
   },
   headerIcon: {
      backgroundColor: Colors.DEFAULT_WHITE,
      padding: 10,
      borderRadius: 20,
      // add shadow
      shadowColor: Colors.SECONDARY_BLACK,
      shadowOffset: {
         width: 0,
         height: 4,
      },
      shadowOpacity: 0.12,
      shadowRadius: 3.84,
      elevation: 3,
   },
   headerText: {
      fontFamily: Fonts.POPPINS_SEMI_BOLD,
      fontSize: 16,
   },
   title: {
      fontSize: 18,
      fontFamily: Fonts.POPPINS_LIGHT,
      lineHeight: 18 * 1.4,
      marginTop: 20,
      marginHorizontal: 30,
   },
   inputContainer: {
      backgroundColor: Colors.DEFAULT_WHITE,
      paddingHorizontal: 10,
      marginHorizontal: 30,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: Colors.DEFAULT_GREY,
      justifyContent: 'center',
      height: Display.setHeight(6),
   },
   inputSubContainer: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   inputText: {
      fontSize: 16,
      textAlignVertical: 'center',
      padding: 0,
      height: Display.setHeight(6),
      color: Colors.DEFAULT_BLACK,
      flex: 1,
   },
   rowContainer: {
      flexDirection: 'col',
      paddingHorizontal: 30,
   },
   icon: {
      marginRight: 5,
   },
   label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
   },
   placeholderStyle: {
      fontSize: 16,
      // fontSize: 16,
      // textAlignVertical: 'center',
      padding: 0,
      // height: Display.setHeight(6),
      // color: Colors.DEFAULT_BLACK,
      // flex: 1,
   },
   selectedTextStyle: {
      fontSize: 16,
   },
   iconStyle: {
      width: 20,
      height: 20,
   },
   inputSearchStyle: {
      height: 40,
      fontSize: 16,
   },
   total: {
      marginHorizontal: 30,
   },
   totalText: {
      color: Colors.DEFAULT_BLACK,
      fontSize: 20,
      fontFamily: Fonts.POPPINS_SEMI_BOLD,
      lineHeight: 20 * 1.4,
   },
   bookingBtn: {
      marginHorizontal: 30,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.DEFAULT_ORANGE,
      paddingVertical: 10,
      paddingHorizontal: 25,
      borderRadius: 10,
      // add shadow
      shadowColor: Colors.DEFAULT_ORANGE,
      shadowOffset: {
         width: 0,
         height: 4,
      },
      shadowOpacity: 0.5,
      shadowRadius: 3.84,
   },
   bookingText: {
      color: Colors.DEFAULT_WHITE,
      fontSize: 20,
      fontFamily: Fonts.POPPINS_SEMI_BOLD,
      lineHeight: 20 * 1.4,
   },
   showPicker: {
      backgroundColor: Colors.DEFAULT_WHITE,
      position: 'absolute',
      bottom: 0,
      width: '100%',
      marginTop: Display.setHeight(6),
      zIndex: 1,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
   },
   pickerBtn: {
      marginHorizontal: 30,
      marginTop: 10,
   },
   pickerText: {
      color: Colors.DEFAULT_GREY,
      fontSize: 14,
      fontFamily: Fonts.POPPINS_MEDIUM,
      lineHeight: 14 * 1.4,
   },
});
