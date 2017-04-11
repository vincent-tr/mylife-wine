'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import * as mui from 'material-ui';

const DialogInfo = ({ info, onClose }) => (
  <mui.Dialog
    title="Information"
    actions={<mui.FlatButton
              label="OK"
              primary={true}
              onTouchTap={onClose} />}
    modal={true}
    open={!!info}>
    <div style={{whiteSpace: 'pre'}}>
      {info}
    </div>
  </mui.Dialog>
);

DialogInfo.propTypes = {
  info: PropTypes.string,
  onClose: PropTypes.func.isRequired
};

export default DialogInfo;