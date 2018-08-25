import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import data from '../currency.json';

const styles = {
    dropdown: {
        'margin-left': 'auto',
        'margin-right': 'auto',
    }
}

class DropdownCurrency extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currency: '',
        }
    }
    handleChange = event => {
        this.setState({ currency: event.target.value });
    }
    render() {
    const { classes, addCurrency } = this.props;
    return (
        <div className={classes.dropdown}>
        <Select
            value={this.state.currency}
            onChange={this.handleChange}
            inputProps={{
              name: 'currency',
              id: 'cur',
            }}
          >
          {
              data.available.map(function (cur, i) {
                  return <MenuItem value={cur} key={i}>{cur}</MenuItem>
              })
          }
         </Select>
         <Button variant="contained" onClick={(evt) => {this.state.currency.length > 1 ? addCurrency(this.state.currency) : null}}>
            Submit
         </Button>
         </div>
    )
}
}

DropdownCurrency.propTypes = {
    addCurrency: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(DropdownCurrency);
