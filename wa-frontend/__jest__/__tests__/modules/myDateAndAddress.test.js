import Enzyme, { render, mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';

import MyDateAndAddress from '../../../src/components/CreateEntity/myDateAndAddress';
import { JestEnvironment } from '@jest/environment';

Enzyme.configure({ adapter: new Adapter() });
describe('myDateAndAddress unit test', () => {
  let wrapper;
  beforeEach(() => {
    let props = {
      onChange: jest.fn(),
      name: 'dateAndAddress',
      value: {
        date: null,
        country: '',
        state: '',
        place: ''
      }
    };
    wrapper = mount(<MyDateAndAddress {...props} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  // it('basis use', () => {
  //   let wrapperSnapshot = mount(<MyDateAndAddress />);
  //   expect(toJson(wrapperSnapshot)).toMatchSnapshot();
  // });

  it('test props', () => {
    expect(wrapper.state('name')).toEqual('dateAndAddress');
    expect(wrapper.state('date')).toEqual(null);
    expect(wrapper.state('country')).toEqual('');
    expect(wrapper.state('state')).toEqual('');
    expect(wrapper.state('place')).toEqual('');
  });

  it('test input change', () => {
    let value = 'Lanf Fang';

    wrapper
      .find('input[placeholder="place"]')
      .simulate('change', { target: { value } });

    expect(wrapper.props().onChange).toBeCalled();
  });
});
