import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import { DrawerItems } from 'react-navigation-drawer'

import { Image, View } from 'react-native';
import 'react-native-gesture-handler';
import ManagerDashboard from '../Dashboard/Manager/ManagerDashboard';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import UserProfile from '../UserProfile/UserProfile';
const DrawerContent = (props) => (
    <View>
        <View
            style={styles.headerContent}
        >
            <Image
                style={styles.logoSize}
                source={require('../../assets/app_logo.png')}
            />
            {/* <Icon

                name="md-user"
                size={10}
                color="#000"
            /> */}
        </View>
        <DrawerItems {...props} />
    </View>
);



const DrawerNavigation = createDrawerNavigator({
    Dashboard: {
        screen: ManagerDashboard,
        navigationOptions: {
            drawerIcon: () => (
                <Icon

                    name="md-grid"
                    size={30}
                    color="#000"
                />
            )
        }
    },
    // Ticket: {
    //     screen: ManagerTicketView,
    //     navigationOptions: {
    //         drawerIcon: () => (
    //             <Icon

    //                 name="md-albums"
    //                 size={30}
    //                 color="#000"
    //             />
    //         )
    //     }
    // },
    // Task: {
    //     screen: ManagerTaskView,
    //     navigationOptions: {
    //         drawerIcon: () => (
    //             <Icon

    //                 name="md-bookmark"
    //                 size={30}
    //                 color="#000"
    //             />
    //         )
    //     }
    // },
    UserProfile: {
        screen: UserProfile,
        title: "User Profile",
        navigationOptions: {
            drawerIcon: () => (
                <Icon

                    name="md-person"
                    size={30}
                    color="#000"
                />
            )
        }
    }
}, {
    initialRouteName: 'Dashboard',
    contentComponent: DrawerContent,
});


export const ManagerDrawer = createAppContainer(DrawerNavigation);