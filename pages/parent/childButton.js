import React, {Component} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {Icon as Icn} from '../tools/iconGenerator';
import Icon from 'react-native-vector-icons/FontAwesome5';
import EStyleSheet from 'react-native-extended-stylesheet';

export class ChildButton extends Component {
  onSelect = id => {
    this.props.func(id);
  };

  childItem = item => (
    <View styles={styles.container}>
      <TouchableOpacity
        style={styles.iconTouch}
        onPress={() => {
          this.onSelect(item.item.uuid);
        }}>
        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <Icn name={item.item.fname} />
          </View>

          <View style={styles.childNameContainer}>
            <Text style={styles.childName}>{item.item.fname}</Text>
            <Text style={styles.childName}>{item.item.status}</Text>
          </View>

          <View style={styles.allowance}>
            <View style={styles.reward}>
              <Icon name={'tv'} size={15} />
              <Text style={styles.childSt}>Screen: {item.item.screentime}</Text>
            </View>
            <View style={styles.lineStyle} />
            <View style={styles.reward}>
              <Icon name={'piggy-bank'} size={15} />
              <Text style={styles.childSt}>Bank: ${item.item.allowance}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  render() {
    return (
      <FlatList
        data={this.props.children}
        renderItem={item => this.childItem(item)}
        keyExtractor={item => item.uuid}
        extraData={this.props}
      />
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    height: '2.8rem',
    marginVertical: '.15rem',
    flexDirection: 'row',
    backgroundColor: '#e3e1e2',
  },
  iconContainer: {
    width: '2.8rem',
    height: '2.8rem',
    paddingLeft: '.1rem',
  },
  iconTouch: {
    borderWidth: 1,
    borderColor: '#9c9c9c',
  },
  screenTime: {color: '#07e700'},
  allowance: {
    color: '#000000',
    backgroundColor: '#e3e1e2',
    width: '10rem',
  },
  childName: {color: '#000000', fontSize: '1rem'},
  childSt: {
    color: '#000000',
    fontSize: '.8rem',
    paddingVertical: '.2rem',
    paddingHorizontal: '.3rem',
  },
  childNameContainer: {
    borderRadius: 10,
    width: '10rem',
    alignItems: 'center',
  },
  reward: {flexDirection: 'row'},
  lineStyle: {
    borderWidth: 1,
    borderColor: '#000000',
  },
});
