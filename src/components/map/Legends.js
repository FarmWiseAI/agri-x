import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Close from "@material-ui/icons/Close";
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { purple, red, pink, indigo, blue, green, lime, orange, brown, grey, deepOrange } from '@material-ui/core/colors';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Switch from '@material-ui/core/Switch';

const styles = {
    body: {
        maxHeight: '400px',
        overflowY: 'scroll'
    },
    root: {
        position: "absolute",
        minWidth: 80,
        top: "2%",
        right: "10%",
    },
    head: {
        padding: "16px"
    },
    close: {
        float: 'right'
    },
    colorBar: {},
    colorChecked: {},
    red: {
        color: red[300],
        '&$colorChecked': {
            color: red[500],
        },
        '& + $colorBar': {
            backgroundColor: red[500],
        },
    },
    purple: {
        color: purple[300],
        '&$colorChecked': {
            color: purple[500],
        },
        '& + $colorBar': {
            backgroundColor: purple[500],
        },
    },
    pink: {
        color: pink[300],
        '&$colorChecked': {
            color: pink[500],
        },
        '& + $colorBar': {
            backgroundColor: pink[500],
        },
    },
    indigo: {
        color: indigo[300],
        '&$colorChecked': {
            color: indigo[500],
        },
        '& + $colorBar': {
            backgroundColor: indigo[500],
        },
    },
    blue: {
        color: blue[300],
        '&$colorChecked': {
            color: blue[500],
        },
        '& + $colorBar': {
            backgroundColor: blue[500],
        },
    },
    green: {
        color: green[300],
        '&$colorChecked': {
            color: green[500],
        },
        '& + $colorBar': {
            backgroundColor: green[500],
        },
    },
    lime: {
        color: lime[300],
        '&$colorChecked': {
            color: lime[500],
        },
        '& + $colorBar': {
            backgroundColor: lime[500],
        },
    },
    orange: {
        color: orange[300],
        '&$colorChecked': {
            color: orange[500],
        },
        '& + $colorBar': {
            backgroundColor: orange[500],
        },
    },
    brown: {
        color: brown[300],
        '&$colorChecked': {
            color: brown[500],
        },
        '& + $colorBar': {
            backgroundColor: brown[500],
        },
    },
    grey: {
        color: grey[300],
        '&$colorChecked': {
            color: grey[500],
        },
        '& + $colorBar': {
            backgroundColor: red[500],
        },
    },
    deepOrange: {
        color: deepOrange[300],
        '&$colorChecked': {
            color: deepOrange[500],
        },
        '& + $colorBar': {
            backgroundColor: deepOrange[500],
        },
    },
};

