import React from 'react';
import {Text, View} from 'react-native';

import Users from '../components/Users';

const HomeScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#9ED2C6',
      }}>
      <Users />
    </View>
  );
};

export default HomeScreen;
