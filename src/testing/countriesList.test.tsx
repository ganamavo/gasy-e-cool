import React from 'react';
import { render, cleanup, fireEvent, } from '@testing-library/react';
import { shallow } from 'enzyme';
import { Home } from '../pages/home';


afterEach(() => {
    cleanup()
})  

test('renders the component', () => {
  const { debug } = render(<Home />); 
  debug()
});
