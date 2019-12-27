import React, {Component} from 'react';
import {Text, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export class ChoreIcon extends Component {
  render() {
    let Reward;
    if (parseFloat(this.props.allowance) > 0) {
        Reward = <Text style={styles.aText}>{'$' + this.props.allowance}</Text>;
    } else {
      Reward = <Text style={styles.mText}>{this.props.screenTime}</Text>;
    }

      let type;
      if (this.props.act === 2) {
          type = <Text style={styles.pText}>Ac</Text>;
      } else {
          type = <Text style={styles.pText}>Ch</Text>;
      }

    return (
      <View style={styles.container}>
        <View style={styles.top}>
            {type}
          <View style={styles.lineStyle} />
          <Text style={styles.text}>{this.props.fname.substring(0, 2)}</Text>
        </View>
        <View style={styles.lineStyle} />
        {Reward}
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: '2.9rem',
    borderWidth: 2,
    borderColor: '#736e76',
    borderRadius: 4,
    backgroundColor: '#292050',
  },
  top: {
    flexDirection: 'row',
  },
  text: {
    alignSelf: 'center',
    color: '#ff6900',
    fontSize: '.9rem',
    paddingHorizontal: '.1rem',
  },
  mText: {
    alignSelf: 'center',
    color: '#ff6900',
    fontSize: '.9rem',
  },
    aText: {
        alignSelf: 'center',
        color: '#ff6900',
        fontSize: '.7rem',
    },
  pText: {
    paddingHorizontal: '.1rem',
    color: '#ff6900',
    fontSize: '.9rem',
  },
  lineStyle: {
    borderWidth: 1,
    borderColor: '#6d6d6d',
  },
});
