import React from 'react';
import {View, FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export class ChildrenList extends React.Component {
  constructor(props) {
    super(props);
    this.dataHandler();
    this.state = {
      children: [],
      selected: [],
    };
  }

  componentDidMount() {
    this.dataHandler();
  }

  async dataHandler() {
    let value = await AsyncStorage.getItem('@children');
    this.setState({children: JSON.parse(value)});
  }

  onSelect = id => {
    console.log('ID: ' + id);
    const newSelected = new Map(this.state.selected);
    console.log(this.state);
    newSelected.set(id, !this.state.selected.get(id));

    this.setState({selected: newSelected});
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.children}
          renderItem={({item}) => (
            <Item
              id={item.id}
              title={item.title}
              onSelect={() => {
                this.onSelect();
              }}
            />
          )}
          keyExtractor={item => item.id}
          extraData={this.state.selected}
        />
      </View>
    );
  }
}

function Item({id, title, selected, onSelect}) {
  return (
    <TouchableOpacity
      onPress={() => onSelect(id)}
      style={[
        styles.item,
        {backgroundColor: selected ? '#292050' : '#7a42f4'},
      ]}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
  },
  item: {
      alignItems:'center',
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    width: 275,
      height:60,
      borderRadius: 30,
      borderWidth: 1,
      color: '#fff',
  },
  title: {
    fontSize: 15,
      color: '#fff',
  },
});
