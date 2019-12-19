import React from 'react';
import {ScrollView, Text, TextInput, TouchableOpacity, View,} from 'react-native';
import axios from 'axios';
import '../global';
import SwitchSelector from 'react-native-switch-selector';
import {ChildrenList} from '../children';
import {ChildHeader} from '../tools/header';
import EStyleSheet from 'react-native-extended-stylesheet';

export class demeritScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reward: true,
      disabled: true,
      hours: 0,
      min: 0,
      desc: '',
      allowance: 0,
      children: [],
      selectedChildren: {},
      childrenString: '',
      dataSource: [],
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
      this.getData().then(console.log());
    }
  }
  updateState(data) {
    this.setState({childrenString: data});
  }

  handelSubmit = () => {
    this.setState({disabled: false});

    const {reward, hours, min, allowance, childrenString, desc} = this.state;

    axios
      .post(
        global.url + '/api/auth/demerit',
        {
          reward: reward,
          hr: hours,
          min: min,
          moneyValue: allowance,
          description: desc,
          childUUID: childrenString,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            Authorization: 'Bearer ' + global.bearer,
          },
        },
      )
      .then(response => {
        console.log(JSON.stringify(response.data.success));

        this.setState({
          disabled: true,
        });
        this.props.navigation.navigate('ParentHome');
      })
      .catch(error => {
        console.log(error.data);
      });
  };

  render() {
    return (
        <View style={styles.outer}>
          <View style={styles.header1}>
            <ChildHeader text={'Penalty'}/>
          </View>
          <View style={styles.lineStyle}/>
        <ScrollView showsVerticalScrollIndicator={true}>
          <View style={styles.container}>
            <ChildrenList updateParentState={this.updateState.bind(this)} />
            <Text style={styles.labelText}>Type:</Text>
            <SwitchSelector
              options={Options}
              initial={0}
              onPress={value => this.setState({reward: value})}
              borderColor={'#292050'}
              buttonColor={'#7a42f4'}
              textColor={'#ff8151'}
              selectedColor={'#fff'}
              backgroundColor={'#584c87'}
              style={styles.sw1}
            />

            <View style={styles.labelContainer}>
              {!this.state.reward && (
                <Text style={styles.labelText}>Allowance: </Text>
              )}

              {!this.state.reward && (
                <TextInput
                  style={[
                    styles.moneyInput,
                    {backgroundColor: this.state.disabled ? '#FFF' : '#C0C0C0'},
                  ]}
                  underlineColorAndroid="transparent"
                  placeholder="Amount"
                  placeholderTextColor="#C0C0C0"
                  autoCapitalize="none"
                  onChangeText={value => this.setState({allowance: value})}
                  editable={this.state.disabled}
                />
              )}
            </View>

            <View style={styles.timeContainer}>
              <View style={styles.labelContainer}>
                {this.state.reward && (
                  <Text style={styles.labelText}>Hours</Text>
                )}

                {this.state.reward && (
                  <TextInput
                    style={[
                      styles.timeInput,
                      {
                        backgroundColor: this.state.disabled
                          ? '#FFF'
                          : '#C0C0C0',
                      },
                    ]}
                    underlineColorAndroid="transparent"
                    placeholder="Hours"
                    placeholderTextColor="#C0C0C0"
                    autoCapitalize="none"
                    onChangeText={value => this.setState({hour: value})}
                    editable={this.state.disabled}
                  />
                )}
              </View>

              <View style={styles.labelContainer}>
                {this.state.reward && (
                  <Text style={styles.labelText}>Minutes</Text>
                )}
                {this.state.reward && (
                  <TextInput
                    style={[
                      styles.timeInput,
                      {
                        backgroundColor: this.state.disabled
                          ? '#FFF'
                          : '#C0C0C0',
                      },
                    ]}
                    underlineColorAndroid="transparent"
                    placeholder="Minutes"
                    placeholderTextColor="#C0C0C0"
                    autoCapitalize="none"
                    onChangeText={value => this.setState({min: value})}
                    editable={this.state.disabled}
                  />
                )}
              </View>
            </View>
            <View>
              <TextInput
                style={[
                  styles.inputBox,
                  {backgroundColor: this.state.disabled ? '#FFF' : '#C0C0C0'},
                ]}
                underlineColorAndroid="transparent"
                placeholder="Description"
                multiline
                numberOfLines={4}
                placeholderTextColor="#C0C0C0"
                autoCapitalize="none"
                onChangeText={val => this.setState({desc: val})}
                editable={this.state.disabled}
              />
            </View>
            <TouchableOpacity
              style={[
                styles.submitButton,
                {backgroundColor: this.state.disabled ? '#7a42f4' : '#C0C0C0'},
              ]}
              onPress={() => this.handelSubmit()}>
              <Text style={styles.submitButtonText}> Submit </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const Options = [
  {label: 'Screen Time', value: true},
  {label: 'Allowance', value: false},
];

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#e3e1e2',
  },
  lineStyle: {
    borderWidth: 1,
    borderColor: '#000285',
  },
  submitButton: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#292050',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '1.4rem',
    height: '2.5rem',
    width: '16rem',
  },
  submitButtonText: {
    color: '#fff',
  },
  labelText: {
    paddingTop: '.5rem',
  },

  timeContainer: {
    flexDirection: 'row',
  },
  labelContainer: {
    alignItems: 'center',
  },
  timeInput: {
    borderRadius: 5,
    margin: '1.75rem',
    marginTop: '.1rem',
    height: '2rem',
    borderColor: '#7a42f4',
    borderWidth: 1,
    width: '4.7rem',
  },
  moneyInput: {
    borderRadius: 5,
    marginHorizontal: '1.4rem',
    marginBottom: '1.4rem',
    height: '2rem',
    borderColor: '#7a42f4',
    borderWidth: 1,
    width: '14rem',
  },
  sw1: {
    margin: '1.4rem',
    marginTop: '.14rem',
    width: '16rem',
  },
  inputBox: {
    borderRadius: 5,
    marginHorizontal: '1.4rem',
    height: '4rem',
    borderColor: '#7a42f4',
    borderWidth: 1,
    width: '16rem',
  },
  outer: {
    flex: 1,
    backgroundColor: '#e3e1e2',
  },
  header1: {
    paddingTop: '1.4rem',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
