import React from 'react';
import PropTypes from 'prop-types';
import Redbox from 'redbox-react';

const AppErrorReporter = ({ error }) => {
  console.error(error);  // eslint-disable-line
  return <Redbox error={error} />;
};
AppErrorReporter.propTypes = {
  error: PropTypes.instanceOf(Error).isRequired
};

export default AppErrorReporter;
