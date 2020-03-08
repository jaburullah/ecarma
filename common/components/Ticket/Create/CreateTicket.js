import React from 'react';
import {
  View,
  Text,
  Picker,
  TextInput,
  StatusBar,
  Button,
  TouchableOpacity,
  ToastAndroid, Keyboard, TouchableWithoutFeedback
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import { DailyItems, WeeklyItems, MonthlyItems, OtherItems } from '../../../model/model';
import { addTicket } from '../../../../api/ticket'
import { AuthContext } from '../../../../store/context';

import { createStackNavigator } from 'react-navigation-stack';
import ManagerTicketView from '../View/ManagerTicketView';

const CreateTicket = ({ navigation }) => {
  const screenProps = navigation.getScreenProps();

  const { model } = React.useContext(AuthContext);

  if (!screenProps.apartmentID) {
    screenProps.apartmentID = "" + model.getUser().apartmentID[0];
  }


  const options = {
    title: 'Select Avatar',
    takePhotoButtonTitle: 'Take a photo',
    chooseFromLibraryButtonTitle: 'Choose from gallery',
    quality: 1,
    // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    // storageOptions: {
    //   skipBackup: true,
    //   path: 'images',
    // },
  };
  const [category, setCategory] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [categoryList, changeCategoryList] = React.useState(DailyItems);
  const [period, setPeriod] = React.useState([
    {
      name: 'daily',
      label: 'Daily',
      isChecked: true,
    },

    {
      name: 'weekly',
      label: 'Weekly',
      isChecked: false,
    },

    {
      name: 'monthly',
      label: 'Monthly',
      isChecked: false,
    },

    {
      name: 'others',
      label: 'Others',
      isChecked: false,
    },
  ]);
  const [selectedPeriod, setSelectedPeriod] = React.useState('daily')
  const onChangePeriod = c => {
    let curPeriod = [...period];
    curPeriod = curPeriod.map((o, i) => {
      o.isChecked = false;
      if (c.name === o.name) {
        o.isChecked = true;
      }
      return o;
    });
    setPeriod(curPeriod);
    setSelectedPeriod(c.name);
    if (c.name === 'daily') {
      changeCategoryList(DailyItems);
      // setCategory(DailyItems[0].name);
    } else if (c.name === 'weekly') {
      changeCategoryList(WeeklyItems);
      // setCategory(WeeklyItems[0].name);
    } else if (c.name === 'monthly') {
      changeCategoryList(MonthlyItems);
      // setCategory(MonthlyItems[0].name);
    }
    else {
      changeCategoryList(OtherItems);
    }
  };

  const getRadioButton = () => {
    return period.map((o, i) => {
      return (
        <View key={o.name} style={styles.flex1}>
          <TouchableOpacity
            onPress={() => onChangePeriod(o)}
            style={styles.radioButtons}>
            {(o.isChecked && (
              <Icon name="md-radio-button-on" size={30} color={'black'} />
            )) || <Icon name="md-radio-button-off" size={30} color={'black'} />}
            <Text style={styles.radioButtonText}>{o.label}</Text>
          </TouchableOpacity>
        </View>
      );
    });
  };

  const updateCategory = v => {
    setCategory(v);
  };

  const selectPhoto = () => {
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        // const source = {uri: response.uri};

        // You can also display the image using data:
        const source = { uri: 'data:image/jpeg;base64,' + response.data };
        console.log(source);
        // this.setState({
        //   avatarSource: source,
        // });
      }
    });
  };

  const onCreateTicket = () => {
    onChangePeriod({ name: 'daily' });
    setDescription('');
    let f = categoryList.find((o) => {
      if (category) {
        if (o.name === category) {
          return true;
        }
      }
      else {
        if (o.name === categoryList[0].name) {
          return true;
        }
      }
    });

    const newTicket = { title: f.title, type: selectedPeriod, status: 'Open', name: category || categoryList[0].name, description, review: '', userID: model.getUserID(), createdDate: new Date(), modifiedDate: new Date(), apartmentID: screenProps.apartmentID }
    addTicket(newTicket)
    model.addTicket(newTicket);
    ToastAndroid.show('Ticket created successfully', ToastAndroid.LONG);
    const refreshCallBack = navigation.getParam('CB');
    if (refreshCallBack) {
      refreshCallBack();
    }
    if (navigation.toggleDrawer) {
      navigation.navigate('Dashboard')
    }
    else {
      navigation.navigate('home')
    }

  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.parentContainer}>
        <StatusBar hidden />
        <View style={styles.container}>
          <View style={styles.rowStyle1}>
            <Text style={styles.headerTitle}>Create New Ticket</Text>
          </View>
          <View style={[styles.radioButtonsContainer]}>
            {getRadioButton()}
          </View>
          <View style={styles.rowStyle1}>
            <Text style={styles.title}>Select Category</Text>
            <Picker
              selectedValue={category}
              onValueChange={updateCategory}
              underlineColorAndroid="black">
              {categoryList.map((o, i) => {
                return (
                  <Picker.Item key={o.name} label={o.title} value={o.name} />
                );
              })}
            </Picker>
          </View>
          <View style={styles.rowStyle4}>
            <Text style={[styles.title, styles.magrinBottom10]}>Description</Text>
            <TextInput
              onChangeText={v => {
                setDescription(v);
              }}
              value={description}
              multiline={true}
              textAlignVertical={'top'}
              numberOfLines={20}
              style={styles.textArea}
            />
          </View>
          <View style={styles.rowStyle2}>
            <View style={styles.uploadIconsContainer}>
              <TouchableOpacity onPress={selectPhoto} style={styles.icon1}>
                <Icon name="md-images" size={45} color={'black'} />
              </TouchableOpacity>
              <TouchableOpacity onPress={selectPhoto}>
                <Icon name="md-videocam" size={45} color={'black'} />
              </TouchableOpacity>
            </View>
            <View style={styles.uploadTextContainer}>
              <Text style={styles.uploadText}>upload image or video</Text>
            </View>
          </View>
          <View style={styles.rowStyle3}>
            <Button title="Create" color="#DCA50F" onPress={onCreateTicket} />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const CreateTicketNavigator = createStackNavigator({
  CreateTicket: {
    screen: CreateTicket,
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
      if (navigation.toggleDrawer) {
        return {
          title: '',
          drawerLabel: '',
          headerMode: 'screen',
          headerLeft: burgerIcon,
          headerStyle: {
            backgroundColor: '#482114',
            elevation: 0,
          },
          headerTintColor: '#fff',
          initialRouteName: "Dashboard"
        };
      }
      return {
        header: null
      }
    }
  }
});


export default CreateTicketNavigator;
