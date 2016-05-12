import React, { Component, Text, View } from 'react-native';
import { styles } from './issueView';

export default class LoadingView extends Component {

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