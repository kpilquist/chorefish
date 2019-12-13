import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, View, Text, FlatList} from 'react-native';
import {ChoreIcon} from '../tools/choreIcon';
import axios from 'axios';
import '../global';

export class ItemView extends Component {
  constructor(props) {
    super(props);
  }

  reList = () => {
    this.props.update();
  };

  onSelect = data => {
    console.log('Item: ' + data);
  };

  sendData = async (item, action) => {
    axios
      .post(
        global.url + '/api/auth/chore',
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
        this.reList(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  itemItem = item => (
    <TouchableOpacity
      style={styles.iconTouch}
      onPress={() => {
        this.onSelect(item.item.choreuuid);
      }}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <ChoreIcon
            allowance={item.item.moneyValue}
            screenTime={item.item.screentime}
            name={item.item.name}
            fname={item.item.fname}
            type={item.item.isMoney}
            act={item.item.type}
          />
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{item.item.name}</Text>
          <Text style={styles.titleText}>{item.item.fname}</Text>
        </View>

        {this.props.type === 'chore' ? (
          <View style={styles.allowance}>
            <TouchableOpacity
              style={styles.touch}
              onPress={() => {
                this.sendData(item.item.uuid, 'reject');
              }}>
              <Text style={styles.childSt}>Reject</Text>
            </TouchableOpacity>
            <View style={styles.lineStyle} />
            <TouchableOpacity
              style={styles.touch}
              onPress={() => {
                this.sendData(item.item.uuid, 'approve');
              }}>
              <Text style={styles.childSt}>Approve</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.allowance}>
            <TouchableOpacity
              style={styles.touch}
              onPress={() => {
                this.sendData(item.item.choreuuid, 'delete');
              }}>
              <Text style={styles.childSt}>Delete</Text>
            </TouchableOpacity>
            <View style={styles.lineStyle} />
            <TouchableOpacity
              style={styles.touchTwo}
              onPress={() => {
                this.sendData(item.item.choreuuid, 'complete');
              }}>
              <Text style={styles.childSt}>Complete</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  render() {
    return (
      <FlatList
        data={this.props.data}
        renderItem={item => this.itemItem(item)}
        keyExtractor={item => item.choreUUID}
        extraData={this.props}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fffbfb',
    paddingVertical: 5,
    marginVertical: 5,
    marginHorizontal: 2,
    borderWidth: 2,
  },

  component: {
    flex: 1,
    width: 100,
    height: 100,
  },

  iconContainer: {
    height: 50,
    marginHorizontal: 5,
    marginVertical: 2,
  },

  iconTouch: {
    height: 75,
  },

  screenTime: {color: '#292050'},
  allowance: {
    flex: 3,
    flexDirection: 'row',
    marginHorizontal: 5,
  },
  titleText: {color: '#000000', fontSize: 18},
  childSt: {
    color: '#000000',
    paddingVertical: 3,
    paddingHorizontal: 10,
  },
  touch: {
    flex: 1.25,
    borderWidth: 1,
    borderColor: '#0002e7',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchTwo: {
    flex: 1.75,
    borderWidth: 1,
    borderColor: '#e70001',
    borderRadius: 7,
    marginRight: 5,
    marginLeft: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    backgroundColor: '#fffbfb',
    justifyContent: 'center',
    alignItems: 'center',
    width: 115,
    borderWidth: 1,
    borderRadius: 4,
  },

  lineStyle: {
    borderWidth: 1,
    borderColor: '#fffbfb',
  },
});
