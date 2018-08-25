import React from 'react'
import { createMount } from '@material-ui/core/test-utils';
import CurrencyCard from '../components/CurrencyCard.js';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

describe('<CurrencyCard/ >', () => {
    let mount

    beforeAll(() => {
        mount = createMount();
    });
    afterAll(() => {
        mount.cleanUp();
    });
    it('should delete the currency if the close button is clicked', () => {
        const mockdeleteCurrency = jest.fn();
        const props = {
            index: 1,
            rate: 1,
            baseValue: '1',
            currency: 'foo',
            deleteCurrency: mockdeleteCurrency
        };
        const wrapper = mount(<CurrencyCard {...props}/>);
        wrapper.find(IconButton).simulate('click');
        expect(mockdeleteCurrency.mock.calls.length).toBe(1);
    })
    it('should correctly display the value of the currency', () => {
        const props = {
            index: 1,
            rate: 2,
            baseValue: '10',
            currency: 'foo',
            deleteCurrency: () => {}
        };
        const wrapper = mount(<CurrencyCard {...props}/>);
        expect(wrapper.find(Typography).at(2).text()).toBe('20');
    })
})
