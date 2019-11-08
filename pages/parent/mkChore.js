import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Switch,
} from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import axios from 'axios';
import '../global';
import {ChildrenList} from '../children';
import AsyncStorage from '@react-native-community/async-storage';
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

  toggleSwitch = value => {
    this.setState({showHr: value});
  };

  handleName = text => {
    this.setState({name: text});
  };

  handleDescription = text => {
    this.setState({description: text});
  };
  handelType = text => {
    this.setState({type: text});
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
        console.log(response.data);
        this.setState({
          disabled: true,
        });
        this.props.navigation.navigate('ParentHome');
      })
      .catch(error => {
        console.log(error);
        this.setState({titleText: JSON.stringify(error)});
        this.enable();
      });
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.topLabelText}>Children:</Text>
          <ChildrenList updateParentState={this.updateState.bind(this)} />
          <Text style={styles.topLabelText}>Type:</Text>
          <SwitchSelector
            options={typeOptions}
            initial={0}
            onPress={value => this.setState({chore: value})}
            borderColor={'#292050'}
            buttonColor={'#7a42f4'}
            textColor={'#ff8151'}
            selectedColor={'#fff'}
            backgroundColor={'#584c87'}
            style={styles.sw1}
          />

          <Text style={styles.labelText}>Name</Text>
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
            editable={this.state.disabled}
          />
          <Text style={styles.labelText}>Reward:</Text>
          <SwitchSelector
            options={allowanceOptions}
            initial={0}
            onPress={value => this.setState({showHr: value})}
            borderColor={'#292050'}
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

            {!this.state.showHr && (
              <TextInput
                style={[
                  styles.moneyInput,
                  {backgroundColor: this.state.disabled ? '#FFF' : '#C0C0C0'},
                ]}
                underlineColorAndroid="transparent"
                placeholder="Amount"
                placeholderTextColor="#C0C0C0"
                autoCapitalize="none"
                onChangeText={this.handleAllowance}
                editable={this.state.disabled}
              />
            )}
          </View>

          <View style={styles.timeContainer}>
            <View style={styles.labelContainer}>
              {this.state.showHr && <Text style={styles.labelText}>Hours</Text>}

              {this.state.showHr && (
                <TextInput
                  style={[
                    styles.timeInput,
                    {backgroundColor: this.state.disabled ? '#FFF' : '#C0C0C0'},
                  ]}
                  underlineColorAndroid="transparent"
                  placeholder="Hours"
                  placeholderTextColor="#C0C0C0"
                  autoCapitalize="none"
                  onChangeText={this.handelHr}
                  editable={this.state.disabled}
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
                    {backgroundColor: this.state.disabled ? '#FFF' : '#C0C0C0'},
                  ]}
                  underlineColorAndroid="transparent"
                  placeholder="Minutes"
                  placeholderTextColor="#C0C0C0"
                  autoCapitalize="none"
                  onChangeText={this.handleMin}
                  editable={this.state.disabled}
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
              borderColor={'#292050'}
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
            underlineColorAndroid="transparent"
            placeholder="Description"
            multiline
            numberOfLines={4}
            placeholderTextColor="#C0C0C0"
            autoCapitalize="none"
            onChangeText={this.handleDescription}
            editable={this.state.disabled}
          />

          <TouchableOpacity
            style={[
              styles.submitButton,
              {backgroundColor: this.state.disabled ? '#7a42f4' : '#C0C0C0'},
            ]}
            onPress={() => this.handelSubmit()}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
          <Text>{this.state.titleText}</Text>
        </View>
      </ScrollView>
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e3e1e2',
    flex: 1,
    alignItems: 'center',
    paddingTop: 7,
  },
  input: {
    borderRadius: 10,
    marginHorizontal: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1,
    width: '75%',
  },
  inputBox: {
    borderRadius: 10,
    marginHorizontal: 15,
    height: 60,
    borderColor: '#7a42f4',
    borderWidth: 1,
    width: '75%',
  },
  sw1: {
    margin: 15,
    marginTop: 5,
    width: '90%',
  },
  submitButton: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#292050',
    alignItems: 'center',
    padding: 10,
    marginTop: 4,
    marginHorizontal: 15,
    height: 37,
    width: '75%',
  },
  submitButtonText: {
    color: '#fff',
  },
  labelText: {
    paddingTop: 10,
  },
  detail: {
    fontSize: 8,
  },
  timeInput: {
    borderRadius: 10,
    margin: 15,
    marginTop: 1,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1,
    width: 75,
  }, //Hours and minute fields change width based on text input if percentage is used for width
  timeContainer: {
    flexDirection: 'row',
  },
  labelContainer: {
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  moneyInput: {
    borderRadius: 10,
    marginHorizontal: 15,
    marginBottom: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1,
    width: 200,
  },
  topLabelText: {
    paddingTop: 25,
  },
});
