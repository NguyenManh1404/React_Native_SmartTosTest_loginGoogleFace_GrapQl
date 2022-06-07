import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {client} from '../App';

import {QUERY_INBOXES} from '../gql/query';
import {useQuery} from '@apollo/client';

import type {NativeStackScreenProps} from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  DetailPost: undefined;
  AddPost: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({navigation}: Props) => {
  const [refreshing, setRefreshing] = useState(false);

  const {loading, error, data, refetch} = useQuery(QUERY_INBOXES, {});

  if (loading) {
    return <Text>Loading ...</Text>;
  }
  if (error) {
    return <Text>Error ...</Text>;
  }

  type Item = {
    avatar: string;
    fullName: string;
    message: string;
  };

  const renderItem = ({item}: any) => {
    return (
      <View style={styles.viewItemMessage}>
        <View style={styles.viewUser}>
          <Image source={{uri: item.user.avatar}} style={styles.userAvatar} />
          <Text style={styles.userName}>{item.user.fullName}</Text>
        </View>
        <View style={styles.viewMessage}>
          <Text style={styles.messageContent}>{item.message}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{}}>
      {refreshing ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data.getInboxes.items}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListEmptyComponent={() => {
            return (
              <>
                <Text>Empty Post</Text>
              </>
            );
          }}
          refreshControl={
            <RefreshControl
              colors={['#9Bd35A', '#689F38']}
              refreshing={refreshing}
              onRefresh={refetch}
            />
          }
        />
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  viewItemMessage: {
    // backgroundColor: '#f5d0e7',
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  viewUser: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  messageContent: {
    fontSize: 17,
  },
  viewMessage: {
    padding: 10,
  },
});
