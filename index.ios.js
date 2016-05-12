/**
 * A hacky demo, to try RN.
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  ScrollView,
  TextInput,
  View,
  Text
} from 'react-native';

import GithubService from './src/githubService';
import RepoView from './src/repoView';
import LoadingView from './src/loadingView';

export const styles = StyleSheet.create({
  scrollView: {
    padding: 20,
    marginBottom: 20,
    backgroundColor: '#fff',
  },

  search: {
    marginBottom: 20,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
  }

});

export class GithubApp extends Component {

  constructor(props) {
    super(props);
    this.service = new GithubService();

    // Initial state
    this.state = {
      loaded: false,
      language: 'JavaScript',
      repos: []
    };
  }

  handleChange(event) {
    const language = event.nativeEvent.text;

    this.setState({
      language,
      loaded: false
    });
  }

  hasLoadedIssues() {
    return this.state.loaded;
  }

  hasSearchResult() {
    return this.state.loaded && this.state.repos.length;
  }

  render() {
    const { repos, language } = this.state;
    if (!this.hasLoadedIssues()) {
      this.searchRepos();
      return <LoadingView message={`Loading repos for ${language} ...`} />;
    }

    if (!this.hasSearchResult()) {
      return (
        <View style={styles.scrollView}>
          {this.renderSearchTextBox()}
          <LoadingView message={`Could not find any repos for ${language}.`} />
        </View>
      )
    }

    return (
      <ScrollView style={styles.scrollView}>
        {this.renderSearchTextBox()}

        {repos.map(repo => {
          return <RepoView key={repo.id} repo={repo} />;
        })}
      </ScrollView>
    );
  }

  renderSearchTextBox() {
    return (
      <TextInput
        ref='language'
        returnKeyType='next'
        blurOnSubmit={true}
        autoCorrect={false}
        style={styles.search}
        value={this.state.language}
        onChangeText={language => this.setState({language})}
        onSubmitEditing={event => this.handleChange(event)}
      />
    );
  }

  async searchRepos() {
    const { language } = this.state;
    const { items } = await this.service.searchPopularReposBy(language);

    this.setState({
      loaded: true,
      repos: items
    });
  }
}

AppRegistry.registerComponent('GithubApp', () => GithubApp);
