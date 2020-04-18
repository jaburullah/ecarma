import React from 'react';
import {
  View,
  Text,
  TextInput,
  StatusBar,
  Button,
  TouchableOpacity,
  Keyboard, TouchableWithoutFeedback, Platform
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import { DailyItems, WeeklyItems, FortNiteItems, OtherItems } from '../../../model/model';
import { addTicket } from '../../../../api/ticket'
import { AuthContext } from '../../../../store/context';

import { createStackNavigator } from 'react-navigation-stack';
import { AlterWithSingleButton } from '../../common/EcarmaAlter';

const CreateTicket = ({ navigation }) => {
  const isIOS = Platform.OS === "ios";
  const screenProps = navigation.getScreenProps();

  const { model } = React.useContext(AuthContext);

  if (!screenProps.apartmentID) {
    screenProps.apartmentID = "" + model.getUser().apartmentID[0];
  }

  const { dailyTasks, weeklyTasks, fortNiteTasks, otherTasks } = model.getApartmentTasksById(screenProps.apartmentID);
  // console.log(dailyTasks, weeklyTasks, fortNiteTasks, otherTasks)
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
  const [categoryList, changeCategoryList] = React.useState(dailyTasks);
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
      name: 'fortNite',
      label: 'Fortnite',
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
    curPeriod = curPeriod.map((o) => {
      o.isChecked = false;
      if (c.name === o.name) {
        o.isChecked = true;
      }
      return o;
    });
    setPeriod(curPeriod);
    setSelectedPeriod(c.name);
    setCategory("");
    if (c.name === 'daily') {
      changeCategoryList(dailyTasks);
      // setCategory(DailyItems[0].name);
    } else if (c.name === 'weekly') {
      changeCategoryList(weeklyTasks);
      // setCategory(WeeklyItems[0].name);
    } else if (c.name === 'fortNite') {
      changeCategoryList(fortNiteTasks);
      // setCategory(FortNiteItems[0].name);
    }
    else {
      changeCategoryList(otherTasks);
    }
  };

  const getRadioButton = () => {
    return period.map((o) => {
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

    const selectedCategory = categoryList.find(c => c.name === category);

    if (!category) {
      AlterWithSingleButton("Alert", "Select category", () => console.log("OK Pressed"));
      return;
    }


    const newTicket = { title: selectedCategory.title, type: selectedPeriod, status: 'Open', name: selectedCategory.name, description, review: '', userID: model.getUserID(), createdDate: new Date(), modifiedDate: new Date(), apartmentID: screenProps.apartmentID }



    addTicket(newTicket)
    model.addTicket(newTicket);

    AlterWithSingleButton("Alert", "Ticket created successfully", () => {
      console.log(newTicket);

      onChangePeriod({ name: 'daily' });
      setDescription('');
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
    });


  };


  const getRNS = React.useCallback(() => {

    const dropDownItem = categoryList.map((o) => {
      return { label: o.title, value: o.name }
    });
    const placeholder = {
      label: 'Select Category',
      value: null,
      color: '#000',
    }
    let props = isIOS ? {
      Icon: () => {
        return <Icon name="ios-arrow-down" color={"#bdbdbd"} size={20} />
      }
    } : {};

    return <RNPickerSelect style={{

      inputIOS: {
        fontSize: 20
      },
      inputAndroid: {
        fontSize: 18,
        color: '#000',
      }
    }}
      {...props}
      value={category}
      placeholder={placeholder}
      onValueChange={updateCategory}
      items={dropDownItem}
    />
  }, [categoryList, period, category])


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
          {
            isIOS ? <View style={{ marginBottom: 20, marginTop: 30 }} >

              {getRNS()}
            </View> : <View style={{ marginBottom: 10, marginTop: 10 }} >

                {getRNS()}
              </View>
          }

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
