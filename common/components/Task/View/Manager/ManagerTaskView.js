import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';


import DailyTask from '../DailyTask/DailyTask';
import WeeklyTask from '../WeeklyTask/WeeklyTask';
import FortNiteTask from '../FortNiteTask/FortNiteTask';
import CreateTicket from '../../../Ticket/Create/CreateTicket';
import ManagerApartmentInfo from '../ManagerApartmentInfo';
import { AuthContext } from '../../../../../store/context';




const ManagerTaskView = ({ navigation }) => {

  const TaskTab = createMaterialTopTabNavigator(
    {
      daily: (props) => (<DailyTask {...props} />),
      weekly: (props) => (<WeeklyTask {...props} />),
      fortNite: (props) => (<FortNiteTask {...props} />)
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




  const TaskStackNavigator = createStackNavigator({
    home: {
      screen: TaskTab
    },
    ticket: {
      screen: CreateTicket
    },
  },
    {
      headerMode: 'none',
      navigationOptions: {
        headerVisible: false,
      }
    });


  const TaskStackAppContainer = createAppContainer(TaskStackNavigator);


  const { model } = React.useContext(AuthContext);
  const apartments = model.getApartments();

  const tabs = apartments.reduce(((a, v) => {
    a[v.name.replace(/\s+/g, '_')] = {
      screen: () => (<TaskStackAppContainer screenProps={{ apartmentID: v.id }} />),
      navigationOptions: {
        title: v.name,
      },
    }
    return a;
  }), {});

  const ApartmentTab = createMaterialTopTabNavigator(
    tabs,
    {
      // initialRouteName: '',
      lazy: true,
      swipeEnabled: true,
      swipe: true,
      animationEnabled: true,
      tabBarOptions: {
        activeTintColor: 'white',
        scrollEnabled: true,
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
  const ApartmentTabNavigator = createAppContainer(ApartmentTab);

  return <ApartmentTabNavigator />

}

export default ManagerApartmentInfo(ManagerTaskView);
