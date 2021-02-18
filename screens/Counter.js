// Imports: Dependencies
import React, {Component} from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {connect} from 'react-redux';

// Screen Dimensions
const {height, width} = Dimensions.get('window');

// Screen: Counter
class Counter extends React.Component {
  render() {
    console.log(this.props);

    return (
      <SafeAreaView style={styles.container}>
        {this.props.lodding ? (
          <Text style={styles.buttonText}>NOW Call</Text>
        ) : null}
        <TouchableOpacity onPress={this.props.APICALL}>
          <Text style={styles.buttonText}>API CALL</Text>
        </TouchableOpacity>
        <Text style={styles.counterTitle}>Counter</Text>

        <View style={styles.counterContainer}>
          <TouchableOpacity onPress={this.props.reduxIncreaseCounter}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>

          <Text style={styles.counterText}>{this.props.counter}</Text>

          <TouchableOpacity onPress={this.props.reduxDecreaseCounter}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterTitle: {
    fontFamily: 'System',
    fontSize: 32,
    fontWeight: '700',
    color: '#000',
  },
  counterText: {
    fontFamily: 'System',
    fontSize: 36,
    fontWeight: '400',
    color: '#000',
  },
  buttonText: {
    fontFamily: 'System',
    fontSize: 50,
    fontWeight: '300',
    color: '#007AFF',
    marginLeft: 40,
    marginRight: 40,
  },
});

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  console.log('State:');
  console.log(state);

  // Redux Store --> Component
  return {
    // counter: state.counterReducer.counter,
    counter: state.counter.counter,
    lodding: state.counter.lodding,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    // Increase Counter
    APICALL: () =>
      dispatch({
        type: 'GET_LOCATION',
        //loading: true,
      }),
    reduxIncreaseCounter: () =>
      dispatch({
        type: 'INCREASE_COUNTER',
        value: 1,
      }),
    // Decrease Counter
    reduxDecreaseCounter: () =>
      dispatch({
        type: 'DECREASE_COUNTER',
        value: 1,
      }),
  };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
