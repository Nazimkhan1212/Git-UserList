import React from 'react';
import {
  View,
  Text,
  Stylesheet,
  ImageBackground,
  Appearance,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import UserDetailsScreen from './src/screens/UserDetailsScreen';
import {useState, createContext} from 'react';

const Stack = createStackNavigator();
const HomeStack = createStackNavigator();

export const ColorContext = createContext();

const SplashScreen = ({navigation}) => {
  setTimeout(() => {
    navigation.replace('MainStack');
  }, 2000);
  return <ImageBackground style={{flex: 1}} source={require('./splash.jpg')} />;
};
const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {backgroundColor: 'black'},
      }}>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitleAlign: 'center',
          title: 'Users',
          headerTitleStyle: {
            fontSize: 30,
            color: '#E8F9FD',
            fontFamily: 'Roboto',
            fontWeight: 'bold',
          },
        }}
      />
      <HomeStack.Screen
        name="UserDetails"
        component={UserDetailsScreen}
        options={{
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 30,
            color: '#E8F9FD',
            fontFamily: 'Roboto',
            fontWeight: 'bold',
          },
          headerTintColor: '#E8F9FD',
        }}
      />
    </HomeStack.Navigator>
  );
};

const App = () => {
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  Appearance.addChangeListener(scheme => setTheme(scheme.colorScheme));
  // console.log(theme);
  return (
    <ColorContext.Provider value={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SplashScreen"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="MainStack" component={HomeStackScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ColorContext.Provider>
  );
};

export default App;
