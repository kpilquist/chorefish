import React, {Component} from 'react';
import {View, StyleSheet, Text, FlatList, TouchableOpacity} from 'react-native';

export class DemeritPenalties extends Component {
  renderItem = item => (
    <View>
      <TouchableOpacity>
        <Text>
          Who: {item.item.fname} By: {item.item.name} What: {item.item.amount}
        </Text>
      </TouchableOpacity>
    </View>
  );

  render() {
    return (
      <FlatList
        data={this.props.data}
        renderItem={item => this.renderItem(item)}
        keyExtractor={item => item.id}
        extraData={this.state}
      />
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#292050',
    width: 50,
    borderWidth: 2,
    borderColor: '#ffcbf7',
    borderRadius: 5,
  },
  top: {
    flexDirection: 'row',
  },
  text: {
    alignSelf: 'center',
    color: '#ff6900',
    fontSize: 15,
  },
  mText: {
    alignSelf: 'center',
    color: '#ff6900',
    fontSize: 15,
  },
  pText: {
    paddingRight: 3,
    alignSelf: 'center',
    color: '#ff6900',
    fontSize: 15,
  },
  lineStyle: {
    borderWidth: 1,
    borderColor: '#fff',
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 0,
    borderRightWidth: 50,
    borderBottomWidth: 90,
    borderLeftWidth: 50,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'red',
    borderLeftColor: 'transparent',
  },
});
