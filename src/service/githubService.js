
export default class GithubService {
  constructor($fetch = fetch) {
    this.fetch = $fetch;
  }

  searchPopularReposBy(language) {
    const endpoint = `https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc`;

    return this.fetch(endpoint).then(response => {
      if (!response.ok) {
        console.warn('failed to get response');
        return { items: [] };
      }
      return response.json();
    }).catch(err => {
      console.warn(`error failed to fetch from ${endpoint}`, err);
      return Promise.reject(err);
    });
  }
}
