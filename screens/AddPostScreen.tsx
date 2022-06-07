import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign'; //Icon

import {Formik} from 'formik';
import * as Yup from 'yup';

import type {NativeStackScreenProps} from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  DetailPost: undefined;
  AddPost: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'AddPost'>;

const AddPostScreen = ({route, navigation}: Props) => {
  // if(route.params){
  const {getPost} = route.params;
  // }

  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [image, setImage] = useState();

  const validationSchema = Yup.object({
    title: Yup.string()
      .trim()
      .min(3, 'Invalidate name')
      .required('Title is required !'),
    content: Yup.string()
      .trim()
      .min(10, 'Invalidate content')
      .required('Content is required !'),
    image: Yup.string().required('Image uri is required !'),
  });

  const initPost = {
    title: '',
    content: '',
    image: '',
  };

  type value = {
    title: string;
    content: string;
    image: string;
    like: number;
    love: number;
  };

  const addPost = async values => {
    const postData = {
      title: values.title,
      content: values.content,
      image: values.image,
      like: 0,
      love: 0,
    };

    try {
      await fetch(`https://60935d54a7e53a0017950c0e.mockapi.io/post`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': 'token-value',
        },
        body: JSON.stringify(postData),
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
        <Formik
          initialValues={initPost}
          validationSchema={validationSchema}
          onSubmit={values => {
            addPost(values);
          }}>
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => {
            const {title, content, image} = values;
            return (
              <>
                <Text
                  style={{color: '#edb021', fontWeight: 'bold', fontSize: 20}}>
                  Title of the post
                </Text>
                {errors.title && touched.title ? (
                  <Text style={{color: 'red'}}>Check title input</Text>
                ) : null}
                <TextInput
                  value={title}
                  style={styles.textInput}
                  placeholder="title"
                  onChangeText={handleChange('title')}
                  onBlur={handleBlur('title')}
                />
                <Text
                  style={{color: '#edb021', fontWeight: 'bold', fontSize: 20}}>
                  Content of the post
                </Text>
                {errors.content && touched.content ? (
                  <Text style={{color: 'red'}}>Check content input</Text>
                ) : null}
                <TextInput
                  multiline
                  value={content}
                  numberOfLines={5}
                  // editable
                  style={{...styles.textInput}}
                  placeholder="content of this post"
                  onChangeText={handleChange('content')}
                  onBlur={handleBlur('content')}
                />
                <Text
                  style={{color: '#edb021', fontWeight: 'bold', fontSize: 20}}>
                  URI Image Post
                </Text>
                {errors.image && touched.image ? (
                  <Text style={{color: 'red'}}>Check image uri input</Text>
                ) : null}
                <TextInput
                  value={image}
                  style={styles.textInput}
                  placeholder="URI Image of this post"
                  onChangeText={handleChange('image')}
                  onBlur={handleBlur('image')}
                />
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={{
                    backgroundColor: 'white',
                    padding: 10,
                    borderRadius: 10,
                    alignItems: 'center',
                    borderWidth: 0.5,
                    borderColor: 'gray',
                  }}>
                  <AntDesign name="save" color={'red'} size={25} />
                  <Text style={{color: 'red'}}>Save</Text>
                </TouchableOpacity>
              </>
            );
          }}
        </Formik>
      </View>
    </ScrollView>
  );
};

export default AddPostScreen;

const styles = StyleSheet.create({
  viewPostItem: {
    // backgroundColor: '#c4d7f5',
    margin: 10,
    borderRadius: 20,
    padding: 10,
    borderWidth: 0.5,
    borderColor: 'gray',
    alignItems: 'center',
  },
  textInput: {
    borderColor: 'gray',
    borderWidth: 1,
    margin: 5,
    width: '90%',
    borderRadius: 5,
  },
});
