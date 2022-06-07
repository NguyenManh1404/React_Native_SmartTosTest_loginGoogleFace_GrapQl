import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign'; //Icon

import type {NativeStackScreenProps} from '@react-navigation/native-stack';

type routeParams = {
  id: number | undefined;
  title: string;
  content: string;
  image: string;
  like: number;
  love: number;
  getPost: any;
};

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  DetailPost: {
    post: {
      id: number | undefined;
      title: string;
      content: string;
      image: string;
      like: number;
      love: number;
      getPost: any;
    };
  };
  AddPost: undefined;
  Post: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'DetailPost'>;

const DetailPostScreen = ({route, navigation}: Props) => {
  const {id, title, content, image, like, love, getPost}: routeParams =
    route.params?.post;

  console.log(route.params.post);

  const [checkBoxEdit, setCheckBoxEdit] = useState(false);

  const [titleEdit, setTitleEdit] = useState(title);
  const [contentEdit, setContentEdit] = useState(content);
  const [imageEdit, setImageEdit] = useState(image);

  const updatePost = async (id: number) => {
    const putData = {
      title: titleEdit,
      content: contentEdit,
      image: imageEdit,
      like: like,
      love: love,
    };

    try {
      await fetch(`https://60935d54a7e53a0017950c0e.mockapi.io/post/${id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': 'token-value',
        },
        body: JSON.stringify(putData),
      });

      getPost();
      navigation.navigate('Post');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={{flex: 1}}>
      <View style={styles.viewPostItem}>
        <View style={styles.viewTitle}>
          <Text style={styles.titleText}>Chủ đề: {title}</Text>

          <TouchableOpacity
            style={{
              backgroundColor: 'white',
              padding: 5,
              borderRadius: 10,
            }}
            onPress={() => setCheckBoxEdit(!checkBoxEdit)}>
            <AntDesign name="edit" color={'red'} size={20} />
          </TouchableOpacity>
        </View>

        <Image
          source={{uri: image}}
          style={{
            width: '100%',
            height: 300,
            resizeMode: 'contain',
            borderRadius: 5,
          }}
        />

        <Text style={styles.contentText}>Nội dung: {content}</Text>

        <View style={styles.viewLikeLove}>
          <TouchableOpacity>
            <Text>
              <AntDesign name="like1" color={'blue'} size={25} />
              {like}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text>
              <AntDesign name="heart" color={'pink'} size={25} />
              {love}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {checkBoxEdit ? (
        <View style={{...styles.viewPostItem, alignItems: 'center'}}>
          <TextInput
            style={styles.textInput}
            defaultValue={title}
            onChangeText={e => setTitleEdit(e)}
          />
          <TextInput
            numberOfLines={4}
            multiline
            style={styles.textInput}
            defaultValue={content}
            onChangeText={e => setContentEdit(e)}
          />
          <TextInput
            style={styles.textInput}
            defaultValue={image}
            onChangeText={e => setImageEdit(e)}
          />
          <TouchableOpacity
            onPress={() => updatePost(id)}
            style={{backgroundColor: 'white', padding: 10, borderRadius: 10}}>
            <AntDesign name="save" color={'red'} size={25} />
            <Text style={{color: 'red'}}>Save</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </ScrollView>
  );
};

export default DetailPostScreen;

const styles = StyleSheet.create({
  viewPostItem: {
    backgroundColor: '#c4d7f5',
    margin: 10,
    borderRadius: 20,
    padding: 10,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
  },
  contentText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  viewLikeLove: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  textInput: {
    borderColor: 'gray',
    borderWidth: 1,
    margin: 5,
    width: '90%',
    borderRadius: 5,
    fontSize: 15,
    fontWeight: 'bold',
  },
  viewTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // alignSelf: 'flex-start',
  },
});
