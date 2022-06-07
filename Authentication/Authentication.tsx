import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Profile} from 'react-native-fbsdk-next'; // import để
import {NavigationSigned, NavigationNotSign} from '../Navigation/Navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Authentication = () => {
  const [checkStatusSignIn, setCheckStatusSignIn] = useState(false);

  useEffect(() => {
    getDataUser();

    Profile.getCurrentProfile().then(function (currentProfile) {
      console.log(currentProfile);

      if (currentProfile && currentProfile != null) {
        setCheckStatusSignIn(!checkStatusSignIn);
      }
    });
  }, []);

  const getDataUser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@Info_User');
      const userInfo = jsonValue != null ? JSON.parse(jsonValue) : null;
      if (userInfo) {
        setCheckStatusSignIn(!checkStatusSignIn);
      }
    } catch (e) {
      // error reading value
    }
  };

  return (
    <>{checkStatusSignIn ? <NavigationSigned /> : <NavigationNotSign />}</>
  );
};

export default Authentication;

const styles = StyleSheet.create({});
