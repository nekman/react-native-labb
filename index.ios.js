/**
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  ScrollView,
  View,
  Text
} from 'react-native';

import GithubService from './src/githubService';
import IssueView from './src/issueView';
import LoadingView from './src/loadingView';

export const styles = StyleSheet.create({
  scrollView: {
    padding: 20,
    backgroundColor: '#F5FCFF',
  }
});

export class GithubIssuesApp extends Component {

  constructor(props) {
    super(props);
    this.service = new GithubService();
    this.state = {
      issues: []
    };
  }

  render() {
    const { issues } = this.state;
    if (!issues.length) {
      this.loadIssues();
      return <LoadingView message='Loading issues...' />;
    }

    return (
      <ScrollView style={styles.scrollView}>
        {issues.map(issue => {
          return <IssueView key={issue.id} issue={issue} />;
        })}
      </ScrollView>
    );
  }

  loadIssues() {
    this.service.getIssues().then(issues => {
      this.setState({
        issues
      });
    });
  }
}

AppRegistry.registerComponent('GithubIssuesApp', () => GithubIssuesApp);
