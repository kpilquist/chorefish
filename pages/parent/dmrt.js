import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import '../global';
import SwitchSelector from 'react-native-switch-selector';
import {ChildrenList} from '../children';

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
        'http://192.168.1.8:8000/api/auth/demerit',
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
      <ScrollView>
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
              {this.state.reward && <Text style={styles.labelText}>Hours</Text>}

              {this.state.reward && (
                <TextInput
                  style={[
                    styles.timeInput,
                    {backgroundColor: this.state.disabled ? '#FFF' : '#C0C0C0'},
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
                    {backgroundColor: this.state.disabled ? '#FFF' : '#C0C0C0'},
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
    );
  }
}
const Options = [
  {label: 'Screen Time', value: true},
  {label: 'Allowance', value: false},
];

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e3e1e2',
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  input: {
    borderRadius: 10,
    margin: 15,
    marginTop: 1,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1,
    width: '75%',
  },
  submitButton: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#292050',
    alignItems: 'center',
    padding: 10,
    margin: 15,
    height: 40,
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
  timeContainer: {
    flexDirection: 'row',
  },
  labelContainer: {
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  timeInput: {
    borderRadius: 10,
    margin: 15,
    marginTop: 1,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1,
    width: 75,
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
  h2text: {
    marginTop: 10,
    fontFamily: 'Helvetica',
    fontSize: 36,
    fontWeight: 'bold',
  },
  flatview: {
    justifyContent: 'center',
    paddingTop: 30,
    borderRadius: 2,
  },
  name: {
    fontFamily: 'Verdana',
    fontSize: 18,
  },
  title: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  list: {
    paddingVertical: 5,
    margin: 3,
    flexDirection: 'row',
    backgroundColor: '#192338',
    justifyContent: 'flex-start',
    alignItems: 'center',
    zIndex: -1,
  },
  lightText: {
    color: '#f7f7f7',
    width: 200,
    paddingLeft: 15,
    fontSize: 12,
  },
  line: {
    height: 0.5,
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  icon: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    left: 290,
    zIndex: 1,
  },
  numberBox: {
    position: 'absolute',
    bottom: 75,
    width: 30,
    height: 30,
    borderRadius: 15,
    left: 330,
    zIndex: 3,
    backgroundColor: '#e3e3e3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sw1: {
    margin: 15,
    marginTop: 5,
    width: '90%',
  },
  number: {fontSize: 14, color: '#000'},
  selected: {backgroundColor: '#FA7B5F'},
  inputBox: {
    borderRadius: 10,
    marginHorizontal: 15,
    height: 60,
    borderColor: '#7a42f4',
    borderWidth: 1,
    width: 230,
  },
});
