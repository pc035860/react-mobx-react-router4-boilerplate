import React, { Component } from 'react';
import { parse } from 'query-string';

import { Route } from 'react-router-dom';

const visibleForDebug = C => (
  class extends Component {
    render() {
      return (
        <Route
          path="/"
          render={(props) => {
            if (!props.match) {
              return null;
            }

            const params = parse(props.location.search);
            const shouldRender = 'debug' in params && (
                params.debug !== 0 ||
                params.debug !== '0' ||
                params.debug !== 'false'
              );

            return shouldRender ? <C {...props} /> : null;
          }}
        />
      );
    }
  }
);

export default visibleForDebug;
