import React from 'react';
import {
  View,
  TextInput,
  Text,
  Image,
  StatusBar,
  AsyncStorage,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import styles from './styles';
import { login } from '../../../api/login'
import { AuthContext } from '../../../store/context'
import { ACTION_LOGIN } from '../../constants'
import { AlterWithSingleButton } from '../common/EcarmaAlter';

const Login = ({ navigation }) => {
  const { globalState, model, dispatch } = React.useContext(AuthContext);

  const [mobileNo, setMobileNo] = React.useState("")
  const [userPwd, setUserPwd] = React.useState("")
  const [isLoading, setLoading] = React.useState(true)
  const refFirstDigit = React.useRef(),
    refSecondDigit = React.useRef(),
    refThirdDigit = React.useRef(),
    refFourthDigit = React.useRef();
  let pwd = ['', '', '', ''];

  const _storeData = async (mobileNo, pwd) => {
    try {
      await AsyncStorage.clear();
      await AsyncStorage.setItem('ecarma_user_mobile_no', mobileNo);
      await AsyncStorage.setItem('ecarma_user_mobile_pwd', pwd);
    } catch (error) {
      console.log(error)
    }
  };

  const _retrieveData = async () => {
    try {
      const mobileNo = await AsyncStorage.getItem('ecarma_user_mobile_no');
      const fullPwd = await AsyncStorage.getItem('ecarma_user_mobile_pwd');

      // if (mobileNo || fullPwd) {
      //   fnLogin(mobileNo, fullPwd);
      // }
      // else {
      setMobileNo(mobileNo);
      setUserPwd(fullPwd);
      setLoading(false)
      // }


    } catch (error) {
      console.log(error)
    }
  };

  const onPasswordChange = (me, val) => {
    pwd[me] = val;
    if (me === '0' && val) {
      refSecondDigit.current.focus();
    } else if (me === '1' && val) {
      refThirdDigit.current.focus();
    } else if (me === '2' && val) {
      refFourthDigit.current.focus();
    } else if (me === '3' && val) {
      refFourthDigit.current.focus();
    }

    if (pwd.indexOf('') >= 0) {
      return;
    }
    else if (mobileNo.length > 10 || mobileNo.length < 10) {
      AlterWithSingleButton("Alter", 'Invalid mobile no', () => { });
      setMobileNo("");
      return;
    }

    let fullPwd = pwd.reduce(((a, c) => a + c), '');

    _storeData(mobileNo, fullPwd);
    //fnLogin(mobileNo, fullPwd);
    setMobileNo(mobileNo);
    setUserPwd(fullPwd);

  };

  const fnLogin = (mobileNo, pwd) => {
    login(mobileNo, pwd, (snapshot) => {
      if (snapshot.empty) {
        AlterWithSingleButton("Alter", 'Invalid authentication', () => { });
        setUserPwd("");
        return;
      }
      snapshot.forEach(doc => {
        let d = doc.data();
        if (d.password !== pwd) {
          AlterWithSingleButton("Alter", 'Invalid password', () => { });
          setUserPwd("");
        }
        else {
          d.id = doc.id;
          dispatch({ type: ACTION_LOGIN, payload: d })

        }
      });
    }
    );
  }

  const getView = () => {

    if (isLoading) {
      return (<View style={styles.versionDetailContainer}></View>)
    }
    else {
      if (!userPwd) {
        return (<>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Mobile No."
              keyboardType="numeric"
              value={mobileNo}
              onChangeText={(v) => setMobileNo(v)}
              style={styles.txtMobileNo}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              ref={refFirstDigit}
              maxLength={1}
              keyboardType="numeric"
              onChangeText={val => {
                onPasswordChange('0', val);
              }}
              secureTextEntry={true}
              style={styles.txtPassword}
            />
            <TextInput
              ref={refSecondDigit}
              maxLength={1}
              keyboardType="numeric"
              onChangeText={val => {
                onPasswordChange('1', val);
              }}
              secureTextEntry={true}
              style={styles.txtPassword}
            />
            <TextInput
              ref={refThirdDigit}
              maxLength={1}
              keyboardType="numeric"
              onChangeText={val => {
                onPasswordChange('2', val);
              }}
              secureTextEntry={true}
              style={styles.txtPassword}
            />
            <TextInput
              ref={refFourthDigit}
              maxLength={1}
              keyboardType="numeric"
              onChangeText={val => {
                onPasswordChange('3', val);
              }}
              secureTextEntry={true}
              style={styles.txtPassword}
            />
          </View>
          <View style={styles.forgotPasswordContainer}>
            <Text style={styles.forgotPasswordText}>Forgot Password ?</Text>
          </View>
          <View style={styles.versionDetailContainer}>
            <Text style={styles.versionDetail}>version 0.2.4</Text>
          </View>
        </>);
      }
      else {
        return (<View style={styles.versionDetailContainer}>
          <Text style={styles.versionDetail}>Loading...</Text>
        </View>)
      }
    }

  }

  React.useEffect(() => {
    _retrieveData();
  }, []);

  React.useEffect(() => {
    if (!model.isAuthenticated()) {
      setMobileNo('')
      setUserPwd('')
    }
  }, [globalState.isAuthenticated]);

  React.useEffect(() => {
    if (model.isAuthenticated()) {
      // console.log(navigation)
      if (model.isSecretary()) {
        navigation.replace('secretary_dashboard');
      } else if (model.isManager()) {
        navigation.replace('manager_dashboard');
      }
    }
  }, [model]);

  React.useEffect(() => {
    if (mobileNo && userPwd) {
      fnLogin(mobileNo, userPwd);
    }
  }, [mobileNo, userPwd]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <StatusBar hidden />
        <View style={styles.logoContainer}>
          <Image
            style={styles.logoSize}
            source={require('../../assets/app_logo.png')}
          />
        </View>
        <View style={styles.inputParentContainer}>
          {getView()}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default Login;