class Legends extends Component {
    constructor(props) {
        super(props);
        this.state = { crops: { 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true, 9: true, 10: true, 11: true } }
    }
    switchClick = i => {
        this.setState(prevState => {
            prevState.crops[i] = !prevState.crops[i];
            return prevState;
        }, () => {
            this.props.toggle(this.state.crops);
        });
    }
    render() {
        const { classes } = this.props;
        const { crops } = this.state;
        return (
            <Paper className={classes.root}>
                <div className={classes.head}>
                    <Typography variant="h5" component="h3">
                        Crop Legends
                    <IconButton aria-label="delete" onClick={this.props.close}>
                            <Close color="error" />
                        </IconButton>
                    </Typography>
                </div>
                <Divider style={{ width: '100%' }} />
                <div className={classes.body}>
                    <List>
                        <ListItem key={1} role={undefined} dense>
                            <ListItemIcon>
                                <Switch
                                    checked={crops[1]}
                                    color='default'
                                    onClick={() => { this.switchClick(1) }}
                                    classes={{
                                        switchBase: classes.purple,
                                        checked: classes.colorChecked,
                                        bar: classes.colorBar,
                                      }}
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                />
                            </ListItemIcon>
                            <ListItemText id={'checkbox-list-label-1'} primary={1} />
                        </ListItem><ListItem key={2} role={undefined} dense>
                            <ListItemIcon>
                                <Switch
                                    color='default'
                                    checked={crops[2]}
                                    onClick={() => { this.switchClick(2) }}
                                    classes={{
                                        switchBase: classes.red,
                                        checked: classes.colorChecked,
                                        bar: classes.colorBar,
                                      }}
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                />
                            </ListItemIcon>
                            <ListItemText id={'checkbox-list-label-2'} primary={2} />
                        </ListItem><ListItem key={3} role={undefined} dense>
                            <ListItemIcon>
                                <Switch
                                    checked={crops[3]}
                                    color='default'
                                    onClick={() => { this.switchClick(3) }}
                                    classes={{
                                        switchBase: classes.pink,
                                        checked: classes.colorChecked,
                                        bar: classes.colorBar,
                                      }}
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                />
                            </ListItemIcon>
                            <ListItemText id={'checkbox-list-label-3'} primary={3} />
                        </ListItem><ListItem key={4} role={undefined} dense>
                            <ListItemIcon>
                                <Switch
                                    checked={crops[4]}
                                    color='default'
                                    onClick={() => { this.switchClick(4) }}
                                    classes={{
                                        switchBase: classes.indigo,
                                        checked: classes.colorChecked,
                                        bar: classes.colorBar,
                                      }}
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                />
                            </ListItemIcon>
                            <ListItemText id={'checkbox-list-label-4'} primary={4} />
                        </ListItem><ListItem key={5} role={undefined} dense>
                            <ListItemIcon>
                                <Switch
                                    checked={crops[5]}
                                    color='default'
                                    onClick={() => { this.switchClick(5) }}
                                    classes={{
                                        switchBase: classes.blue,
                                        checked: classes.colorChecked,
                                        bar: classes.colorBar,
                                      }}
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                />
                            </ListItemIcon>
                            <ListItemText id={'checkbox-list-label-5'} primary={5} />
                        </ListItem><ListItem key={6} role={undefined} dense>
                            <ListItemIcon>
                                <Switch
                                    checked={crops[6]}
                                    color='default'
                                    onClick={() => { this.switchClick(6) }}
                                    classes={{
                                        switchBase: classes.green,
                                        checked: classes.colorChecked,
                                        bar: classes.colorBar,
                                      }}
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                />
                            </ListItemIcon>
                            <ListItemText id={'checkbox-list-label-6'} primary={6} />
                        </ListItem><ListItem key={7} role={undefined} dense>
                            <ListItemIcon>
                                <Switch
                                    checked={crops[7]}
                                    color='default'
                                    onClick={() => { this.switchClick(7) }}
                                    classes={{
                                        switchBase: classes.lime,
                                        checked: classes.colorChecked,
                                        bar: classes.colorBar,
                                      }}
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                />
                            </ListItemIcon>
                            <ListItemText id={'checkbox-list-label-7'} primary={7} />
                        </ListItem><ListItem key={8} role={undefined} dense>
                            <ListItemIcon>
                                <Switch
                                    checked={crops[8]}
                                    color='default'
                                    onClick={() => { this.switchClick(8) }}
                                    classes={{
                                        switchBase: classes.brown,
                                        checked: classes.colorChecked,
                                        bar: classes.colorBar,
                                      }}
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                />
                            </ListItemIcon>
                            <ListItemText id={'checkbox-list-label-8'} primary={8} />
                        </ListItem><ListItem key={9} role={undefined} dense>
                            <ListItemIcon>
                                <Switch
                                    checked={crops[9]}
                                    onClick={() => { this.switchClick(9) }}
                                    color='default'
                                    classes={{
                                        switchBase: classes.orange,
                                        checked: classes.colorChecked,
                                        bar: classes.colorBar,
                                      }}
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                />
                            </ListItemIcon>
                            <ListItemText id={'checkbox-list-label-9'} primary={9} />
                        </ListItem><ListItem key={10} role={undefined} dense>
                            <ListItemIcon>
                                <Switch
                                    checked={crops[10]}
                                    color='default'
                                    onClick={() => { this.switchClick(10) }}
                                    classes={{
                                        switchBase: classes.grey,
                                        checked: classes.colorChecked,
                                        bar: classes.colorBar,
                                      }}
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                />
                            </ListItemIcon>
                            <ListItemText id={'checkbox-list-label-10'} primary={10} />
                        </ListItem><ListItem key={11} role={undefined} dense>
                            <ListItemIcon>
                                <Switch
                                    checked={crops[11]}
                                    color='default'
                                    onClick={() => { this.switchClick(11) }}
                                    classes={{
                                        switchBase: classes.deepOrange,
                                        checked: classes.colorChecked,
                                        bar: classes.colorBar,
                                      }}
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                />
                            </ListItemIcon>
                            <ListItemText id={'checkbox-list-label-11'} primary={11} />
                        </ListItem>
                    </List>
                </div>
            </Paper>
        );
    }
}

export default withStyles(styles)(Legends);