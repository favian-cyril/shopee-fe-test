import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import data from '../currency.json';

const styles = {
    root: {
        'width': '100%',
    },
    content: {
        'padding-top': 0,
        'padding-bottom': '5px',
    },
    header: {
        'padding-bottom': '5px',
    }
}

const CurrencyCard = props => {
    const { classes, deleteCurrency, currency, rate, baseValue, baseCurrency } = props;
    var value = rate * baseValue;
    var subheader = currency + ' - ' + data.string[currency];
    return (
        <Card className={classes.root}>
            <CardHeader
                className={classes.header}
                action={
                    <IconButton onClick={(evt) => {deleteCurrency(props.index)}}>
                        <CloseIcon />
                    </IconButton>
                }
                title={
                    <Grid container spacing={24}>
                        <Grid item xs={6}>
                        <Typography variant="title" color="inherit" >
                          {currency}
                        </Typography>
                        </Grid>
                        <Grid item xs={6}>
                        <Typography variant="title" color="inherit" align="right">
                          {value}
                        </Typography>
                        </Grid>
                    </Grid>
                }
                subheader={subheader}
            />
            <CardContent className={classes.content}>
              <Typography component="p">
                1 {baseCurrency} = {currency} {rate}
              </Typography>
            </CardContent>
        </Card>
    )
}

CurrencyCard.propTypes = {
    index: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    baseValue: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    deleteCurrency: PropTypes.func.isRequired,
}

export default withStyles(styles)(CurrencyCard);
