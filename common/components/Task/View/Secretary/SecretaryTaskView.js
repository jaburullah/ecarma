import React, { Fragment } from 'react';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import { createStackNavigator } from 'react-navigation-stack';
import CreateTicket from '../../../Ticket/Create/CreateTicket';

import styles from './styles';

import DailyTask from '../DailyTask/DailyTask';
import WeeklyTask from '../WeeklyTask/WeeklyTask';
import FortNiteTask from '../FortNiteTask/FortNiteTask';
import ManagerApartmentInfo from '../ManagerApartmentInfo';
import { AuthContext } from '../../../../../store/context';




const Nav = ({ navigation }) => {
  const ApartmentTab = createMaterialTopTabNavigator(
    {
      daily: (props) => (<DailyTask {...props} />),
      weekly: (props) => (<WeeklyTask {...props} />),
      fortNite: (props) => (<FortNiteTask {...props} />),
    },
    {
      initialRouteName: navigation.getParam('tabName'),
      lazy: true,
      swipeEnabled: true,
      swipe: true,
      animationEnabled: true,
      tabBarOptions: {
        activeTintColor: 'white',
        inactiveTintColor: 'white',

        indicatorStyle: {
          backgroundColor: 'yellow',
        },
        style: {
          backgroundColor: '#482114',
          elevation: 0,
        },
      },
    },
  );



  const navigationOptions = ({ navigation }) => {

    return {
      title: '',
      drawerLabel: '',
      headerStyle: {
        backgroundColor: '#482114',
        elevation: 0,
      },
      headerTintColor: '#fff',
      initialRouteName: "Dashboard"
    };
  }


  const AppNavigator = createStackNavigator({
    home: {
      screen: ApartmentTab,
      navigationOptions,
    },
    ticket: {
      screen: CreateTicket,
      navigationOptions
    },
  },
    {
      headerMode: 'none',
      navigationOptions: {
        headerVisible: false,
      }
    });

  const SubNavigator = createAppContainer(AppNavigator);





  const { model } = React.useContext(AuthContext);
  const apartments = model.getApartments();

  return <SubNavigator screenProps={{ apartmentID: apartments[0].id }} />
}


export default ManagerApartmentInfo(Nav);
