import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';

export class ChoreIcon extends Component {
  render() {
    let Reward;
    if (parseFloat(this.props.allowance) > 0) {
      Reward = (
        <Text style={styles.mText}>
          {this.props.allowance === null ? 'ER' : this.props.allowance}
        </Text>
      );
    } else {
      Reward = (
        <Text style={styles.mText}>
          {this.props.screenTime === null ? 'ER' : this.props.screenTime}
        </Text>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.pText}>
            ER
          </Text>
          <View style={styles.lineStyle} />
          <Text style={styles.text}>
            {this.props.fname === null
              ? 'ER'
              : this.props.fname.substring(0, 2)}
          </Text>
        </View>
        <View style={styles.lineStyle} />
        {Reward}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fffbfb',
    width: 50,
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 5,
  },
  top: {
    flexDirection: 'row',
  },
  text: {
    alignSelf: 'center',
    color: '#000000',
    fontSize: 15,
    paddingHorizontal: 2,
  },
  mText: {
    alignSelf: 'center',
    color: '#000000',
    fontSize: 15,
  },
  pText: {
    paddingHorizontal: 2.5,
    alignSelf: 'center',
    color: '#000000',
    fontSize: 15,
  },
  lineStyle: {
    borderWidth: 1,
    borderColor: '#000000',
  },
});
