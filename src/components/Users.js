import React, {useState, useEffect, useContext} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import axios from 'axios';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {ColorContext} from '../../App';

const Users = () => {
  const value = useContext(ColorContext);
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fethcUsers = async () => {
      try {
        const {data} = await axios.get('https://api.github.com/users');
        setUsers(data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fethcUsers();
  }, []);

  return (
    <View
      style={{
        backgroundColor: value === 'light' ? '#E8F9FD' : 'black',
        flex: 1,
      }}>
      <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={styles.linkStyle}
              onPress={() =>
                navigation.navigate('UserDetails', {
                  id: item.id,
                  login: item.login,
                  image: item.avatar_url,
                })
              }>
              <View style={styles.viewStyle}>
                <Image
                  style={styles.imageStyle}
                  source={{uri: item.avatar_url}}
                />
                <View style={styles.viewStyleTwo}>
                  <Text
                    style={{
                      fontSize: 20,
                      color: value === 'light' ? 'black' : 'white',
                    }}>
                    ID : {item.id}
                  </Text>
                  <Text
                    style={{
                      fontSize: 20,
                      color: value === 'light' ? 'black' : 'white',
                    }}>
                    Name : {item.login}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  userStyle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 10,
    alignSelf: 'center',
  },
  linkStyle: {
    // border: 1,
    // borderWidth: 1,
    // borderColor: 'gray',
    margin: 5,
    flex: 1,
  },
  viewStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 10,
    // paddingLeft: 2,
  },
  viewStyleTwo: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 30,
  },
  imageStyle: {
    borderRadius: 50,
    height: 100,
    width: 100,
  },
});
export default Users;
