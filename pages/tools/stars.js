import React, {Component} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import MaskedView from '@react-native-community/masked-view';

export class Star extends Component {
  render() {
    return (
      <View style={{flex: 1,}}>
        <MaskedView
          style={{
            flex: 1,
            flexDirection: 'row',
            height: 100,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'fff',
          }}
          maskElement={
            <View
              style={{
                // Transparent background because mask is based off alpha channel.
                backgroundColor: 'transparent',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                borderColor: 'fff'
              }}>
              <Image
                style={{width: 50, height: 50}}
                source={require('./../image/star.png')}
              />
              <Image
                style={{width: 50, height: 50}}
                source={require('./../image/star.png')}
              />
              <Image
                style={{width: 50, height: 50}}
                source={require('./../image/star.png')}
              />
              <Image
                style={{width: 50, height: 50}}
                source={require('./../image/star.png')}
              />
              <Image
                style={{width: 50, height: 50}}
                source={require('./../image/star.png')}
              />
            </View>
          }>
          {/* Shows behind the mask, you can put anything here, such as an image */}
          <View style={{flex: 1}}>
            <View
              style={{
                flex: 1,
                width:
                  (((this.props.percentage + 15) * 84) / 108).toString() + '%',
                height: '100%',
                backgroundColor: '#0f1aff',
              }}
            />
          </View>
        </MaskedView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#292050',
    width: 50,
  },

  text: {
    alignSelf: 'center',
    color: '#ff6900',
    fontSize: 30,
  },

  progressBar: {
    flexDirection: 'row',
    height: 20,
    width: '100%',
    backgroundColor: 'white',
  },

  pBarContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});
