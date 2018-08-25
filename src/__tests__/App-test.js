import React from 'react'
import { createShallow, createMount } from '@material-ui/core/test-utils';
import App from '../App.js';
import CurrencyCard from '../components/CurrencyCard.js';
import Button from '@material-ui/core/Button';
import DropdownCurrency from '../components/DropdownCurrency';
import DialogPrompt from '../components/DialogPrompt';
import mockAxios from 'axios';
import renderer from 'react-test-renderer';

describe('<App/ >', () => {
    let shallow;
    let mount;

    beforeAll(() => {
        shallow = createShallow();
        mount = createMount();
    });
    afterAll(() => {
        mount.cleanUp();
    })
    // snapshot testing unavailable because of bug in react-test-renderer
    // it('should render correctly', () => {
    //     const tree = renderer.create(<App/>).toJSON();
    //     expect(tree).toMatchSnapshot();
    // })
    it('should render CurrencyCards based on the currencies', () => {
        const wrapper = shallow(<App />);
        wrapper.setState({currencies: [{cur: 'asd', rate: 12}, {cur: 'dsa', rate: 14}]});
        // To prevent from instantly expecting while state is not set
        setTimeout(() => {expect(wrapper.find(CurrencyCard)).toHaveLength(2);}, 1)
    })
    it('should show DropdownCurrency when the add currency button is clicked', () => {
        const wrapper = mount(<App />);
        expect(wrapper.find(DropdownCurrency)).toHaveLength(0);
        wrapper.find(Button).at(1).simulate('click');
        expect(wrapper.find(DropdownCurrency)).toHaveLength(1);
    })
    it('should show DialogPrompt when the change button is clicked', () => {
        const wrapper = mount(<App />);
        wrapper.setState({showPrompt: false});
        wrapper.find(Button).at(0).simulate('click');
        setTimeout(() => {expect(wrapper.state().showPrompt).toBe(true);}, 1)
    })
    it('should be able to add currencies', () => {
        const response = {IDR: 1};
        mockAxios.get.mockImplementationOnce(() =>
            Promise.resolve({
              data: { rates: response }
            })
        );
        const wrapper = shallow(<App />);
        wrapper.setState({currencies: []});
        setTimeout(() => {
            const instance = wrapper.dive().instance()
            instance.addCurrency('IDR');
            expect(wrapper.state().currencies).toHaveLength(1);
        }, 1)
    })
    it('should be able to delete currencies', () => {
        const wrapper = shallow(<App />);
        wrapper.setState({currencies: [{cur: 'asd', rate: 12}, {cur: 'dsa', rate: 14}]});
        setTimeout(() => {
            const instance = wrapper.dive().instance();
            instance.deleteCurrency(1);
            expect(wrapper.state().currencies).toHaveLength(0);
            expect(wrapper.state().currencies[0].cur).toBe('dsa');
        }, 1)
    })
    it('should be able to set baseValue', () => {
        const wrapper = shallow(<App />);
        wrapper.setState({baseValue: 1});
        setTimeout(() => {
            const instance = wrapper.dive().instance();
            instance.setBaseValue(10);
            expect(wrapper.state().baseValue).toBe(10);
        }, 1)
    })
})
