import React from 'react';
import { shallow } from 'enzyme';
import CatalogItem from '.';

let defaultProps;
let wrapper;

beforeEach(() => {
  defaultProps = {
    linkUri: '/catalogs/1/datasets',
    type: 'datasets'
  };
  wrapper = shallow(<CatalogItem {...defaultProps} />);
});

test('should render CatalogItem correctly with missing itemsCount', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should render CatalogItem correctly with itemsCount set to 10', () => {
  wrapper.setProps({
    itemsCount: 10
  });
  expect(wrapper).toMatchSnapshot();
});
