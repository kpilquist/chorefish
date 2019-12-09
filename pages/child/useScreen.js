import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default class UseView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      screen: 0,
      negative: false,
      hours: 0,
      minutes: 0,
      seconds: 0,
      time: 0,
    };
    //Below is needed because the component wouldn't update properly.
    this.sec2time = this.sec2time.bind(this);
  }

  componentDidMount() {
    this.sec2time(this.state.screen);
  }

  sec2time = time => {
    if (Math.sign(time) === -1) {
      this.setState({negative: true});
    } else {
      this.setState({negative: false});
    }
    let measuredTime = new Date(null);
    let nTime = Math.abs(time);
    measuredTime.setSeconds(nTime); // specify value of SECONDS
    this.setState({
      hours: measuredTime.toISOString().substr(11, 2),
      minutes: measuredTime.toISOString().substr(14, 2),
      seconds: measuredTime.toISOString().substr(17, 2),
      time: measuredTime.toISOString().substr(11, 8),
    });
  };

  render() {
    let time;
    if (this.state.negative) {
      time = <Text style={[styles.negText, styles.negSign]}> - </Text>;
    } else {
      time = <Text> + </Text>;
    }

    return (
      <View style={styles.container}>
        <Text>Screen Time</Text>
        <View style={[styles.time, this.state.negative ? styles.negative : {}]}>
          {time}
          <View>
            <Text
              style={[styles.text, this.state.negative ? styles.negText : {}]}>
              {' '}
              Hours: {this.state.hours}
            </Text>
          </View>
          <View>
            <Text
              style={[styles.text, this.state.negative ? styles.negText : {}]}>
              {' '}
              Minutes: {this.state.minutes}
            </Text>
          </View>
          <View>
            <Text
              style={[styles.text, this.state.negative ? styles.negText : {}]}>
              {' '}
              Seconds: {this.state.seconds}
            </Text>
          </View>
        </View>
        <View>
          <TouchableOpacity style={styles.button}>
            <Text> Button </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    flexDirection: 'column',
    alignItems: 'center',
  },
  time: {
    flexDirection: 'row',
  },
  button: {
    borderWidth: 1,
  },
  negative: {
    backgroundColor: '#000',
  },
  negText: {
    color: '#ff2100',
  },
  text: {
    fontSize: 17,
  },
  negSign: {
    fontSize: 17,
    color: '#ff2100',
  },
});
