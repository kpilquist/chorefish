import React, {Component} from 'react';
import axios from 'axios';
import '../global';
import {ItemView} from './itemView';
import {ScrollView, Text, View} from 'react-native';
import {ChildButton} from './childButton';
import AsyncStorage from '@react-native-community/async-storage';
import {ChildHeader} from '../tools/header';
import EStyleSheet from 'react-native-extended-stylesheet';

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
      timer: false,
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
      console.log('pHome saveChildren' + e);
    }
  };

  tableHandler = data => {
    this.setState({childs: data});
  };

  choreTableHandler = data => {
    this.setState({completed: data});
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
  updateGroup = () => {
    this.getData().then();
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
        this.tableHandler(response.data.users);
        this.approvalTableHandler(response.data.approval);
        this.choreTableHandler(response.data.chores);
        this.saveChildren(JSON.stringify(response.data.children));
        console.log('pHome 85: ' + JSON.stringify(response.data.chores));
      })
      .catch(error => {
        console.log(error);
      });
  };

    render() {
    return (
        <View style={styles.outer}>
            <View style={styles.header1}>
                <ChildHeader text={'Chore Fish'}/>
            </View>
            <View style={styles.lineStyle}/>
            <ScrollView persistentScrollbar={true}>
                <View style={styles.lineStyle}/>
                <ChildButton children={this.state.childs}/>
                <View style={styles.lineStyle}/>
                <View>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Completed Chores</Text>
                    </View>
                    <View style={styles.lineStyle}/>
                    <ItemView
                        update={this.updateGroup}
                        data={this.state.approval}
                        type={'chore'}
                    />
                </View>
                <View style={styles.lineStyle}/>
                <View>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Assigned Chores</Text>
                    </View>
                    <View style={styles.lineStyle}/>
                    <ItemView update={this.updateGroup} data={this.state.completed}/>
                </View>
                <View style={styles.footer}/>
            </ScrollView>
        </View>
    );
  }
}

const styles = EStyleSheet.create({
  outer: {
    flexDirection: 'column',
    backgroundColor: '#e3e1e2',
  },
  header1: {
    paddingTop: '1rem',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  container: {
    backgroundColor: '#e3e1e2',
  },
  lineStyle: {
    borderWidth: 1,
    borderColor: '#000285',
  },
  header: {
    borderWidth: 4,
    borderRadius: 10,
    borderColor: '#000000',
    marginVertical: '.25rem',
    marginHorizontal: '.065rem',
    backgroundColor: '#292050',
  },
  headerText: {
    color: '#fffbfb',
    textAlign: 'center',
    fontSize: '.9rem',
    fontWeight: '500',
  },
  footer: {
    marginVertical: '2.5rem',
  },
});
