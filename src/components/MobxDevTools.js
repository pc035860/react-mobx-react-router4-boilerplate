import React from 'react';

import visibleForDebug from '_hocs/visibleForDebug';
import LazyRoute from 'lazy-route';

const MobxDevTools = visibleForDebug(props => (
  <LazyRoute
    {...props}
    component={import('mobx-react-devtools')}
  />
));

export default MobxDevTools;
