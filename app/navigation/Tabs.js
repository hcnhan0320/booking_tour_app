import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
   FavoriteScreen,
   CartScreen,
   HomeScreen,
   ProfileScreen,
} from '../screens';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Display } from '../utils';
import { Colors } from '../constants';

const BottomTabs = createBottomTabNavigator();

export default () => (
   <BottomTabs.Navigator
      screenOptions={{
         headerShown: false,
         tabBarStyle: {
            position: 'absolute',
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            height: Display.setHeight(8),
            backgroundColor: Colors.DEFAULT_WHITE,
            borderTopWidth: 0,
         },
         tabBarShowLabel: false,
         tabBarActiveTintColor: Colors.DEFAULT_ORANGE,
         tabBarInactiveTintColor: Colors.LIGHT_ORANGE,
      }}
   >
      <BottomTabs.Screen
         name="Home"
         component={HomeScreen}
         options={{
            tabBarIcon: ({ color }) => (
               <Entypo name="home" size={23} color={color} />
            ),
         }}
      />
      <BottomTabs.Screen
         name="Bookmark"
         component={FavoriteScreen}
         options={{
            tabBarIcon: ({ color }) => (
               <Ionicons name="heart" size={23} color={color} />
            ),
         }}
      />
      <BottomTabs.Screen
         name="Cart"
         component={CartScreen}
         options={{
            tabBarIcon: ({ color }) => (
               <Ionicons name="cart" size={23} color={color} />
            ),
         }}
      />
      <BottomTabs.Screen
         name="Account"
         component={ProfileScreen}
         options={{
            tabBarIcon: ({ color }) => (
               <Ionicons name="person" size={23} color={color} />
            ),
         }}
      />
   </BottomTabs.Navigator>
);
