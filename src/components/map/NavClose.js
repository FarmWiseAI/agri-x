import React from 'react'
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  button: {
    height: '20%',
    width: '1em',
    position: 'absolute',
    top: '0px',
    left: '400px',
    borderRadius: '0 0 50% 0',
    zIndex: 1
  }
});
const NavClose = ({classes, onClick}) => {
    return (
        <Button variant="contained" className={classes.button} onClick={onClick}>
        <ChevronLeftIcon fontSize='large'/>
      </Button>
    )
}

NavClose.propTypes = {
    classes: PropTypes.object,
    onClick: PropTypes.func
}

export default  withStyles(styles)(NavClose)
