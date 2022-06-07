import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import AntDesign from 'react-native-vector-icons/AntDesign'; //Icon

const PostScreen = ({navigation}) => {
  const [dataPosts, setDataPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getPost();
  }, []);

  const getPost = async () => {
    try {
      const response = await fetch(
        'https://60935d54a7e53a0017950c0e.mockapi.io/post',
        {
          method: 'GET',
        },
      );

      const dataRes = await response.json();
      setRefreshing(false);
      console.log('dataRes', dataRes);

      setDataPosts(dataRes);

      //  console.log(dataPosts);
    } catch (error) {
      console.log(error);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    getPost();
  };

  const deletePost = async id => {
    try {
      await fetch(`https://60935d54a7e53a0017950c0e.mockapi.io/post/${id}`, {
        method: 'delete',
      }).then(response => response.json());

      getPost(); // gọi lại data sau khi xóa
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async (id):number => {
    console.log(id);

    try {
      const response = await fetch(
        `https://60935d54a7e53a0017950c0e.mockapi.io/post/${id}`,
        {
          method: 'GET',
        },
      );
      const dataRes = await response.json();

      const putData = {
        title: dataRes.title,
        content: dataRes.content,
        image: dataRes.image,
        like: dataRes.like + 1,
        love: dataRes.love,
      };

      await fetch(`https://60935d54a7e53a0017950c0e.mockapi.io/post/${id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': 'token-value',
        },
        body: JSON.stringify(putData),
      });
      getPost();
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({item}) => {
    return (
      <View key={item.id} style={styles.viewPostItem}>
        <Text style={styles.titleText}>Chủ đề: {item.title}</Text>

        <Image
          source={{uri: item.image}}
          style={{
            width: '100%',
            height: 300,
            resizeMode: 'contain',
            borderRadius: 5,
          }}
        />

        <View style={styles.viewConten}>
          <Text style={styles.contentText}>Nội dung: {item.content}</Text>
        </View>

        <View style={styles.viewLikeLove}>
          <TouchableOpacity onPress={() => handleLike(item.id)}>
            <Text>
              <AntDesign name="like1" color={'blue'} size={25} />
              {item.like}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text>
              <AntDesign name="heart" color={'pink'} size={25} />
              {item.love}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.viewAction}>
          <TouchableOpacity
            style={{alignItems: 'center', justifyContent: 'center'}}
            onPress={() => deletePost(item.id)}>
            <AntDesign name="delete" color={'red'} size={20} />
            <Text>Delete</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('DetailPost', {
                post: {
                  id: item.id,
                  title: item.title,
                  content: item.content,
                  image: item.image,
                  like: item.like,
                  love: item.love,
                  getPost: getPost,
                },
              });
            }}>
            <AntDesign name="edit" color={'green'} size={25} />
            <Text>Detail</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate('AddPost', {getPost: getPost})}
        style={styles.buttonAddPost}>
        <AntDesign name="plussquare" color={'white'} size={20} />
      </TouchableOpacity>

      {refreshing ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={dataPosts}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          refreshControl={
            <RefreshControl
              colors={['#9Bd35A', '#689F38']}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        />
      )}
      
    </View>
  );
};

export default PostScreen;

const styles = StyleSheet.create({
  viewPostItem: {
    // backgroundColor: '#cfe0fa',
    margin: 10,
    borderRadius: 20,
    padding: 10,
    borderWidth: 0.5,
    borderColor: 'gray',
    shadowOpacity: 2,
    shadowOffset: {width: 10, height: 10},
    // alignItems: 'center'
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#edb021',
  },
  viewConten: {
    padding: 10,
  },
  contentText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  viewLikeLove: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  viewAction: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10,
  },
  buttonAddPost: {
    backgroundColor: '#edb021',
    position: 'absolute',
    zIndex: 1,
    bottom: 50,
    right: 20,
    padding: 20,
    borderRadius: 100,
  },
});
