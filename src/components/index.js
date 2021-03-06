import React from 'react';
import { AppRegistry, StyleSheet, ScrollView, TextInput, View } from 'react-native';
import GithubService from '../service/githubService';
import RepoView from './repoView';
import LoadingView from './loadingView';

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


/**
 * A hacky demo, to try RN.
 * Main component.
 */
export class GithubApp extends React.Component {

  constructor() {
    super();
    this.service = new GithubService();

    // Initial state
    this.state = {
      loaded: false,
      language: 'JavaScript',
      searchLanguage: 'JavaScript',
      repos: []
    };
  }

  handleChange(event) {
    const language = event.nativeEvent.text;
    if (!language) {
      return;
    }

    this.setState({
      language,
      searchLanguage: language,
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
    const { repos, searchLanguage } = this.state;
    if (!this.hasLoadedIssues()) {
      this.searchRepos();
      return <LoadingView message={`Loading repos for ${searchLanguage} ...`} />;
    }

    if (!this.hasSearchResult()) {
      return (
        <View style={styles.scrollView}>
          {this.renderSearchTextBox()}
          <LoadingView message={`Could not find any repos for ${searchLanguage}.`} />
        </View>
      );
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
        onChangeText={language => this.setState({ language })}
        onSubmitEditing={event => this.handleChange(event)}
      />
    );
  }

  searchRepos() {
    const { language } = this.state;
    this.service.searchPopularReposBy(language).then(res => {
      this.setState({
        loaded: true,
        repos: res.items
      });
    });
  }
}

AppRegistry.registerComponent('GithubApp', () => GithubApp);
