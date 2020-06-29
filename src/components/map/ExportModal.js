import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

const styles = theme => ({
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

const ExportModal = ({ classes, open,close }) => {
  const [format, setFormat] = useState("pdf");
  const exportFn = ()=>{
    let lctn = '';
    switch(format){
      case "pdf": lctn = './static/export.pdf'; break;
      case "xlsx": lctn = './static/excel.xlsx'; break;
      case "jpg": lctn = './static/image.JPG'; break;
    }
    window.open(lctn);
  }
  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
      className={classes.position}
    >
      <div className={classes.paper}>
        <Typography variant="h6" align="center">
          Export Report
        </Typography>
        <Divider />
        <Typography paragraph align="center">
          Do you wish to export the displayed result from the map?
        </Typography>
        <Typography variant="subtitle2" align="center">
          Export format:
        </Typography>
        <form className={classes.form} autoComplete="off">
          <FormControl className={classes.formControl}>
            <Select
              value={format}
              displayEmpty
              name="format"
              className={classes.selectEmpty}
              onChange={e => setFormat(e.target.value)}
            >
              <MenuItem value="pdf">Pdf</MenuItem>
              <MenuItem value="xlsx">Excel</MenuItem>
              <MenuItem value="jpg">Image</MenuItem>
            </Select>
          </FormControl>
        </form>
        <div className={classes.actionBar}>
        <Button variant="contained" className={classes.button} onClick={close}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" className={classes.button} onClick={exportFn}>
          Export
        </Button>
        </div>
      </div>
    </Modal>
  );
};

ExportModal.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool,
  close: PropTypes.func
};

export default withStyles(styles)(ExportModal);
