import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Authentication from './Authentication/Authentication';

import {
  ApolloClient, // tạo client
  InMemoryCache, // tạo thuộc tính
  ApolloProvider, //Bọc ngoài
  useQuery, //dùng để query
  gql, //
} from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://services-staging.smartos.space/graphql-api/whitelabel/graphql',
  cache: new InMemoryCache(),
  headers: {
    iosid: 'com.enouvo.smartos.whitelabel',
    platform: 'WHITELABEL_APP',
    appdevice: 'IOS',
    authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmdWxsTmFtZSI6Ik5ndXnhu4VuIE1pbmggVMOibiIsInVzZXJuYW1lIjpudWxsLCJlbWFpbCI6InRhbi5uZ3V5ZW5AdGVhbS5lbm91dm8uY29tIiwiaWQiOiIxNzA1NDE0OTY0MDM3MjQiLCJyb2xlSWQiOm51bGwsImZhY2Vib29rSWQiOm51bGwsImdvb2dsZUlkIjpudWxsLCJhcHBsZUlkIjpudWxsLCJjb3VudHJ5IjoiQWZnaGFuaXN0YW4iLCJiaXJ0aGRheSI6IjIwMjItMDUtMTBUMDc6NTQ6MzIuNTQyWiIsInBob25lTnVtYmVyIjoiMTExMTExMTExIiwiYXZhdGFyIjoiaHR0cHM6Ly9zMy1hcC1zb3V0aGVhc3QtMS5hbWF6b25hd3MuY29tL2ZpbGVzLnNtYXJ0ZXJvZmZpY2Uuc3BhY2UvMTIwODU5NTAwXzE2NzI4NzM0NTAwMzgxMF80MDYwOTEyNTM3OTYwODg0NTdfby1hMDJjZDg2NTgwNmJkYjM4LmpwZyIsInBsYXRmb3JtIjoiV0hJVEVMQUJFTF9BUFAiLCJyb2xlVHlwZXMiOlsibW9iaWxlIiwiYnVzaW5lc3MiLCJidXNpbmVzcyIsImJ1c2luZXNzIiwiYnVzaW5lc3MiLCJidXNpbmVzcyJdLCJ0dGwiOjg2NDAwLCJpYXQiOjE2NTMwMzE5ODMsImV4cCI6MTY1MzExODM4M30.uPC7zBfHE3KPJMwu50pKyL6eKpUNpUULRSoAFltMVjI',
  },
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Authentication />
    </ApolloProvider>
  );
};

const styles = StyleSheet.create({});

export default App;
