import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { getRatesData } from './scripts/getRatesData';
import CurrencyCard from './components/CurrencyCard';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import DropdownCurrency from './components/DropdownCurrency';
import DialogPrompt from './components/DialogPrompt';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import data from './currency.json';

const styles = {
    root: {
        'padding-left': '35%',
        'padding-right': '35%',
        'padding-top': '15%',
        'padding-bottom': '10%',
        'background-color': 'rgb(168, 168, 168)',
        'color': '#FFFFFF',
    },
    list: {
        'background-color': '#FFFFFF'
    },
    changeButton: {
        'margin-left': '55%'
    }
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            baseCurrency: 'USD',
            currencies: [],
            baseValue: 1.00,
            showDropdown: false,
            showPrompt: true,
        }
    }
    addCurrency = (currency) => {
        var that = this;
        getRatesData(this.state.baseCurrency).then(function (val) {
            console.log(val);
            var rate = val[currency];
            let newArray = [...that.state.currencies];
            newArray.push({cur: currency, rate: rate})
            that.setState({
                currencies: newArray
            });
        });
        this.setState({
            showDropdown: false
        })
    }
    deleteCurrency = (key) => {
        let newArray = [...this.state.currencies];
        newArray.splice(key, 1);
        this.setState({
            currencies: newArray
        })
    }
    setBaseValue = (val) => {
        this.setState({
            baseValue: val,
            showPrompt: false
        });
    }
    toggleDropdown = () => {
        this.setState(prevState => ({ showDropdown: !prevState.showDropdown }))
    }
    showCurrencyPrompt = () => {
        this.setState({
            showPrompt: true
        })
    }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
          <AppBar position="static" color="default">
            <Toolbar>
                <Grid container spacing={24}>
                    <Grid item xs={6}>
                    <Typography component="p">
                      {this.state.baseCurrency + ' - ' + data.string[this.state.baseCurrency]}
                    </Typography>
                    <Typography variant="title" color="inherit" >
                        {this.state.baseCurrency}
                    </Typography>
                    </Grid>
                    <Grid item xs={6}>
                    <Typography variant="title" color="inherit" align="right">
                        {this.state.baseValue}
                    </Typography>
                    <Button className={classes.changeButton} onClick={this.showCurrencyPrompt} variant="outlined">
                    Change
                    </Button>
                    </Grid>
                </Grid>
            </Toolbar>
          </AppBar>
          <List className={classes.list}>
          {this.state.currencies.map((item, i) => {
              return (
                  <ListItem key={i} >
                    <CurrencyCard
                        rate={item.rate}
                        currency={item.cur}
                        baseValue={this.state.baseValue}
                        baseCurrency={this.state.baseCurrency}
                        deleteCurrency={this.deleteCurrency}
                        index={i}/>
                  </ListItem>
              )
          })}
          <ListItem>
            {this.state.showDropdown ? (
                <DropdownCurrency addCurrency={this.addCurrency}/>
            ) : (
                <Button fullWidth onClick={this.toggleDropdown} variant="contained">
                Add Currencies
                </Button>
            )}
          </ListItem>
          </List>
          <DialogPrompt setBaseValue={this.setBaseValue} showPrompt={this.state.showPrompt}/>
      </div>
    );
  }
}
App.propTypes = {
    classes: PropTypes.object.isRequired,
}
export default withStyles(styles)(App);
