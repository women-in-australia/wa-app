import Enzyme, { render, mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';

import CreateWmEntityWrapper from '../../../src/containers/CreateWmEntity';
import store from '../../../src/redux/store';

Enzyme.configure({ adapter: new Adapter() });
describe('createEntity Intergration test', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <CreateWmEntityWrapper />
      </Provider>
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('test input change', () => {
    let body = wrapper.find('CreateWmEntity');
    // console.log(body);

    let value = 'Lanf Fang';

    body.find('Detail TextArea').simulate('change', { target: { value } });

    expect(body.state().detail).toEqual(value);
  });
});
