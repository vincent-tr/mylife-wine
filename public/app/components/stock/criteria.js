'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import * as mui from 'material-ui';
import base from '../base/index';
import icons from '../icons';
import common from '../common/index';
import tabStyles from '../base/tab-styles';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%'
  },
  tableRow: {
    height: 60
  },
  paperCommon: {
    flex: 1,
    height: '100%',
    textAlign: 'center',
  },
  paperDishes: {
    flex: 1,
    height: '100%',
    textAlign: 'center',
  },
  fieldTitle: {
    fontWeight: 'bold',
    width: 300,
    display: 'inline-block',
    textAlign: 'left'
  },
  radioButton: {
    display : 'inline-block',
    width   : 100,
    margin  : '0 20px 0 20px'
  }
};

const Criteria = ({ regions, types, dishes, criteria, onChange, onRefresh }) => {
  const { type, region, name, sparkling } = criteria;

  const nameChange      = (event) => onChange({ name: event.target.value || null });
  const typeChange      = (event, index, value) => onChange({ type: value });
  const regionChange    = (event, index, value) => onChange({ region: value });
  const sparklingChange = (event, value) => onChange({ sparkling: value === 'null' ? null : value });
//dishes

  return (
        <table style={{tableLayout: 'fixed', width: '100%'}}>
          <tbody>
            <tr style={styles.tableRow}>
              <td><div style={styles.fieldTitle}>Type de spiritueux</div></td>
              <td><common.ReferenceSelector id="type" autoWidth={false} style={{ width: 300 }} list={types} value={type} onChange={typeChange} /></td>

              <td><div style={styles.fieldTitle}>Avec quels plats le boire</div></td>
              <td rowSpan={4}>
                <mui.Paper style={{ width: 400 }}>
                  <mui.List style={Object.assign({}, tabStyles.scrollable, { height: 240, width: 400 })}>
                    {dishes.map(dish => (<mui.ListItem key={dish.id}
                                                       leftCheckbox={<mui.Checkbox />}
                                                       rightIcon={<base.DataImage data={dish.icon}/>}
                                                       primaryText={dish.name}/>)
                    )}
                  </mui.List>
                </mui.Paper>
            </td>
            </tr>
            <tr style={styles.tableRow}>
              <td><div style={styles.fieldTitle}>Region</div></td>
              <td><common.ReferenceSelector id="region" autoWidth={false} style={{ width: 300 }} list={regions} value={region} onChange={regionChange} /></td>
            </tr>
            <tr style={styles.tableRow}>
              <td><div style={styles.fieldTitle}>Appelation</div></td>
              <td><mui.TextField id="name" style={{ width: 300 }} value={name || ''} onChange={nameChange} /></td>
            </tr>
            <tr style={styles.tableRow}>
              <td><div style={styles.fieldTitle}>Mousseux</div></td>
              <td>
                <mui.RadioButtonGroup name="sparkling" valueSelected={sparkling === null ? 'null' : sparkling} onChange={sparklingChange}>
                  <mui.RadioButton style={styles.radioButton} value={'null'} label="Tous" />
                  <mui.RadioButton style={styles.radioButton} value={true} label="Oui" />
                  <mui.RadioButton style={styles.radioButton} value={false} label="Non" />
                </mui.RadioButtonGroup>
              </td>

              <td>
                <mui.IconButton onClick={() => onRefresh()}
                                tooltip="Rafraîchir">
                  <icons.actions.Refresh />
                </mui.IconButton>
              </td>
            </tr>
         </tbody>
        </table>
  );
};

Criteria.propTypes = {
  regions   : PropTypes.arrayOf(PropTypes.object),
  types     : PropTypes.arrayOf(PropTypes.object),
  dishes    : PropTypes.arrayOf(PropTypes.object),
  criteria  : PropTypes.object.isRequired,
  onChange  : PropTypes.func.isRequired,
  onRefresh : PropTypes.func.isRequired,
};

export default Criteria;