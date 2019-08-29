import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button
} from 'react-native';

export default class HomeScreen extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      userName: "",
    }
  }

  onChangeText = text => {
    this.setState( { userName: text } );
  };

  onPressGoToChat = () => {
    const { userName } = this.state;
    this.props.navigation.navigate( 'Chat', { userName } );
  };

  render() {
    const { userName } = this.state;
    return (
      <View style={styles.container}>
        <Text>Please type your name:</Text>
        <TextInput style={ styles.input } value={ userName } onChangeText={ this.onChangeText } />
        <Button title="Go to chat" color="red" onPress={ this.onPressGoToChat }/>
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#a8a8a8',
    width: 300,
    height: 40,
  }
});
