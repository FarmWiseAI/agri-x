/* eslint-disable import/no-named-as-default */
import React from "react";
import PropTypes from "prop-types";
import Grid from '@material-ui/core/Grid';
import Map from "./Map";
import MainType from './MainType';
import SubType from './SubType';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      MainTypeId: 1,
      subType: {
        1: {
          101: true,
          102: true
        },
        2: {
          201: true,
          202: true,
          203: true
        },
        3: {
          301: true,
          302: true,
          303: true,
          304: true,
          305: true
        }
      }
    }
  }
  onMainTypeChange = MainTypeId => {
    this.setState({MainTypeId})
  }
  onSubTypeChange = id => {
    this.setState(prevState => {
      prevState.subType[prevState.MainTypeId][id] = !prevState.subType[prevState.MainTypeId][id];
      return prevState;
    })
  }
  render() {
    const {MainTypeId, subType} = this.state;
    return (
      <Grid container>
        <Grid item md={2}>
            <MainType handleChange={this.onMainTypeChange}/>
        </Grid>
        <Grid item md={10}>
          <Map mainType={MainTypeId} subType = {subType[MainTypeId]}/>
        </Grid>
        <Grid item md={12}>
          <SubType mainType={MainTypeId} handleChange = {this.onSubTypeChange}/>
        </Grid>
      </Grid>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
