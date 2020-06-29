import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import cloneDeep from 'lodash/cloneDeep';

const styles = theme => ({
    root: {
        paddingLeft: 25
    }
});

const SubType = ({ classes, mainType, handleChange }) => {
    const [sub, setSub] = useState({
        101: true,
        102: true,
        201: true,
        202: true,
        203: true,
        301: true,
        302: true,
        303: true,
        304: true,
        305: true
    });
    const typeConf = {
        1: [{
            id: 101,
            type: 'Non-Rice',
            color:'brown'
        }, {
            id: 102,
            type: 'Rice',
            color:'green'
        }],
        2: [{
            id: 201,
            type: 'Crop standing for full season Yeild',
            color:'green'
        }, {
            id: 202,
            type: 'Crops failed end-season Yeild',
            color:'blue'
        }, {
            id: 203,
            type: 'Crop Failure',
            color:'red'
        }],
        3: [{
            id: 301,
            type: 'Urban',
            color:'grey'
        }, {
            id: 302,
            type: 'Agri',
            color:'orange'
        },{
            id: 303,
            type: 'Water',
            color:'blue'
        }, {
            id: 304,
            type: 'forest',
            color:'green'
        },{
            id: 305,
            type: 'other',
            color:'brown'
        }]
    }
    const handle = id => e => {
        let subz = cloneDeep(sub);
        subz[id] = e.target.checked;
        setSub(subz);
        handleChange(id);
    }
    return [
        <Divider key={0} />,
        <Grid container className={classes.root} key={1} style={{background:'whitesmoke'}}>
            {typeConf[mainType] && <Grid item md={12}>
                <Typography component="h5">
                    Sub Categories
                </Typography>
            </Grid>}
            {typeConf[mainType] && <Grid item md={12}>
                <FormGroup row>
                    {typeConf[mainType].map(conf => (
                        <FormControlLabel
                            key={conf.id}
                            control={
                                <Checkbox
                                    checked={sub[conf.id]}
                                    onChange={handle(conf.id)}
                                    value={conf.type}
                                    style={{color:conf.color}}
                                />
                            }
                            label={conf.type}
                        />
                    ))}
                </FormGroup>
            </Grid>}
        </Grid>

    ]
}

export default withStyles(styles)(SubType);
