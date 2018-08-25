import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

class DialogPrompt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1.00,
        }
    }
    handleChange = (evt) => {
        this.setState({value: evt.target.value});
    }
    handleSubmit = () => {
        this.props.setBaseValue(this.state.value);
    };
    render() {
        const { classes, showPrompt } = this.props;
        return (
            <Dialog
                open={showPrompt}
                aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Please enter an input value of base currency:
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="value"
                  label="value"
                  onChange={this.handleChange}
                  value={this.state.value}
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleSubmit} color="primary">
                  Submit
                </Button>
              </DialogActions>
            </Dialog>
        )
    }
}

DialogPrompt.propTypes = {
    showPrompt: PropTypes.bool.isRequired,
    setBaseValue: PropTypes.func.isRequired,
}

export default DialogPrompt;
