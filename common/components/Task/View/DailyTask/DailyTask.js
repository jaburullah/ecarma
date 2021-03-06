import React from 'react';
import { View, Text, Button, FlatList, Picker } from 'react-native';

import styles from './styles';
import ListItem from '../../../common/ListItem';

import InfiniteScroll from '../../../common/InfiniteScroll';
import { updateDailyTasks } from '../../../../../api/dailyTasks'
import { AuthContext } from '../../../../../store/context';

const DailyTask = ({ navigation, data, isLoading, isRefreshing, retrieveMore, CB }) => {
  const { model } = React.useContext(AuthContext);


  const getView = () => {
    if (isLoading) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    } else {

      if (!data.length) {
        return (
          <View style={styles.noTaskFound}>
            <Text>No Tasks found</Text>
          </View>
        );
      }

      return (
        <FlatList
          data={data}
          renderItem={({ item, index }) => (
            <ListItem
              index={index}
              appModel={model}
              data={item}
              updateCallBack={updateDailyTasks}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        // On End Reached (Takes a function)
        // onEndReached={retrieveMore}
        // How Close To The End Of List Until Next Data Request Is Made
        // onEndReachedThreshold={2}
        // Refreshing (Set To True When End Reached)
        // refreshing={isRefreshing}

        />
      );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 8 }}>{getView()}</View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button
          title="Create New Ticket"
          color="#DCA50F"
          onPress={() => {
            navigation.navigate('ticket', { apartmentID: navigation.getScreenProps().apartmentID, CB });
          }}
        />
      </View>

    </View>
  );
};

export default InfiniteScroll(DailyTask, { limit: 10, collection: 'dailyTasks' });
