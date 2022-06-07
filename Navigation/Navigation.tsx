import React from 'react';
import {NavigationContainer} from '@react-navigation/native'; //Navigation
import {createStackNavigator} from '@react-navigation/stack'; //Navigation

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'; //Navigation BOTTOM_BAR

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; //Icon

import HomeScreen from '../screens/HomeScreen'; //Screen
import LoginScreen from '../screens/LoginScreen'; //Screen
import UserScreen from '../screens/UserScreen'; //Screen
import PostScreen from '../screens/PostScreen';
import DetailPostScreen from '../screens/DetailPostScreen';
import AddPostScreen from '../screens/AddPostScreen';

const Stack = createStackNavigator(); //stack
const BottomTab = createBottomTabNavigator(); //Navigation BOTTOM_BAR

const SignedBottomTab = () => {
  return (
    <BottomTab.Navigator initialRouteName="Home">
      <BottomTab.Screen
        name="Home."
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name="home"
              color={focused ? '#edb021' : 'gray'}
              size={25}
            />
          ), //thêm icon
          headerShown: false,
          tabBarLabelStyle: {color: '#edb021', fontSize: 10},
        }}
      />
      <BottomTab.Screen
        name="Post"
        component={PostScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name="bell-badge"
              color={focused ? '#edb021' : 'gray'}
              size={25}
            />
          ), //thêm icon
          headerShown: false,
          tabBarLabelStyle: {color: '#edb021', fontSize: 10},
        }}
      />
      <BottomTab.Screen
        name="User"
        component={UserScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name="account-multiple"
              color={focused ? '#edb021' : 'gray'}
              size={25}
            />
          ), //thêm icon
          headerShown: false,
          tabBarLabelStyle: {color: '#edb021', fontSize: 10},
        }}
      />
    </BottomTab.Navigator>
  );
};

export const NavigationNotSign = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={SignedBottomTab}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="DetailPost"
          component={DetailPostScreen}
          // options={{headerShown: false}}
        />

        <Stack.Screen
          name="AddPost"
          component={AddPostScreen}
          // options={{headerShown: false}}
        />
        <Stack.Screen
          name="User"
          component={SignedBottomTab}
          // options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export const NavigationSigned = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={SignedBottomTab}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="DetailPost"
          component={DetailPostScreen}
          // options={{headerShown: false}}
        />

        <Stack.Screen
          name="AddPost"
          component={AddPostScreen}
          // options={{headerShown: false}}
        />
        <Stack.Screen
          name="User"
          component={SignedBottomTab}
          // options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
