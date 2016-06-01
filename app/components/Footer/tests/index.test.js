import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';

import Footer from '../index';

describe('<Footer />', () => {
  it('should render the credits', () => {
    const renderedComponent = shallow(<Footer />);
    expect(renderedComponent.contains(
      <section>
        <p>Made with love by Sebastian Häni and Steven Cardini.</p>
      </section>
    )).toEqual(true);
  });
});
