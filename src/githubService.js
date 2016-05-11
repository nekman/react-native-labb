
const ENDPOINT = 'https://api.github.com/repos/facebook/react-native/issues?state=closed';

export default class GithubService {
  constructor($fetch = fetch) {
    this.fetch = $fetch;
  }

  getIssues() {
    return fetch(ENDPOINT).then(res => res.json());
  }
}
