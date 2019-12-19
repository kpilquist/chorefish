import React from 'react';
import {FlatList, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import EStyleSheet from 'react-native-extended-stylesheet';

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

const styles = EStyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: '.2rem',
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9c2ff',
    marginVertical: '.5rem',
    height: '3rem',
    borderRadius: 10,
    borderWidth: 1,
    color: '#fff',
    width: '16rem',
  },
  title: {
    fontSize: '1.5rem',
    color: '#fff',
  },
});
