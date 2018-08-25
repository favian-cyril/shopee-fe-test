import React from 'react'
import { createMount } from '@material-ui/core/test-utils';
import DialogPrompt from '../components/DialogPrompt.js';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

describe('<DialogPrompt/ >', () => {
    let mount;

    beforeAll(() => {
        mount = createMount();
    });
    afterAll(() => {
        mount.cleanUp();
    });
    it('should change the state when the input is changed', () => {
        const wrapper = mount(<DialogPrompt showPrompt={true} setBaseValue={() => {}}/>);
        const usernameInput = wrapper.find(TextField);
        wrapper.setState({value: 1});
        setTimeout(() => {
            expect(wrapper.state().value).toBe(1);
            usernameInput.instance().value = "10";
            usernameInput.simulate('change');
            expect(wrapper.state().value).toBe(10);
        }, 1)
    })
    it('should call the handleSubmit function when the button is clicked', () => {
        const mocksetBaseValue = jest.fn();
        const wrapper = mount(<DialogPrompt showPrompt={true} setBaseValue={mocksetBaseValue}/>);
        wrapper.find(Button).simulate('click');
        expect(mocksetBaseValue.mock.calls.length).toBe(1);
    })
})
