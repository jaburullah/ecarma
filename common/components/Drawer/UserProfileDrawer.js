import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import { DrawerItems } from 'react-navigation-drawer'

import { Image, View } from 'react-native';
import 'react-native-gesture-handler';
import ManagerDashboard from '../Dashboard/Manager/ManagerDashboard';
import ManagerTicketView from '../Ticket/View/ManagerTicketView';
import CreateTicket from '../Ticket/Create/CreateTicket';
import styles from './styles';

const DrawerContent = (props) => (
    <View>
        <View
            style={styles.headerContent}
        >
            <Image
                style={styles.logoSize}
                source={require('../../assets/app_logo.png')}
            />
        </View>
        <DrawerItems {...props} />
    </View>
);



const DrawerNavigation = createDrawerNavigator({
    Dashboard: {
        screen: ManagerDashboard,
    },
    Ticket: {
        screen: ManagerTicketView
    },
    NewTicket: {
        title: "New Ticket",
        screen: CreateTicket
    }
}, {
    initialRouteName: 'Dashboard',
    contentComponent: DrawerContent,
});


export const ManagerDrawer = createAppContainer(DrawerNavigation);