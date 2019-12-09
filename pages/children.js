import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export class ChildrenList extends React.Component {
  constructor(props) {
    super(props);
    this.dataHandler().then();
    this.state = {
      children: [],
      selected: '',
    };
  }

  updateParentState(data) {
    this.props.updateParentState(data);
  }

  async dataHandler() {
    let value = await AsyncStorage.getItem('@children');
    let obj = JSON.parse(value);
    obj.map(item => {
      item.isSelect = false;
    });
    this.setState({children: obj});
  }

  onSelect = id => {
    let arr = this.state.children;
    let index = arr.filter(function(item) {
      if (item.id === id) {
        item.isSelect = !item.isSelect;
      }
    });
    this.setState({children: arr});
    let ids = [];
    let ind = arr.filter(function(item) {
      if (item.isSelect) {
        ids.push(item.id);
      }
    });
    this.setState({selected: ids.toString()});
    this.updateParentState(ids.toString());
  };

  renderItem = item => (
    <TouchableOpacity
      onPress={() => {
        this.onSelect(item.item.id);
      }}
      style={[
        styles.item,
        {backgroundColor: !item.item.isSelect ? '#292050' : '#7a42f4'},
      ]}>
      <Text
        style={[
          styles.title,
          {color: !item.item.isSelect ? '#ff8151' : '#fff'},
        ]}>
        {item.item.title}
      </Text>
    </TouchableOpacity>
  );

  render() {
    return (
      <FlatList
        data={this.state.children}
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
    alignItems: 'center',
    paddingTop: 10,
  },
  item: {
    alignItems: 'center',
    backgroundColor: '#f9c2ff',
    padding: 5,
    marginVertical: 4,
    width: 200,
    height: 30,
    borderRadius: 30,
    borderWidth: 1,
    color: '#fff',
  },
  title: {
    fontSize: 15,
    color: '#fff',
  },
});
