import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat'
import database from '../firebase'

export default class ChatScreen extends Component {
  static navigationOptions = ( { navigation } ) => {
    const userName = navigation.getParam('userName', 'Anonymous') || 'Anonymous';
    return {
      title: userName,
    };
  };

  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const userName = navigation.getParam('userName', 'Anonymous') || 'Anonymous';
    this.state = {
      messages: [],
      userName,
    };
  }

  componentDidMount() {
    this.fetchMessages();
    this.listenOnChangeMessages();
  };

  readMessages = snapshotData => ( typeof snapshotData === 'object' && Object.values(snapshotData) ) || snapshotData;

  fetchMessages = async () => {
    const snapshot = await database.ref('/messages').once('value');
    const messages = this.readMessages(snapshot.val());
    this.setState({ messages });
  };

  listenOnChangeMessages = () => {
    database.ref('/messages').on('value', (snapshot) => {
      const messages = this.readMessages(snapshot.val());
      this.setState({ messages });
    });
  };

  onSend(messages = []) {
    const { userName } = this.state;
    const newMessage = messages[0];
    const { user } = newMessage;
    user.name = userName;
    user.avatar = "https://placeimg.com/140/140/any";
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
    database.ref('/messages').push(newMessage);
  }

  render() {
    return (
      <GiftedChat
        messages={ this.state.messages }
        onSend={ messages => this.onSend(messages) }
        user={{
          _id: 1,
        }}
        inverted={ false }
      />
    );
  }
}
