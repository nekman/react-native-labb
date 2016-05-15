import React from 'react';
import {
  Image,
  StyleSheet,
  Linking,
  TouchableHighlight,
  Text,
  View
} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  repo: {
    flex: 1
  },

  name: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },

  stars: {
    textAlign: 'center',
  },

  url: {
    textAlign: 'center',
    color: '#07C'
  },


  thumbnail: {
    width: 53,
    height: 81,
  }
});

export default class RepoView extends React.Component {

  constructor(props) {
    super(props);
    this.linking = Linking;
  }

  handleClick(url) {
    return this.linking.canOpenURL(url).then(supported => {
      if (supported) {
        this.linking.openURL(url);
      } else {
        console.log('Cannot open:', url);
      }
    });
  }

  render() {
    const { repo } = this.props;

    return (
      <View style={styles.container}>
        <Image style={styles.thumbnail} source={{ uri: repo.owner.avatar_url }} />
        <View style={styles.repo}>
          <Text style={styles.name}>{repo.name}</Text>
          <Text style={styles.stars}>&#9733; {repo.stargazers_count}</Text>

          <TouchableHighlight
              underlayColor='transparent'
              onPress={() => this.handleClick(repo.html_url)}>
                <Text style={styles.url}>{repo.html_url}</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
