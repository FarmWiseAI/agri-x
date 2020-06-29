import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import App from './App';

export default class Root extends Component {
  render() {
    return (
      <App />
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
};
