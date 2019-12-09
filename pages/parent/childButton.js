import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, View, Text, FlatList} from 'react-native';
import {Icon as Icn} from '../tools/iconGenerator';
export class ChildButton extends Component {
  onSelect = id => {
    console.log('Press: ' + id);
  };

  childItem = item => (
    <View styles={styles.container}>
      <TouchableOpacity
        style={styles.iconTouch}
        onPress={() => {
          this.onSelect(item.item.fname);
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
            <Text style={styles.childSt}>Screen: {item.item.screentime}</Text>
            <View style={styles.lineStyle} />
            <Text style={styles.childSt}>Bank: ${item.item.allowance}</Text>
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
        keyExtractor={item => item.fname}
        extraData={this.props}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 50,
    marginVertical: 3,
    flexDirection: 'row',
  },

  component: {
    flex: 1,
    width: 100,
    height: 100,
  },

  iconContainer: {
    width: 50,
    height: 50,
    paddingLeft: 2,
  },
  iconTouch: {
    borderWidth: 1,
    borderColor: '#000000',
  },
  screenTime: {color: '#000000'},
  allowance: {
    color: '#000000',
    backgroundColor: '#fffbfb',
    width: '38%',
  },
  childName: {color: '#000000', fontSize: 20},
  childSt: {color: '#000000', fontSize: 15, paddingVertical: 3},
  childNameContainer: {
    borderRadius: 10,
    width: '49%',
    alignItems: 'center',
  },

  lineStyle: {
    borderWidth: 1,
    borderColor: '#000000',
  },
});
