import React, {Component} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {ChoreIcon} from '../tools/choreIcon';
import axios from 'axios';
import '../global';
import EStyleSheet from 'react-native-extended-stylesheet';

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
              bg={'#e3e1e2'}
          />
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>
            {item.item.name.length > 14
                ? item.item.name.substring(0, 13) + '...'
                : item.item.name}
          </Text>
          <Text style={styles.titleText}>{item.item.fname}</Text>
        </View>

        {this.props.type === 'chore' ? (
          <View style={styles.allowance}>
            <TouchableOpacity
              style={styles.touch}
              onPress={() => {
                this.sendData(item.item.uuid, 'reject');
              }}>
              <Text style={styles.touchText}>Try Again</Text>
            </TouchableOpacity>
            <View style={styles.lineStyle} />
            <TouchableOpacity
                style={styles.touchTwo}
                onPress={() => {
                this.sendData(item.item.uuid, 'approve');
              }}>
              <Text style={styles.touchTextTwo}>Approve</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.allowance}>
            <TouchableOpacity
              style={styles.touch}
              onPress={() => {
                this.sendData(item.item.choreuuid, 'delete');
              }}>
              <Text style={styles.touchText}>Delete</Text>
            </TouchableOpacity>
            <View style={styles.lineStyle} />
            <TouchableOpacity
              style={styles.touchTwo}
              onPress={() => {
                this.sendData(item.item.choreuuid, 'complete');
              }}>
              <Text style={styles.touchTextTwo}>Complete</Text>
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

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    marginVertical: '.2rem',
    marginHorizontal: '.2rem',
    borderWidth: 1,
    borderRadius: 4,
  },
  iconContainer: {
    height: '2.8rem',
    marginHorizontal: '.2rem',
    backgroundColor: '#fffbfb',
  },

  iconTouch: {
    height: '4rem',
  },

  screenTime: {color: '#292050'},
  allowance: {
    flex: 3,
    flexDirection: 'row',
    marginHorizontal: '.28rem',
  },
  titleContainer: {
    backgroundColor: '#fffbfb',
    justifyContent: 'center',
    alignItems: 'center',
    width: '7rem',
    height: '2.8rem',
    borderWidth: 1,
    borderRadius: 4,
  },
  titleText: {color: '#000000', fontSize: '.75rem'},
  childSt: {
    color: '#000000',
    paddingVertical: '.8rem',
    paddingHorizontal: '.8rem',
  },
  touch: {
    flex: 1.25,
    borderWidth: 1,
    borderColor: '#e7001f',
    backgroundColor: '#fff',
    borderRadius: 7,
    height: '2.8rem',
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchText: {
    fontSize: '.7rem',
  },
  touchTwo: {
    flex: 1.75,
    borderWidth: 1,
    borderColor: '#2100ff',
    backgroundColor: '#fff',
    borderRadius: 7,
    height: '2.8rem',
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchTextTwo: {
    fontSize: '.7rem',
  },
  lineStyle: {
    borderWidth: 1,
    borderColor: '#fffbfb',
  },
});
