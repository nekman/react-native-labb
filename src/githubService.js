
export default class GithubService {
  constructor($fetch = fetch) {
    this.fetch = $fetch;
  }

  async searchPopularReposBy(language) {
    const endpoint = `https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc`;

    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        console.warn('failed to get response');
        return { items: [] };
      }

      return await response.json();
    } catch(err) {
      console.warn(`error failed to fetch from ${endpoint}`, err);
    }
  }
}
