import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Profile, LoginButton} from 'react-native-fbsdk-next'; // import để
import AsyncStorage from '@react-native-async-storage/async-storage';

import auth from '@react-native-firebase/auth'; //google-signin
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  DetailPost: undefined;
  AddPost: undefined;
  User: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'User'>;

const UserScreen = ({navigation}: Props) => {
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    getDataUser();
  }, []);

  const getDataUser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@Info_User');
      const userInfo = jsonValue != null ? JSON.parse(jsonValue) : null;
      // console.log('hhhhhhh', userInfo);
      if (userInfo) {
        setUserInfo(userInfo);
      }
    } catch (e) {
      // error reading value
    }
  };

  const logoutApi = async () => {
    await AsyncStorage.removeItem('@Info_User');
    setUserInfo([]);
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
    navigation.navigate('Login');
    await GoogleSignin.revokeAccess();
  };

  console.log('userInfo', userInfo);

  return (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      {userInfo.firstName && userInfo ? (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>UserScreen</Text>
          <Image
            source={{uri: userInfo.imageURL || null}}
            style={{width: 100, height: 100, borderRadius: 100}}
          />
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            {userInfo.firstName}
          </Text>
          <LoginButton
            onLoginFinished={(error, result) => {
              if (error) {
                alert('login has error: ' + result.error);
              } else {
                alert('login is cancelled.');
              }
            }}
            onLogoutFinished={() => logoutApi()}
          />
        </View>
      ) : (
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            style={{padding: 10, backgroundColor: '#edb021'}}
            onPress={() => logoutApi()}>
            <Text style={{fontSize: 15, fontWeight: 'bold', color: 'white'}}>
              Đăng xuất
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default UserScreen;

const styles = StyleSheet.create({});
