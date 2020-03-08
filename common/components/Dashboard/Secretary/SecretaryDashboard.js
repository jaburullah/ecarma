import React from 'react';
import { View, Text, Image, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import styles from './styles';
import Dashboard from '../DashBoard';
import SecretaryTaskView from '../../Task/View/Secretary/SecretaryTaskView';
import SecretaryTicketView from '../../Ticket/View/SecretaryTicketView';
import Icon from 'react-native-vector-icons/Ionicons';
const SecretaryDashboard = ({ navigation, state }) => {

  const onTouchTask = (type, tabName) => {
    if (type === 'ticket') {
      navigation.navigate(`secretary_ticket_view`);
      return;
    }
    navigation.navigate(`secretary_task_view`, { tabName });
  };

  const showSmiley = (o) => {
    if (o.max === 'happy' || true) {
      return (<View style={[styles.taskSmileyContainer]}>
        <Image
          style={styles.taskSmiley}
          source={require('../../../assets/happy_smiley_big.png')}
        />
        <Text style={styles.taskSmileyText}>{o.happyPercent}%</Text>
      </View>)
    }
  }

  // React.useEffect(() => {

  //   this.props.navigator.resetTo({
  //     // title: 'Categories',
  //     component: CategoryView,
  //   });
  // }, []);

  const getView = () => {
    if (state.isLoading) {
      return (
        <View style={styles.taskLoadingContainer}>
          <Text>Loading...</Text>
        </View>
      );
    } else {
      return state.tickets.map((o, i) => {
        return (
          <View key={`${o.name}_${i}`} style={styles.taskContainer}>
            <View style={styles.taskCountContainer}>
              <TouchableOpacity onPress={() => { onTouchTask((i === 0 ? 'ticket' : 'task'), o.name) }}>
                <View style={styles.taskCount}>
                  <Text style={styles.taskTextTitle}>OPEN {i === 0 ? 'TICKET' : 'TASK'}</Text>
                  <Text style={styles.taskTextCount}>{o.openTicketCount}</Text>
                  <Text style={styles.taskTextTitle}>{o.title}</Text>
                </View>
              </TouchableOpacity>
            </View>
            {/* <View style={styles.taskSmileyParentContainer}>{showSmiley(o)}
            </View> */}
          </View>
        );
      }); ``
    }
  };

  return (
    <ScrollView style={styles.parent}>
      <StatusBar hidden />
      <View style={styles.headerTitleRow}>
        {/* <Text style={styles.headerTitle}>DASHBOARD - SECRETARY</Text> */}
      </View>
      <View style={styles.headerTitleRow}>
        <Text style={styles.headerTitle}>{!state.apartmentInfo[0] ? '' : state.apartmentInfo[0]}</Text>
      </View>
      <View style={styles.headerSubTitleRow}>
        <Text style={styles.headerSubTitle}>Task View</Text>
      </View>
      {getView()}
    </ScrollView>
  );
};

const navigationOptions = () => {
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


const DD = Dashboard(SecretaryDashboard);
const SecretaryNavigator = createStackNavigator({
  Dashboard: {
    screen: DD,
    navigationOptions: ({ navigation }) => {

      const menuClickEvent = () => {
        navigation.toggleDrawer();
      }
      let burgerIcon = <Icon
        style={{ paddingLeft: 10 }}
        name="md-menu"
        size={30}
        color="#fff"
        onPress={menuClickEvent}
      />
      return {
        title: '',
        drawerLabel: '',
        headerLeft: burgerIcon,
        headerStyle: {
          backgroundColor: '#482114',
          elevation: 0,
        },
        headerTintColor: '#fff',
        initialRouteName: "Dashboard"
      };
    }
  },
  secretary_task_view: {
    screen: SecretaryTaskView,
    navigationOptions: navigationOptions
  },
  secretary_ticket_view: {
    screen: SecretaryTicketView,
    navigationOptions: navigationOptions
  },
});



export default SecretaryNavigator;
