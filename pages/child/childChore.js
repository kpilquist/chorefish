import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, View, Text, FlatList} from 'react-native';
import {ChoreIcon} from '../tools/choreIcon';
import axios from 'axios';
import '../global';

export class ChildChoreView extends Component {
  constructor(props) {
    super(props);
  }

  onSelect = data => {
    console.log('Item: ' + data);
  };

  sendData = async (item, action) => {
    axios
      .post(
        global.url + '/api/auth/complete',
        {
          choreUUID: item,
          action: action,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            Authorization: 'Bearer ' + global.bearer,
          },
        },
      )
      .then(response => {
        console.log('ItemView: ' + JSON.stringify(response));
      })
      .catch(error => {
        console.log(error.data.error);
      });
  };

  itemItem = item => (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <ChoreIcon
          allowance={item.item.moneyValue}
          screenTime={item.item.timevalue}
          name={item.item.name}
          fname={item.item.cname}
          type={item.item.type}
          act={item.item.type}
        />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>
          {' '}
          {item.item.cname.length > 15
            ? item.item.cname.substring(0, 12) + '...'
            : item.item.cname}
        </Text>
        <Text style={styles.titleText}>
          {' '}
          {item.item.name.length > 15
            ? item.item.name.substring(0, 12) + '...'
            : item.item.name}
        </Text>
      </View>

      <View style={styles.rButton}>
        {item.item.complete ? (
          <Text>Awaiting Approval</Text>
        ) : (
          <TouchableOpacity
            style={styles.iconTouch}
            onPress={() => {
              this.onSelect(item.item.uuid);
            }}>
            <Text> Complete </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  render() {
    console.log(this.props.data);
    return (
      <FlatList
        data={this.props.data}
        renderItem={item => this.itemItem(item)}
        keyExtractor={item => item.uuid}
        extraData={this.props}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 2,
    marginHorizontal: 1,
    paddingVertical: 5,
    flexDirection: 'row',
    borderWidth: 2,
    borderRadius: 4,
  },

  component: {
    flex: 1,
  },

  iconContainer: {
    height: 50,
    paddingLeft: 5,
  },
  titleContainer: {
    backgroundColor: '#fffbfb',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 4,
    paddingRight: 5,
    marginLeft: 10,
  },
  titleText: {
    fontSize: 18,
    marginHorizontal: 2.75,
  },
  lineStyle: {
    borderWidth: 1,
    borderColor: '#fffbfb',
  },
  rButton: {
    borderWidth: 1,
    marginHorizontal: 10,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
});
