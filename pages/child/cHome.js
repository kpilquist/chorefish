import React, {Component} from 'react';
import axios from 'axios';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Icon as ICN} from '../tools/iconGenerator';
import {ChildChoreView} from './cItemView';
import {ChildHeader} from '../tools/header';

export class childHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      fname: '',
      st: 0,
      allowance: '',
      screen: '',
      negative: false,
      chores: {},
    };
    this.getData();
  }

  setTime = seconds => {
    let negative = Math.sign(seconds);
    let time = Math.abs(seconds);

    let date = new Date(null);
    date.setSeconds(time); // specify value for SECONDS here
    let result = date.toISOString().substr(11, 5);

    this.setState({screen: result, negative: negative});

    return result;
  };

  getData = async () => {
    axios
      .get(global.url + '/api/auth/child', {
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          Authorization: 'Bearer ' + global.bearer,
        },
      })
      .then(response => {
        this.setState({
          data: response.data.success[0],
          fname: response.data.success[0].fname,
          st: response.data.success[0].screenTime,
          allowance: response.data.success[0].allowance,
        });

        this.setTime(response.data.success[0].screenTime);
        this.setState({
          fname: response.data.success[0].fname,
          chores: response.data.chores,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    let sign;
    if (this.state.negative) {
      sign = <Text style={[styles.negText, styles.negSign]}>-</Text>;
    }
    return (
      <View style={styles.container}>
          <View style={styles.header1}>
          <ChildHeader text={this.state.fname + "'s Chorefish"} />
          </View>
               <View style={styles.name}>
          <View style={styles.iconContainer}>
            <ICN name={this.state.fname} />
          </View>
          <View style={styles.info}>
            <View style={styles.screen}>
              <Icon name={'tv'} size={50} />
              <View style={{flexDirection: 'column', paddingLeft: 5}}>
                <Text> Screen: </Text>
                <Text>
                  {sign}
                  {this.state.screen}{' '}
                </Text>
              </View>
            </View>
            <View style={styles.bank}>
              <Icon name={'piggy-bank'} size={50} />
              <View style={{flexDirection: 'column', paddingLeft: 5}}>
                <Text> Bank: </Text>
                <Text> ${this.state.allowance} </Text>
              </View>
            </View>
          </View>
        </View>
        <ChildChoreView data={this.state.chores} fname={this.state.fname} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 23,
    paddingHorizontal: 2,
  },
  iconContainer: {
    width: 50,
    height: 50,
    marginVertical: 10,
    paddingLeft: 5,
  },
  bank: {
    marginVertical: 5,
    paddingVertical: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    flexDirection: 'row',
    borderWidth: 2,
    borderRadius: 4,
    marginVertical: 10,
  },
  screen: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    paddingVertical: 2,
    paddingHorizontal: 10,
  },
  stAc: {
    borderWidth: 2,
    borderRadius: 4,
    height: 60,
    marginVertical: 5,
  },
  lineStyle: {},
  info: {
    flexDirection: 'row',
  },
    header1: {
        paddingTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    iconTouch: {
        flex: 1,
    },
    touch: {
        flex: 1.25,
        borderWidth: 1,
        borderColor: '#1600e7',
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
