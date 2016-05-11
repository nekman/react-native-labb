import React, {
  Component,
  StyleSheet,
  Image,
  Text,
  View
} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  issue: {
    flex: 1
  },

  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },

  user: {
    textAlign: 'center',
  },
  thumbnail: {
    width: 53,
    height: 81,
  }
});

export default class IssueView extends Component {

  render() {
    const { issue } = this.props;

    return (
      <View style={styles.container}>
        <Image style={styles.thumbnail} source={{uri: issue.user.avatar_url}} />
        <View style={styles.issue}>
          <Text style={styles.title}>{issue.title}</Text>
          <Text style={styles.user}>{issue.user.login}</Text>
        </View>
      </View>
    );
  }
}
