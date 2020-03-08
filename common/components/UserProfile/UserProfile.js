import React from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    ToastAndroid,
    AsyncStorage,
    ScrollView
} from 'react-native';
import styles from './styles';
import { updateUserData } from '../../../api/userProfile'
import { AuthContext } from '../../../store/context';
import { ACTION_LOGOUT } from '../../constants';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/Ionicons';

import Login from '../Login/Login';
// import { SecretaryDrawer } from '../Drawer/SecretaryDrawer';
// import { ManagerDrawer } from '../Drawer/ManagerDrawer';

const UserProfile = ({ navigation }) => {
    const pNav = navigation.dangerouslyGetParent().dangerouslyGetParent();
    const { model, dispatch } = React.useContext(AuthContext);
    const initialState = {
        name: model.getUser().name,
        mobileNo: '',
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    };
    const [state, setState] = React.useState(initialState)

    const _storeData = async (v) => {
        try {
            await AsyncStorage.clear();
            await AsyncStorage.setItem('ecarma_user_mobile_no', v);
        } catch (error) {
            console.log(error)
        }
    };
    const getData = async () => {
        const curUser = model.getUser();
        onChangeMobileNo(curUser.mobileNo)
    }


    React.useEffect(() => {
        getData();
    }, [])

    const onChangeMobileNo = (v) => {
        setState((c) => {
            return {
                ...c,
                mobileNo: v
            }
        })
    }

    const onChangeOldPassword = (v) => {
        setState((c) => {
            return {
                ...c,
                oldPassword: v
            }
        })
    }


    const onChangeNewPassword = (v) => {
        setState((c) => {
            return {
                ...c,
                newPassword: v
            }
        })
    }

    const onChangeConfirmPassword = (v) => {
        setState((c) => {
            return {
                ...c,
                confirmPassword: v
            }
        })
    }

    const onUpdateUserProfile = async () => {

        const user = model.getUser();
        if (!state.mobileNo) {
            ToastAndroid.show("Ender mobile no.", ToastAndroid.SHORT)
        }
        else if (!state.oldPassword) {
            ToastAndroid.show("Ender old password", ToastAndroid.SHORT)
        }
        else if (!state.newPassword) {
            ToastAndroid.show("Ender new password", ToastAndroid.SHORT)
        }
        else if (!state.confirmPassword) {
            ToastAndroid.show("Ender confirm password", ToastAndroid.SHORT)
        }
        else if (state.oldPassword.length > 4 || state.oldPassword.length < 4) {
            ToastAndroid.show("Old password should have 4 numbers", ToastAndroid.SHORT)
        }
        else if (state.oldPassword !== user.password) {
            ToastAndroid.show("You have entered wrong old password", ToastAndroid.SHORT)
        }
        else if (state.newPassword.length > 4 || state.newPassword.length < 4) {
            ToastAndroid.show("New password should have 4 numbers", ToastAndroid.SHORT)
        }
        else if (state.confirmPassword.length > 4 || state.confirmPassword.length < 4) {
            ToastAndroid.show("Confirm password should have 4 numbers", ToastAndroid.SHORT)
        }
        else if (state.confirmPassword !== state.newPassword) {
            ToastAndroid.show("Confirm and New password should match", ToastAndroid.SHORT)
        } else {
            const updateUser = { ...user }
            updateUser.password = state.newPassword;
            updateUser.mobileNo = state.mobileNo;
            _storeData(updateUser.mobileNo);
            updateUserData(updateUser, () => {
                ToastAndroid.show("Updated successfully", ToastAndroid.SHORT);
            }, (msg) => {
                ToastAndroid.show(msg, ToastAndroid.SHORT);
            });
        }

    }
    const onLogout = async () => {
        dispatch({ type: ACTION_LOGOUT, payload: null });
        await AsyncStorage.clear();
        pNav.replace('login');
    }

    return <ScrollView style={styles.parentContainer}>
        <View style={styles.parentContainer}>
            <View style={styles.container}>
                <View style={styles.rowStyle1}>
                    <Text style={styles.headerTitle}>User Profile</Text>
                </View>
                <View style={styles.rowStyle2}>
                    <TextInput style={styles.textInputStyle} value={state.name} editable={false} name="Name" placeholder="Name"></TextInput>
                    <TextInput style={styles.textInputStyle} value={state.mobileNo} name="mobileNo" onChangeText={onChangeMobileNo} placeholder="Mobile No." keyboardType="number-pad" ></TextInput>
                    <TextInput style={styles.textInputStyle} secureTextEntry={true} value={state.oldPassword} onChangeText={onChangeOldPassword} placeholder="Old Password" keyboardType="number-pad" ></TextInput>
                    <TextInput style={styles.textInputStyle} secureTextEntry={true} value={state.newPassword} onChangeText={onChangeNewPassword} placeholder="New Password" keyboardType="number-pad" ></TextInput>
                    <TextInput style={styles.textInputStyle} secureTextEntry={true} value={state.confirmPassword} onChangeText={onChangeConfirmPassword} placeholder="Confirm Password" keyboardType="number-pad" ></TextInput>
                </View>
                <View style={styles.rowStyle3}>
                    <Button title="Update" color="#DCA50F" onPress={onUpdateUserProfile} />
                </View>
                <View style={styles.rowStyle4}>
                    <Button title="Logout" color="#DCA50F" onPress={onLogout} />
                </View>
            </View>
        </View>
    </ScrollView>

}

const UserProfileNavigator = createStackNavigator({
    userProfile: {
        screen: UserProfile,
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
    // login: {
    //     screen: Login,
    //     navigationOptions: {
    //         header: null
    //     },
    // },
    // manager_dashboard: {
    //     screen: ManagerDrawer,
    //     navigationOptions: {
    //         header: null
    //     },
    // },
    // secretary_dashboard: {
    //     screen: Login,
    //     navigationOptions: {
    //         header: null
    //     },
    // }

});


export default UserProfileNavigator;