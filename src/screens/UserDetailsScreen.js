import React, {useContext} from 'react';
import {StyleSheet, Text, View, Dimensions, Animated} from 'react-native';
import {PinchGestureHandler, State} from 'react-native-gesture-handler';
import {ColorContext} from '../../App';

const {width} = Dimensions.get('window');

const UserDetailsScreen = ({route}) => {
  const value = useContext(ColorContext);
  scale = new Animated.Value(1);

  onZoomEventFunction = Animated.event([{nativeEvent: {scale: scale}}], {
    useNativeDriver: true,
  });

  onZoomStateChangeFunction = event => {
    if (event.nativeEvent.oldState == State.ACTIVE) {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  };

  const {image, id, login} = route.params;
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: value === 'light' ? '#E8F9FD' : 'dark',
        marginTop: 100,
      }}>
      <View style={{alignItems: 'center'}}>
        <PinchGestureHandler
          onGestureEvent={onZoomEventFunction}
          onHandlerStateChange={onZoomStateChangeFunction}>
          <Animated.Image
            style={{
              width: width,
              height: 300,
              transform: [{scale: scale}],
              borderRadius: 1,
              margintop: 100,
            }}
            source={{uri: image}}
            resizeMode={'contain'}
          />
        </PinchGestureHandler>
      </View>

      <View
        style={{
          marginLeft: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{fontSize: 20, color: value === 'light' ? 'black' : 'white'}}>
          ID : {id}
        </Text>
        <Text
          style={{fontSize: 20, color: value === 'light' ? 'black' : 'white'}}>
          Name : {login}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default UserDetailsScreen;
