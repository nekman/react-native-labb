import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import RepoView from '../src/repoView';


describe('RepoView', () => {
  let wrapper = null;
  let mockRepo = null;

  beforeEach(() => {
    mockRepo = {
      owner: {
        avatar_url: 'http://fake.url'
      },
      stargazers_count: 1,
      name: 'fake_name'
    };

    wrapper = shallow(<RepoView repo={mockRepo}/>);
  });

  it('is has props', () => {
    expect(wrapper.instance().props.repo).to.eql(mockRepo);
  });

  it('can handle clicks', done => {
    const fakeLinking = {
      canOpenURL() {
        return Promise.resolve(true);
      },

      openURL: sinon.spy()
    };

    const sut = new RepoView();
    sut.linking = fakeLinking;

    const promise = sut.handleClick('http://foo.bar');

    promise.then(() => {
      expect(fakeLinking.openURL.calledOnce).to.eql(true);
      done();
    });
  });
});
