import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import ApexCharts from 'apexcharts';
const pieOption = {
  chart:{
    type: 'pie'
  },
  series: [324947.05, 718969.0104, 703248.9567, 102469.5138, 100839.6755,
            96475.91474, 90429.74025, 87590.66701, 76286.94947, 76076.64775, 616657.2229],
chartOptions: {
  labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']
},
legend: {
  show: false
},
colors: ['#800080', '#FF0000', '#FF00FF', '#000080', '#0000FF', '#008000', '#00FF00', '#ffa500', '#654321', '#d3d3d3', '#FF8C00']
}
const rangeOption = {
  chart: {
    type: 'rangeBar'
  },
  series: [{
    data: [{
      x: '1',
      y: [0, 324947.05]
    }, {
      x: '2',
      y: [0, 718969.0104]
    }, {
      x: '3',
      y: [0, 703248.9567]
    }, {
      x: '4',
      y: [0, 102469.5138]
    }, {
      x: '5',
      y: [0, 100839.6755]
    }, {
      x: '6',
      y: [0, 96475.91474]
    }, {
      x: '7',
      y: [0, 90429.74025]
    }, {
      x: '8',
      y: [0, 87590.66701]
    }, {
      x: '9',
      y: [0, 76286.94947]
    }, {
      x: '10',
      y: [0, 76076.64775]
    }, {
      x: '11',
      y: [0, 616657.2229]
    }
    ]
  }]
}
const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 100,
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

const ChartModal = ({ classes, open, close }) => {
  useEffect(() => {
    setTimeout(() => {
      const rangeBar = new ApexCharts(document.getElementById("chart"), rangeOption);
      rangeBar.render();
      const pieBar = new ApexCharts(document.getElementById("pie"), pieOption);
      pieBar.render();
    }, 0);
  }, [])
  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
      className={classes.position}
    >
      <div className={classes.paper}>
        <Typography variant="h6" align="center">
          Report
        </Typography>
        <Divider />
        <Grid container>
          <Grid item md={6}>
            <div id="chart"></div>
          </Grid>
          <Grid item md={6}>
            <div id='pie'></div>
          </Grid>
        </Grid>
        <div className={classes.actionBar}>
          <Button variant="contained" className={classes.button} onClick={close}>
            Close
        </Button>
        </div>
      </div>
    </Modal>
  );
};

ChartModal.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool,
  close: PropTypes.func
};

export default withStyles(styles)(ChartModal);
