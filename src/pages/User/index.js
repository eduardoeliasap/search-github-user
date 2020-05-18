import React, { Component } from 'react';
import PropTypes from 'prop-types';

import api from '../../services/api';

import {
  Container,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

/**
 * Method for showing the GitHub repositories the user likes
 * */
export default class User extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('user').name,
  });

  // eslint-disable-next-line react/static-property-placement
  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  };

  // eslint-disable-next-line react/state-in-constructor
  state = {
    stars: [],
  };

  async componentDidMount() {
    const { navigation } = this.props;
    const user = navigation.getParam('user');

    // Returns Starts GitHub User data by api - Route: /users/'login_github/starred'
    const response = await api.get(`/users/${user.login}/starred`);

    // I take all the answers and record them in stars
    this.setState({ stars: response.data });
  }

  render() {
    const { navigation } = this.props;
    const { stars } = this.state;
    const user = navigation.getParam('user');

    return (
      <Container>
        <Avatar source={{ uri: user.avatar }} />
        <Name>{user.name}</Name>
        <Bio>{user.bio}</Bio>

        <Stars
          data={stars}
          keyExtractor={(star) => String(star.id)}
          renderItem={({ item }) => (
            <Starred>
              <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
              <Info>
                <Title>{item.name}</Title>
                <Author>{item.owner.login}</Author>
              </Info>
            </Starred>
          )}
        />
      </Container>
    );
  }
}
