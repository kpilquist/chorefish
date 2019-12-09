import React, {Component} from 'react';
import axios from 'axios';
import '../global';
import {ItemView} from './itemView';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {ChildButton} from './childButton';
import AsyncStorage from '@react-native-community/async-storage';
import Collapsible from 'react-native-collapsible';
import {DemeritPenalties} from '../tools/demerits';
export class parentHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      titleText: '-=-=-=-=-:',
      familyJson: [],
      approvalCollapsed: true,
      choresCollapsed: true,
      demeritCollapsed: true,
      activeSections: [],
      collapsed: true,
      multipleSelect: true,
      childs: {},
      completed: {},
      approval: {},
      demerit: {},
    };
  }

  componentDidMount() {
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      // The screen is focused
      this.getData().then();
    });
  }

  saveChildren = async data => {
    try {
      await AsyncStorage.setItem('@children', data);
    } catch (e) {
      console.log(e);
    }
  };

  tableHandler = data => {
    this.setState({childs: data});
  };

  choreTableHandler = data => {
    this.setState({completed: data});
  };

  demeritTableHandler = data => {
    console.log(data);
    this.setState({demerit: data});
  };

  approvalTableHandler = data => {
    this.setState({approval: data});
  };

  toggleChore = () => {
    this.setState({approvalCollapsed: !this.state.approvalCollapsed});
  };
  toggleAssigned = () => {
    this.setState({choresCollapsed: !this.state.choresCollapsed});
  };
  toggleDemerits = () => {
    this.setState({demeritCollapsed: !this.state.demeritCollapsed});
  };

  getData = async () => {
    axios
      .get(global.url + '/api/auth/family', {
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          Authorization: 'Bearer ' + global.bearer,
        },
      })
      .then(response => {
        console.log(response.data.approval);
        this.tableHandler(response.data.users);
        this.approvalTableHandler(response.data.approval);
        this.choreTableHandler(response.data.chores);
        this.demeritTableHandler(response.data.infractions);
        this.saveChildren(JSON.stringify(response.data.children));
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>Status:</Text>
        <ChildButton children={this.state.childs} />
        <View style={styles.lineStyle} />
        <View>
          <TouchableOpacity onPress={this.toggleChore}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Completed Chores</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.lineStyle} />
          <Collapsible collapsed={this.state.approvalCollapsed} align="center">
            <ItemView data={this.state.approval} type={'chore'} />
          </Collapsible>
        </View>
        <View style={styles.lineStyle} />
        <View>
          <TouchableOpacity onPress={this.toggleAssigned}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Assigned Chores</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.lineStyle} />
          <Collapsible collapsed={this.state.choresCollapsed} align="center">
            <ItemView data={this.state.completed} />
          </Collapsible>
        </View>
        <View style={styles.lineStyle} />
        <View>
          <TouchableOpacity onPress={this.toggleDemerits}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Penalties</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.lineStyle} />
          <Collapsible collapsed={this.state.demeritCollapsed} align="center">
            <Text> put stuff here </Text>
            <DemeritPenalties data={this.state.demerit} />
          </Collapsible>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 23,
  },
  view: {
    alignItems: 'center',
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: '#000000',
    borderWidth: 1,
  },
  submitButton: {
    backgroundColor: '#000000',

    padding: 10,
    margin: 15,
    height: 40,
  },
  submitButtonText: {
    color: 'white',
  },
  touchableButton: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000000',
    alignItems: 'center',
    backgroundColor: '#000000',
    paddingTop: 10,
    paddingBottom: 10,
    width: '75%',
  },

  touchableText: {
    fontSize: 20,
    color: '#fff',
  },
  tableContainer: {
    flex: 1,
    padding: 10,
    paddingTop: 5,
    backgroundColor: '#fffbfb',
  },
  head: {height: 40, backgroundColor: '#e0e7ee'},
  text: {margin: 5},
  tableBorder: {borderWidth: 2, borderColor: '#000000'},
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 20,
  },
  header: {
    borderWidth: 4,
    borderRadius: 10,
    borderColor: '#000000',
    padding: 10,
    backgroundColor: '#000000',
  },
  headerText: {
    color: '#fffbfb',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    backgroundColor: 'rgb(255,251,251)',
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selector: {
    backgroundColor: '#fffbfb',
    padding: 10,
  },
  activeSelector: {
    fontWeight: 'bold',
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10,
  },
  multipleToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 30,
    alignItems: 'center',
  },
  multipleToggle__title: {
    fontSize: 16,
    marginRight: 8,
  },
  lineStyle: {
    borderWidth: 1,
    borderColor: '#fff',
  },
});
