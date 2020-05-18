import React, { Component } from 'react';

import { Keyboard, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';
import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText,
} from './styles';

/**
 * Method for search GitHub users by user id
 * */
export default class Main extends Component {
  static navigationOptions = {
    title: 'Users',
  };

  // eslint-disable-next-line react/static-property-placement
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  // eslint-disable-next-line react/state-in-constructor
  state = {
    newUser: '',
    users: [],
    loading: false,
  };

  // Method to search for users on mobile phone storage
  async componentDidMount() {
    const users = await AsyncStorage.getItem('users');

    if (users) {
      this.setState({ users: JSON.parse(users) });
    }
  }

  // Method executed when there are changes in the users vector
  componentDidUpdate(_, prevState) {
    const { users } = this.state;

    if (prevState.users !== users) {
      // Records to mobile phone storage
      AsyncStorage.setItem('users', JSON.stringify(users));
    }
  }

  handleNavigate = (user) => {
    const { navigation } = this.props;

    navigation.navigate('User', { user });
  };

  handleAddUser = async () => {
    const { users, newUser } = this.state;

    this.setState({ loading: true });

    // Returns GitHub User data by api - Route: /users/'login_github'
    const response = await api.get(`/users/${newUser}`);

    const data = {
      name: response.data.name,
      login: response.data.login,
      bio: response.data.bio,
      avatar: response.data.avatar_url,
    };

    this.setState({
      users: [...users, data],
      newUser: '',
      loading: false,
    });

    // To dismiss the keyboard when click on Send
    Keyboard.dismiss();
  };

  handleRemoveUser = (keyname) => {
    const newState = this.state;
    delete newState[keyname];
    this.setState(newState);
  };

  render() {
    const { users, newUser, loading } = this.state;

    return (
      <Container>
        <Form>
          <Input
            autoCorrect={false}
            autoCaptalize="none"
            placeholder="Adicionar usuário"
            value={newUser}
            onChangeText={(text) => this.setState({ newUser: text })}
            returnKeyType="send"
            onSubmitEditing={this.handleAddUser}
          />
          <SubmitButton loadind={loading} onPress={this.handleAddUser}>
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Icon name="add" size={20} color="#FFF" />
            )}
          </SubmitButton>
        </Form>
        <List
          data={users} // Need to be a array
          // eslint-disable-next-line prettier/prettier
          keyExtractor={user => user.login} // Function that takes a unique property from each user
          // "item" is the users
          renderItem={({ item }) => (
            <User>
              <Avatar source={{ uri: item.avatar }} />
              <Name>{item.name}</Name>
              <Bio>{item.bio}</Bio>

              <ProfileButton onPress={() => this.handleNavigate(item)}>
                <ProfileButtonText>Ver Perfil</ProfileButtonText>
              </ProfileButton>

              <SubmitButton loadind={loading} onPress={this.handleRemoveUser}>
                {loading ? (
                  <ActivityIndicator color="#FFF" />
                ) : (
                  <Icon name="add" size={20} color="#FFF" />
                )}
              </SubmitButton>
            </User>
          )}
        />
      </Container>
    );
  }
}
