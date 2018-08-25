import React from 'react'
import { createShallow, createMount } from '@material-ui/core/test-utils';
import DropdownCurrency from '../components/DropdownCurrency.js';
import Button from '@material-ui/core/Button';

describe('<DropdownCurrency/ >', () => {
    let shallow;
    let mount;

    beforeAll(() => {
        shallow = createShallow();
        mount = createMount();
    });
    afterAll(() => {
        mount.cleanUp();
    });
    it('should call addCurrency when the button is clicked and a currency is selected', () => {
        const mockaddCurrency = jest.fn();
        const props = {
            addCurrency: mockaddCurrency,
            classes: {}
        }
        const wrapper = mount(<DropdownCurrency {...props}/>);
        wrapper.setState({currency: 'foo'});
        setTimeout(() => {
            wrapper.find(Button).simulate('click');
            expect(mockaddCurrency.mock.calls[0]).toBe('foo');
        }, 1)
    })
    it('should not call the addCurrency when a currency is not selected', () => {
        const mockaddCurrency = jest.fn();
        const props = {
            addCurrency: mockaddCurrency,
            classes: {}
        }
        const wrapper = mount(<DropdownCurrency {...props}/>);
        wrapper.find(Button).simulate('click');
        expect(mockaddCurrency.mock.calls.length).toBe(0);
    })
})
