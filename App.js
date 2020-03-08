/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React from 'react';
import { Animated, Easing } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Login from './common/components/Login/Login';
import { ManagerDrawer } from './common/components/Drawer/ManagerDrawer'
import { SecretaryDrawer } from './common/components/Drawer/SecretaryDrawer'
import { AuthProvider, AuthContext } from './store/context';

const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 300,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps;

      const thisSceneIndex = scene.index;
      const width = layout.initWidth;

      const opacity = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [0, 1, 1],
        extrapolate: 'clamp'
      });

      const scaleY = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [0, 1, 1],
        extrapolate: 'clamp'
      });

      return {
        opacity,
        transform: [{ scaleY }]
      }
    }
  }
}


const AppNavigator = createStackNavigator({
  login: {
    screen: Login,
    navigationOptions: {
      header: null
    },
  },
  manager_dashboard: {
    screen: ManagerDrawer,
    navigationOptions: {
      header: null
    },
  },
  secretary_dashboard: {
    screen: SecretaryDrawer,
    navigationOptions: {
      header: null
    },
  }
}, {
  transitionConfig
});



const Navigator = createAppContainer(AppNavigator);

const Wrapper = () => {
  const { model } = React.useContext(AuthContext);
  return <Navigator screenProps={{ model }} />
}

const App = () => {

  return <AuthProvider><Wrapper /></AuthProvider>;
}

export default App
