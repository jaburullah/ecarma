import React from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
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
import { AlterWithSingleButton } from '../common/EcarmaAlter';
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
            AlterWithSingleButton("Alter", 'Ender mobile no.', () => { });
        }
        else if (!state.oldPassword) {
            AlterWithSingleButton("Alter", 'Ender old password', () => { });
        }
        else if (!state.newPassword) {
            AlterWithSingleButton("Alter", 'Ender new password', () => { });
        }
        else if (!state.confirmPassword) {
            AlterWithSingleButton("Alter", 'Ender confirm password', () => { });
        }
        else if (state.oldPassword.length > 4 || state.oldPassword.length < 4) {
            AlterWithSingleButton("Alter", 'Old password should have 4 numbers', () => { });
        }
        else if (state.oldPassword !== user.password) {
            AlterWithSingleButton("Alter", 'You have entered wrong old password', () => { });
        }
        else if (state.newPassword.length > 4 || state.newPassword.length < 4) {
            AlterWithSingleButton("Alter", 'New password should have 4 numbers', () => { });

        }
        else if (state.confirmPassword.length > 4 || state.confirmPassword.length < 4) {
            AlterWithSingleButton("Alter", 'Confirm password should have 4 numbers', () => { });
        }
        else if (state.confirmPassword !== state.newPassword) {
            AlterWithSingleButton("Alter", 'Confirm and New password should match', () => { });
        } else {
            const updateUser = { ...user }
            updateUser.password = state.newPassword;
            updateUser.mobileNo = state.mobileNo;
            _storeData(updateUser.mobileNo);
            updateUserData(updateUser, () => {
                AlterWithSingleButton("Alter", 'Updated successfully', () => { });
            }, (msg) => {
                AlterWithSingleButton("Alter", msg, () => { });
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