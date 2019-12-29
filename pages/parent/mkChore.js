import React from 'react';
import {ScrollView, Text, TextInput, TouchableOpacity, View,} from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import axios from 'axios';
import '../global';
import {ChildrenList} from '../children';
import AsyncStorage from '@react-native-community/async-storage';
import {ChildHeader} from '../tools/header';
import EStyleSheet from 'react-native-extended-stylesheet';

export class mkChoreScreen extends React.Component {
  constructor(props) {
    super(props);
    this.getData();
    this.state = {
      name: '',
      description: '',
      type: '',
      hr: '0',
      min: '0',
      allowance: '0',
      titleText: '',
      disabled: true,
      pwordError: true,
      emailError: true,
      showHr: true,
      complete: true,
      chore: true,
      childrenString: '',
      children: [],
      buttons: [],
      nameErr: false,
      hrErr: false,
      minErr: false,
      allErr: false,
      csErr: false,
      csErrTxt: '',
      nameErrTxt: '',
      hrErrTxt: '',
      minErrTxt: '',
      allErrTxt: '',
    };
  }

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@children');
      this.setState({children: JSON.parse(value)});
    } catch (e) {
      // error reading value
    }
  };

  handleName = text => {
    this.setState({name: text});
  };

  handleDescription = text => {
    this.setState({description: text});
  };
  handelType = data => {
    this.setState({showHr: data});
    this.setState({hr: 0, min: 0, allowance: 0});
  };

  handelHr = text => {
    this.setState({hr: text});
  };

  handleMin = text => {
    this.setState({min: text});
  };
  handleAllowance = text => {
    this.setState({allowance: text});
  };
  updateState(data) {
    this.setState({childrenString: data});
  }

  enable = () => {
    this.setState({disabled: true});
  };

  handelError = data => {
    if (data.hasOwnProperty('childrenString')) {
      this.setState({csErr: true, csErrTxt: data.name});
    } else {
      this.setState({csErr: false, csErrTxt: ''});
    }
    if (data.hasOwnProperty('name')) {
      this.setState({nameErr: true, nameErrTxt: data.name});
    } else {
      this.setState({nameErr: false, nameErrTxt: ''});
    }
    if (data.hasOwnProperty('hr')) {
      this.setState({hrErr: true, hrErrTxt: data.hr});
    } else {
      this.setState({hrErr: false, hrErrTxt: ''});
    }
    if (data.hasOwnProperty('min')) {
      this.setState({minErr: true, minErrTxt: data.min});
    } else {
      this.setState({minErr: false, minErrTxt: ''});
    }
    if (data.hasOwnProperty('allowance')) {
      console.log(data.username);
      this.setState({allErr: true, allErrTxt: data.allowance});
    } else {
      this.setState({allErr: false, allErrTxt: ''});
    }
  };
  goToTop = () => {
    this.scroll.scrollTo({x: 0, y: 0, animated: true});
  };

  handelSubmit = () => {
    this.setState({disabled: false});

    const {
      name,
      description,
      hr,
      min,
      allowance,
      chore,
      complete,
      childrenString,
    } = this.state;

    axios
      .post(
        global.url + '/api/auth/mkchore',
        {
          name: name,
          description: description,
          type: chore ? 1 : 2,
          hr: hr,
          min: min,
          allowance: allowance,
          complete: !complete,
          childrenString: childrenString,
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
        this.enable();
        this.props.navigation.navigate('ParentHome');
      })
      .catch(error => {
        console.log(error.response.data);
        this.handelError(error.response.data);
        this.setState({titleText: JSON.stringify(error)});
        this.goToTop();
        this.enable();
      });
  };

  render() {
    return (
        <View sytle={styles.outer}>
          <View style={styles.header1}>
            <ChildHeader text={'New Chore'}/>
          </View>
          <View style={styles.lineStyle}/>
          <ScrollView
              persistentScrollbar={true}
              ref={c => {
                this.scroll = c;
              }}>
            <View style={styles.container}>
              <ChildrenList updateParentState={this.updateState.bind(this)}/>
              {this.state.csErr && (
                  <Text style={styles.error}>
                    At least one child must be selected.
                  </Text>
              )}
              <Text style={styles.topLabelText}>Type:</Text>
              <SwitchSelector
                  options={typeOptions}
                  initial={0}
                  onPress={value => this.setState({chore: value})}
                  borderColor={'#7a42f4'}
                  buttonColor={'#7a42f4'}
                  textColor={'#ff8151'}
                  selectedColor={'#fff'}
                  backgroundColor={'#584c87'}
                  style={styles.sw1}
              />

              <Text style={styles.labelText}>Name</Text>
              <Text style={styles.error}>{this.state.nameErrTxt}</Text>
              <TextInput
                  style={[
                    styles.input,
                    {backgroundColor: this.state.disabled ? '#FFF' : '#C0C0C0'},
                  ]}
                  underlineColorAndroid="transparent"
                  placeholder="Name"
                  placeholderTextColor="#C0C0C0"
                  autoCapitalize="none"
                  onChangeText={this.handleName}
                  ref={input => {
                    this.state.name;
                  }}
                  editable={this.state.disabled}
              />
              <Text style={styles.labelText}>Reward:</Text>
              <SwitchSelector
                  options={allowanceOptions}
                  initial={0}
                  onPress={value => {
                    this.handelType(value);
                  }}
                  borderColor={'#7a42f4'}
                  buttonColor={'#7a42f4'}
                  textColor={'#ff8151'}
                  selectedColor={'#fff'}
                  backgroundColor={'#584c87'}
                  style={styles.sw1}
              />

              <View style={styles.labelContainer}>
                {!this.state.showHr && (
                    <Text style={styles.labelText}>Allowance:</Text>
                )}
                <Text style={styles.error}>{this.state.allErrTxt}</Text>

                {!this.state.showHr && (
                    <TextInput
                        style={[
                          styles.moneyInput,
                          {backgroundColor: this.state.disabled ? '#FFF' : '#C0C0C0'},
                        ]}
                        underlineColorAndroid="transparent"
                        placeholder="Amount"
                        keyboardType="numeric"
                        placeholderTextColor="#C0C0C0"
                        autoCapitalize="none"
                        onChangeText={this.handleAllowance}
                        editable={this.state.disabled}
                        ref={input => {
                          this.state.allowance;
                        }}
                    />
                )}
              </View>

              <View style={styles.timeContainer}>
                {this.state.showHr && (
                    <Text style={styles.error}>
                      {this.state.hrErrTxt + ' ' + this.state.minErrTxt}
                    </Text>
                )}
                <View style={styles.labelContainer}>
                  {this.state.showHr && (
                      <Text style={styles.labelText}>Hours</Text>
                  )}

                  {this.state.showHr && (
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
                          keyboardType="numeric"
                          placeholderTextColor="#C0C0C0"
                          autoCapitalize="none"
                          onChangeText={this.handelHr}
                          editable={this.state.disabled}
                          ref={input => {
                            this.state.hours;
                          }}
                      />
                  )}
                </View>

                <View style={styles.labelContainer}>
                  {this.state.showHr && (
                      <Text style={styles.labelText}>Minutes</Text>
                  )}
                  {this.state.showHr && (
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
                          keyboardType="numeric"
                          placeholderTextColor="#C0C0C0"
                          autoCapitalize="none"
                          onChangeText={this.handleMin}
                          editable={this.state.disabled}
                          ref={input => {
                            this.state.min;
                          }}
                      />
                  )}
                </View>
              </View>
              {this.state.chore && <Text style={styles.labelText}>Status:</Text>}
              {this.state.chore && (
                  <SwitchSelector
                      options={completeOptions}
                      initial={0}
                      onPress={value => this.setState({complete: value})}
                      borderColor={'#7a42f4'}
                      buttonColor={'#7a42f4'}
                      textColor={'#ff8151'}
                      selectedColor={'#fff'}
                      backgroundColor={'#584c87'}
                      style={styles.sw1}
                  />
              )}
              <Text style={styles.labelText}>Description</Text>
              <TextInput
                  style={[
                    styles.inputBox,
                    {backgroundColor: this.state.disabled ? '#FFF' : '#C0C0C0'},
                  ]}
                  underlineColorAndroid={'transparent'}
                  placeholder={'Description'}
                  multiline={true}
                  numberOfLines={4}
                  placeholderTextColor={'#C0C0C0'}
                  autoCapitalize={'none'}
                  onChangeText={this.handleDescription}
                  editable={this.state.disabled}
                  ref={input => {
                    this.state.description;
                  }}
              />

              <TouchableOpacity
                  style={[
                    styles.submitButton,
                    {backgroundColor: this.state.disabled ? '#7a42f4' : '#C0C0C0'},
                  ]}
                  onPress={() => this.handelSubmit()}>
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
    );
  }
}

