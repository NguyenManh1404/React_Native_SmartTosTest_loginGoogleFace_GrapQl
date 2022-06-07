import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';

import {AccessToken, LoginManager, Profile} from 'react-native-fbsdk-next'; //facebook

import {GoogleSignin} from '@react-native-google-signin/google-signin'; //google
import auth from '@react-native-firebase/auth'; //google

import FontAwesome from 'react-native-vector-icons/FontAwesome'; //Icon

import AsyncStorage from '@react-native-async-storage/async-storage';

import {client} from '../App';
import {LOGIN_QUERY} from '../gql/mutation';

import {gql, useMutation} from '@apollo/client';

import type {NativeStackScreenProps} from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  DetailPost: undefined;
  AddPost: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;





const LoginScreen = ({navigation}:Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [eyePass, setEyePass] = useState(false);

  const passWordRef = useRef<TextInput>(); // không dùng any

  const [addTodo, {data, error}] = useMutation(LOGIN_QUERY);

  // if (error) {
  //   alert(error);
  // }

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '839149947328-861n89nsmlr371hfr88i97bm0hs4s4u2.apps.googleusercontent.com',
    });
  }, []);

  //Đăng nhập bằng api thường
  const signIn = async () => {
    addTodo({
      variables: {
        input: {
          email: email, //tan.nguyen@team.enouvo.com
          password: password,
        },
      },
    });

    if (data) {
      const jsonValue = JSON.stringify(data);

      await AsyncStorage.setItem('@Info_User', jsonValue);
      console.log('Data', data);
      navigation.navigate('Home');
    }

    // try {
    //   const response = client.mutate({
    //     mutation: LOGIN_QUERY,
    //     variables: {
    //       input: {
    //         email: email, //tan.nguyen@team.enouvo.com
    //         password: password,
    //       },
    //     },
    //   });

    //   const userInfo = (await response).data;

    //   console.log('userInfo', userInfo);

    //   const jsonValue = JSON.stringify(userInfo);

    //   await AsyncStorage.setItem('@Info_User', jsonValue);

    //   navigation.navigate('Home');
    // } catch (error) {
    //   console.log(error);
    // }
  };

  //Đăng nhập bằng google
  const onGoogleLogin = async () => {
    const {idToken} = await GoogleSignin.signIn();

    console.log('IDTOKEN', idToken);

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // // Sign-in the user with the credential
    const user_sign_in = auth().signInWithCredential(googleCredential);

    user_sign_in
      .then(user => {
        const info_full = user.additionalUserInfo.profile;
        console.log(info_full);
        navigation.navigate('Home', {userInfo: info_full});
      })
      .catch(error => {
        console.log(error);
      });
  };

  //Đăng nhập bằng facebook
  const onFacebookButtonPress = () => {
    LoginManager.logInWithPermissions(['public_profile']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            const {accessToken} = data;

            Profile.getCurrentProfile().then(function (currentProfile) {
              console.log('InfoFacebook', currentProfile);

              const jsonValue = JSON.stringify(currentProfile);

              AsyncStorage.setItem('@Info_User', jsonValue);

              // setName(currentProfile?.lastName + ' ' + currentProfile?.firstName);
              // setImage(currentProfile?.imageURL);
            });

            if (accessToken) {
              navigation.navigate('Home');
            }
          });
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error);
      },
    );
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView>
        <View style={styles.container}>
          <View style={styles.viewTop}>
            <Image
              style={styles.logoImage}
              source={require('../assets/logoSmartos.png')}
            />
          </View>
          <View style={styles.viewCenter}>
            <View style={styles.viewInput}>
              <Text style={{color: 'red'}}>
                {error ? JSON.stringify(error.message) : null}
              </Text>
              <View style={styles.viewTextInput}>
                <TextInput
                  returnKeyType="next"
                  // autoFocus={true}
                  style={styles.textInput}
                  placeholder="Email"
                  onChangeText={e => setEmail(e)}
                  onSubmitEditing={() => passWordRef?.current?.focus()}
                />
              </View>
              <View style={styles.viewTextInput}>
                <TextInput
                  ref={passWordRef}
                  returnKeyType="done"
                  style={{...styles.textInput, flex: 1}}
                  placeholder="Mật khẩu"
                  onChangeText={e => setPassword(e)}
                  // keyboardType={'visible-password'}
                  secureTextEntry={eyePass ? false : true}
                  onSubmitEditing={() => signIn()}
                />

                <TouchableOpacity
                  onPress={() => setEyePass(!eyePass)}
                  style={styles.eyePassButton}>
                  <FontAwesome
                    name={eyePass ? 'eye' : 'eye-slash'}
                    color={eyePass ? '#edb021' : 'gray'}
                    size={25}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <Text style={styles.textFogotPass}>Quên mật khẩu ?</Text>
            <View style={styles.viewInput}>
              <TouchableOpacity
                style={styles.buttonSignin}
                onPress={() => signIn()}>
                <Text style={styles.textSignin}>Đăng Nhập</Text>
              </TouchableOpacity>
              <Text style={styles.textSignUp}>
                Chưa có tài khoản?
                <Text style={{color: '#edb021'}}>Đăng ký</Text>
              </Text>
            </View>
          </View>

          <View style={styles.viewBottom}>
            <Text style={styles.textTitleBottom}>Hoặc đăng nhập bằng</Text>

            <View style={styles.viewButtonSignin}>
              <TouchableOpacity
                style={styles.signInButton}
                onPress={onFacebookButtonPress}>
                <Image
                  style={styles.logoImageLogin}
                  source={require('../assets/facebookLogo.png')}
                />
              </TouchableOpacity>

              <TouchableOpacity style={{...styles.signInButton}}>
                <Image
                  style={styles.logoImageLogin}
                  source={require('../assets/appleLogo.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.signInButton}
                onPress={onGoogleLogin}>
                <Image
                  style={styles.logoImageLogin}
                  source={require('../assets/googleLogo.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  //viewTop
  viewTop: {
    flex: 2,
    alignItems: 'center',
  },

  logoImage: {
    // margin:5,
    resizeMode: 'contain',
    width: '40%',
  },

  //viewCenter
  viewCenter: {
    flex: 2.2,
    // backgroundColor: 'yellow',
  },

  viewInput: {
    alignItems: 'center',
  },

  textInput: {
    margin: 5,
    width: '90%',
    borderRadius: 5,
    fontSize: 20,
  },
  textFogotPass: {
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 20,
    color: '#edb021',
  },
  buttonSignin: {
    backgroundColor: '#edb021',
    width: '90%',
    alignItems: 'center',
    borderRadius: 5,
  },
  textSignin: {
    padding: 10,
    fontWeight: 'bold',
    color: 'black',
  },

  viewTextInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    width: '90%',
    borderRadius: 5,
    margin: 5,
  },

  eyePassButton: {
    marginRight: 20,

    justifyContent: 'center',
  },
  //viewBottom
  viewBottom: {
    flex: 2.3,
    alignItems: 'center',
  },
  textTitleBottom: {
    marginVertical: 10,
  },
  textSignUp: {
    marginVertical: 10,
    justifyContent: 'center',
  },
  logoImageLogin: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },

  viewButtonSignin: {
    flexDirection: 'row',
    marginTop: 20,
  },

  signInButton: {
    borderRadius: 20,
    alignItems: 'center',
    marginHorizontal: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'gray',
  },
});
