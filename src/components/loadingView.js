import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './repoView';

export default class LoadingView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>
          {this.props.message}
        </Text>
      </View>
    );
  }
}