const typeOptions = [
  {label: 'Chore', value: true},
  {label: 'Activity', value: false},
];
const allowanceOptions = [
  {label: 'Screen Time', value: true},
  {label: 'Allowance', value: false},
];
const completeOptions = [
  {label: 'Assign', value: true},
  {label: 'Complete', value: false},
];

const styles = EStyleSheet.create({
  outer: {
    flexDirection: 'column',
    backgroundColor: '#e3e1e2',
  },
  header1: {
    paddingTop: '.3rem',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#e3e1e2',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#e3e1e2',
  },
  input: {
    borderRadius: 5,
    height: '2rem',
    borderColor: '#7a42f4',
    borderWidth: 1,
    width: '16rem',
  },
  inputBox: {
    borderRadius: 5,
    height: '6rem',
    borderColor: '#7a42f4',
    borderWidth: 1,
    width: '16rem',
  },
  sw1: {
    marginTop: '.2rem',
    width: '90%',
  },
  submitButton: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#7a42f4',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 100,
    marginHorizontal: 15,
    height: '2rem',
    width: '18rem',
  },
  submitButtonText: {
    color: '#fff',
  },
  labelText: {
    paddingTop: '1rem',
  },

  timeInput: {
    borderRadius: 5,
    margin: '.14rem',
    marginTop: '.05rem',
    height: '2rem',
    borderColor: '#7a42f4',
    borderWidth: 1,
    width: '4rem',
  }, //Hours and minute fields change width based on text input if percentage is used for width
  timeContainer: {
    flexDirection: 'row',
  },
  labelContainer: {
    alignItems: 'center',
    paddingHorizontal: '1.4rem',
  },
  moneyInput: {
    borderRadius: 5,
    height: '2rem',
    borderColor: '#7a42f4',
    borderWidth: 1,
    width: '10rem',
  },
  topLabelText: {
    paddingTop: '1.4rem',
  },
  lineStyle: {
    borderWidth: 1,
    borderColor: '#000285',
  },
  error: {
    color: '#ff0023',
    fontSize: 10,
  },
});
