import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Divider from "@material-ui/core/Divider";
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  position: {
    margin: "auto"
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    marginBottom: "20px"
  },
  formControl: {
    margin: "auto",
    minWidth: 120,
    width: "50%"
  },
  button: {
    margin: theme.spacing.unit
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  },
  actionBar: {
      display: 'flex',
      justifyContent: 'center'
  }
});

const LoadingModal = ({ classes, open,close }) => {
  
  const [completed, setCompleted] = React.useState(0);
  const [buffer, setBuffer] = React.useState(10);
  const progress = React.useRef(() => {});
  React.useEffect(() => {
    progress.current = () => {
      if (completed > 100) {
        close();
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setCompleted(completed + diff);
        setBuffer(completed + diff + diff2);
      }
    };
  });
  React.useEffect(() => {
    function tick() {
      progress.current();
    }
    const timer = setInterval(tick, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
      className={classes.position}
    >
      <div className={classes.paper}>
        <Typography variant="h6" align="center">
          AgriX Analyzing
        </Typography>
        <div className={classes.root}>
      <LinearProgress variant="buffer" value={completed} valueBuffer={buffer} />
    </div>
        </div>
    </Modal>
  );
};

LoadingModal.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool,
  close: PropTypes.func
};

export default withStyles(styles)(LoadingModal);
