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
    const userName = navigation.getParam('userName', 'anonymous');
    this.state = {
      messages: [],
      userName,
    };
  }

  componentDidMount() {
    this.fetchMessages();
    this.listenOnChange();
  };

  getMessages = (snapshotData) => {
    return (typeof snapshotData === 'object' && Object.values(snapshotData)) || snapshotData;
  };

  fetchMessages = async () => {
    const messageRef = database.ref('/messages');
    const snapshot = await messageRef.once('value');
    const messages = this.getMessages(snapshot.val());
    this.setState({messages});
  };

  listenOnChange = () => {
    const messageRef = database.ref('/messages');
    messageRef.on('value', snapshot => {
      const messages = this.getMessages(snapshot.val());
      this.setState({messages});
    })
  };

  async onSend(messages = []) {
    const {userName} = this.state;
    await this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
    const {text} = messages[0];
    const message = {
      _id: this.state.messages.length,
      text,
      user: {
        _id: 1,
        name: userName,
        avatar: "https://placeimg.com/140/140/any"
      }
    };
    database.ref('messages').push(message);
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
        inverted={false}
      />
    );
  }
}
