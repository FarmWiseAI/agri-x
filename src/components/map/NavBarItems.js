import React from "react";
import propTypes from "prop-types";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import ImageSearch from "@material-ui/icons/ImageSearch";
import RemoveRedEye from "@material-ui/icons/RemoveRedEyeOutlined";
import LocalHospital from "@material-ui/icons/LocalHospitalOutlined";
import Map from "@material-ui/icons/Map";
import { withStyles } from "@material-ui/core/styles";
import MultilineChart from "@material-ui/icons/MultilineChart";

const styles = () => ({
  inline: {
    display: 'inline',
    whiteSpace: 'wrap'
  },
  items: {
    alignItems: "center",
    justifyContent: "center",
    height: "25%"
  }
});

const NavBarItems = ({ classes, extended }) => {
  return (
    <>
      <ListItem button className={classes.items}>
        <ListItemIcon>{<ImageSearch fontSize='large'/>}</ListItemIcon>
        {extended && <ListItemText primary="Land Coverage" secondary={
          <Typography component="span" className={classes.inline} color="textPrimary">
          Check on agriculture land coverage
          </Typography>
          }/>}
      </ListItem>
      <Divider />
      <ListItem button className={classes.items}>
        <ListItemIcon>{<RemoveRedEye  fontSize='large'/>}</ListItemIcon>
        {extended && <ListItemText primary="Crop ID" secondary={
          <Typography component="span" className={classes.inline} color="textPrimary">
          Check on agriculture land coverage
          </Typography>
          }/>}
      </ListItem>
      <Divider />
      <ListItem button className={classes.items}>
        <ListItemIcon>{<LocalHospital  fontSize='large'/>}</ListItemIcon>
        {extended && <ListItemText primary="Crop Health" secondary={
          <Typography component="span" className={classes.inline} color="textPrimary">
          Check on health of crops on specific area
          </Typography>
          }/>}
      </ListItem>
      <Divider />
      <ListItem button className={classes.items}>
        <ListItemIcon>{<Map  fontSize='large'/>}</ListItemIcon>
        {extended && <ListItemText primary="Land Coverage" secondary={
          <Typography component="span" className={classes.inline} color="textPrimary">
          Find out the type of soil used for that specific area
          </Typography>
          }/>}
      </ListItem>
      <Divider />
      <ListItem button className={classes.items}>
        <ListItemIcon>{<MultilineChart  fontSize='large'/>}</ListItemIcon>
        {extended && <ListItemText primary="Analysis" secondary={
          <Typography component="span" className={classes.inline} color="textPrimary">
          Find out the type of soil used for that specific area
          </Typography>
          }/>}
      </ListItem>
      <Divider />
    </>
  );
};
NavBarItems.propTypes = {
  classes: propTypes.object,
  extended: propTypes.bool
};

export default withStyles(styles, { withTheme: true })(NavBarItems);
