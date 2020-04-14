import React from 'react';
import { View, Text, Image, TouchableOpacity, Button, ScrollView, Platform } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import Dialog, { DialogTitle, DialogContent } from 'react-native-popup-dialog';

import { TransitionView } from "../TransitionView";

import RNPickerSelect from 'react-native-picker-select';

import styles from './styles';
import { AlterWithSingleButton } from './EcarmaAlter';
const ListItem = ({ appModel, data, updateCallBack, index, showDescriptionDialog }) => {
  const isIOS = Platform.OS === "ios";
  const [status, changeStatus] = React.useState(data.status);
  const [review, changeReview] = React.useState(data.review);
  const [modalVisible, changeModalVisible] = React.useState(false);
  const [modalDesVisible, changeModalDesVisible] = React.useState(false);
  const ticketStatuses = [
    { key: 'open', label: 'Open', value: 'Open' },
    { key: 'in_progress', label: 'In progress', value: 'In progress' },
    { key: 'completed', label: 'Completed', value: 'Completed' }
  ]
  const updateStatus = v => {

    changeStatus(v);
    let d = { ...data };
    d.status = v;
    updateCallBack(d);
  };

  const getManagerSmiley = () => {

    if (!review) {
      return (<View
        style={[
          styles.listSmileyEachContainer,
          styles.listSmileyEmpty,
        ]} />);
    }

    let smileyIcon = "";
    if (review === 'happy') {
      smileyIcon = (
        <Image
          source={require(`../../assets/happy_smiley.png`)}
          style={styles.listSmiley}
        />
      );
    } else if (review === 'normal') {
      smileyIcon = (
        <Image
          source={require(`../../assets/normal_smiley.png`)}
          style={styles.listSmiley}
        />
      );
    } else if (review === 'sad') {
      smileyIcon = (
        <Image
          source={require(`../../assets/sad_smiley.png`)}
          style={styles.listSmiley}
        />
      );
    }

    return (<View style={styles.listSmileyEachContainer}>
      {smileyIcon}
    </View>)

  };


  const getIcon = () => {
    if (review) {
      return (<Icon
        key={'search'}
        style={{ paddingRight: 10 }}
        name="md-star"
        color={"#bdbdbd"}
        size={30} />);
    }
    return (<Icon
      key={'search'}
      style={{ paddingRight: 10 }}
      name="md-star-half"
      color={"#000"}
      size={30} />);
  }

  const getDescription = () => {
    return showDescriptionDialog && (
      //md-text
      <View style={{}}>
        <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => { changeModalDesVisible(true) }}>

          <Icon
            key={'search'}
            style={{ paddingRight: 10 }}
            name="md-text"
            color={"#000"}
            size={30} />
        </TouchableOpacity>
      </View>
    ) || (<View></View>);
  }

  const getFeedBackDialog = () => {
    return (<Dialog
      dialogTitle={<DialogTitle title="Feedback" />}
      visible={modalVisible}
      onTouchOutside={() => {
        changeModalVisible(false);
      }}
    >
      <DialogContent>
        <View style={styles.dialogTitleText}>
          <Text style={styles.listHeaderTitle}>{data.title}</Text>
        </View>
        <View style={styles.listSmileyContainer}>
          <View style={styles.listSmileyEachContainer}>
            <View
              style={
                (review === 'happy' && styles.listSmileySelected) ||
                styles.listSmileyNotSelected
              }>
              <TouchableOpacity
                onPress={() => {
                  changeReview('happy');
                  let d = { ...data }
                  d.review = 'happy';
                  updateCallBack(d);
                }}>
                <Image
                  source={require('../../assets/happy_smiley.png')}
                  style={styles.listSmiley}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.listSmileyEachContainer}>
            <View
              style={
                (review === 'normal' && styles.listSmileySelected) ||
                styles.listSmileyNotSelected
              }>
              <TouchableOpacity
                onPress={() => {
                  changeReview('normal');
                  let d = { ...data }
                  d.review = 'normal';
                  updateCallBack(d);
                }}>
                <Image
                  source={require('../../assets/normal_smiley.png')}
                  style={styles.listSmiley}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.listSmileyEachContainer}>
            <View
              style={
                (review === 'sad' && styles.listSmileySelected) ||
                styles.listSmileyNotSelected
              }>
              <TouchableOpacity
                onPress={() => {
                  changeReview('sad');
                  let d = { ...data }
                  d.review = 'sad';
                  updateCallBack(d);
                }}>
                <Image
                  source={require('../../assets/sad_smiley.png')}
                  style={styles.listSmiley}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View>
          <Button
            title="Close"
            color="#DCA50F"
            onPress={() => {
              changeModalVisible(false);
            }}
          />
        </View>
      </DialogContent>
    </Dialog>)
  }

  const getDescriptionDialog = () => {
    return (<Dialog height={0.5}
      dialogTitle={<DialogTitle title="Description" />}
      visible={modalDesVisible}
      onTouchOutside={() => {
        changeModalDesVisible(false);
      }}
    >
      <DialogContent>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 3 }}>
            <ScrollView style={{ flex: 1 }}>
              <View style={{ flex: 1 }}>
                <Text>{data.description || 'No description given'}</Text>
              </View>
            </ScrollView>
          </View>
          <View style={{ flex: 1 }}>
            <Button
              title="Close"
              color="#DCA50F"
              onPress={() => {
                changeModalDesVisible(false);
              }}
            />
          </View>
        </View>
      </DialogContent>
    </Dialog>)
  }

  const getFeedBackTemplate = () => {
    if (appModel.isSecretary()) {
      return (
        <View style={styles.listSmileyContainer}>
          {getDescription()}
          <View style={styles.listSmileyEachContainer}>
            <View
              style={
                styles.listSmileyNotSelected

              }>
              {

                (status === 'Completed') &&
                (<TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                  onPress={() => {
                    if (review) {
                      AlterWithSingleButton("Alter", 'Feedback has given', () => { });
                      return;
                    }
                    changeModalVisible(true)
                  }}>
                  {getIcon()}
                </TouchableOpacity>)
              }
            </View>
          </View>
        </View>
      )
    }
    else {
      return (<View style={styles.listSmileyContainer}>
        {getDescription()}
        {getManagerSmiley()}
      </View>)
    }
  }



  const getRNS = React.useCallback(() => {
    let props = isIOS ? {
      Icon: () => {
        return <Icon name="ios-arrow-down" color={"#bdbdbd"} size={20} />
      }
    } : {};


    return <RNPickerSelect style={{
      inputIOS: {
        fontSize: 18
      },
      inputAndroid: {
        fontSize: 18,
        color: '#000',
      }
    }}
      {...props}
      placeholder={{}}
      value={status}
      onValueChange={updateStatus}
      items={ticketStatuses}

    // doneText: PropTypes.string,
    // onDonePress={(d) => {
    //   console.log(d, "onDonePress");
    // }}
    // onUpArrow={(d) => {
    //   console.log(d, "onUpArrow");
    // }}
    // onDownArrow={(d) => {
    //   console.log(d, "onDownArrow");
    // }}
    // onClose={(d) => {
    //   console.log(d, "onClose");
    // }}
    />
  }, [status, ticketStatuses])



  return (
    <TransitionView index={index} style={styles.listParentContainer} animation="fadeInRight">
      <View style={styles.listContainer}>
        <View style={styles.listHeader}>
          <Text style={styles.listHeaderTitle}>{data.title}</Text>
        </View>
        <View style={styles.listContent}>
          <View style={styles.listStatusText}>
            {(appModel.isSecretary() && <Text>{data.status}</Text>)}
            {(appModel.isManager() && (data.status === 'Completed' ? <Text>{data.status}</Text> : getRNS()))}
          </View>
          <View style={styles.listSmileyParentContainer}>
            {getFeedBackTemplate()}
            {getFeedBackDialog()}
            {getDescriptionDialog()}
          </View>
        </View>
      </View>
    </TransitionView>
  );
};

export default ListItem;
