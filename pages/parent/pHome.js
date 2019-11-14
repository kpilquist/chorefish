import React, {Component} from 'react';
import axios from 'axios';
import '../global';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {Table, Row, Rows} from 'react-native-table-component';
import AsyncStorage from '@react-native-community/async-storage';
import Collapsible from 'react-native-collapsible';

export class parentHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      titleText: '-=-=-=-=-:',
      familyJson: [],
      tableHead: ['Name', 'Screen Time', 'Allowance'],
      tableData: [],
      approvalTableHead: ['Name', 'Type', 'Reward', 'Child'],
      approvalTableData: [],
      approvalCollapsed: true,
      choresHead: ['Name', 'Child', 'Reward'],
      choresData: [],
      choresCollapsed: true,
      demeritHead: ['Child', 'Guardian', 'Amount'],
      demeritData: [],
      demeritCollapsed: true,
      activeSections: [],
      collapsed: true,
      multipleSelect: true,
    };
  }

  componentDidMount() {
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      // The screen is focused
      this.getData().then();
    });
  }

  tableHandler = data => {
    var result = [];

    for (let i in data) {
      let st = data[i].screentime;
      if (st.includes('-')) {
        st = st.replace(/-/g, '');
        st = '-' + st;
      }

      result.push([data[i].fname, st, data[i].allowance]);
    }
    this.setState({tableData: result});
  };

  saveChildren = async data => {
    try {
      await AsyncStorage.setItem('@children', data);
    } catch (e) {
      console.log(e);
    }
  };

  choreTableHandler = data => {
    let result = [];
    for (let i in data) {
      let reward = '';
      //If fails look at approvalTableHandler
      if (data[i].screentime === '00:00') {
        reward = '$' + data[i].moneyValue;
      } else {
        reward = data[i].screentime;
      }

      result.push([data[i].name, data[i].fname, reward]);
    }
    this.setState({choresData: result});
  };

  demeritTableHandler = data => {
    var result = [];

    for (let i in data) {
      result.push([data[i].fname, data[i].name, data[i].ammount]);
    }

    this.setState({demeritData: result});
  };

  approvalTableHandler = data => {
    var res = [];

    for (let i in data) {
      let type = '';

      switch (data[i].choAct) {
        case '2':
          type = 'Activity';
          break;
        case 2:
          type = 'Activity';
          break;
        default:
          type = 'Chore';
          break;
      }

      let reward = '';
      let money = data[i].moneyValue;
      //If fails look at choreTableHandler
      money === undefined || money == null || money >= 0.25
        ? (reward = '$' + money)
        : (reward = data[i].screentime);

      res.push([type, reward, data[i].fname]);
    }

    this.setState({approvalTableData: res});
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
        <View style={styles.tableContainer}>
          <Table borderStyle={styles.tableBorder}>
            <Row
              data={this.state.tableHead}
              style={styles.head}
              textStyle={styles.text}
            />
            <Rows data={this.state.tableData} textStyle={styles.text} />
          </Table>
        </View>

        <View>
          <TouchableOpacity onPress={this.toggleChore}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Completed Chores</Text>
            </View>
          </TouchableOpacity>

          <Collapsible collapsed={this.state.approvalCollapsed} align="center">
            <View style={styles.content}>
              <View style={styles.tableContainer}>
                <Table borderStyle={styles.tableBorder}>
                  <Row
                    data={this.state.approvalTableHead}
                    style={styles.head}
                    textStyle={styles.text}
                  />
                  <Rows
                    data={this.state.approvalTableData}
                    textStyle={styles.text}
                  />
                </Table>
              </View>
            </View>
          </Collapsible>
        </View>

        <View>
          <TouchableOpacity onPress={this.toggleAssigned}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Assigned Chores</Text>
            </View>
          </TouchableOpacity>

          <Collapsible collapsed={this.state.choresCollapsed} align="center">
            <View style={styles.content}>
              <View style={styles.tableContainer}>
                <Table borderStyle={styles.tableBorder}>
                  <Row
                    data={this.state.choresHead}
                    style={styles.head}
                    textStyle={styles.text}
                  />
                  <Rows data={this.state.choresData} textStyle={styles.text} />
                </Table>
              </View>
            </View>
          </Collapsible>
        </View>

        <View>
          <TouchableOpacity onPress={this.toggleDemerits}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Demerits</Text>
            </View>
          </TouchableOpacity>

          <Collapsible collapsed={this.state.demeritCollapsed} align="center">
            <View style={styles.content}>
              <View style={styles.tableContainer}>
                <Table borderStyle={styles.tableBorder}>
                  <Row
                    data={this.state.demeritHead}
                    style={styles.head}
                    textStyle={styles.text}
                  />
                  <Rows data={this.state.demeritData} textStyle={styles.text} />
                </Table>
              </View>
            </View>
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
    borderColor: '#292050',
    borderWidth: 1,
  },
  submitButton: {
    backgroundColor: '#292050',

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
    borderColor: '#292050',
    alignItems: 'center',
    backgroundColor: '#8B82FE',
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
    backgroundColor: '#ebebeb',
  },
  head: {height: 40, backgroundColor: '#e0e7ee'},
  text: {margin: 5},
  tableBorder: {borderWidth: 2, borderColor: '#00bdff'},
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 20,
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  headerText: {
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
    backgroundColor: 'rgba(245,252,255,1)',
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selector: {
    backgroundColor: '#F5FCFF',
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
});
