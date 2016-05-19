import { expect } from 'chai';
import sinon from 'sinon';
import GithubService from '../../src/service/githubService';

let response = {};

const fetchFactory = promise => () => promise;

describe('GithubService', () => {
  beforeEach(() => {
    response = {
      ok: true,
      json: sinon.spy()
    };
  });

  it('gets repositories by language', done => {
    const sut = new GithubService(fetchFactory(
      Promise.resolve(response))
    );

    const promise = sut.searchPopularReposBy('Java');

    promise.then(() => {
      expect(response.json.calledOnce).to.eql(true);
      done();
    });
  });

  it('returns empty items if no repos was found', done => {
    response.ok = false;

    const sut = new GithubService(fetchFactory(
      Promise.resolve(response))
    );

    const promise = sut.searchPopularReposBy('Java');

    promise.then(result => {
      expect(result.items).to.eql([]);
      expect(response.json.calledOnce).to.eql(false);
      done();
    });
  });

  it('catches errors', done => {
    const sut = new GithubService(fetchFactory(
      Promise.reject({ msg: 'err' }))
    );

    const promise = sut.searchPopularReposBy('Java');

    promise.catch(err => {
      expect(err.msg).to.eql('err');
      done();
    });
  });
});
