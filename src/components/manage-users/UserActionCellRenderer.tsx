import { TramOutlined } from '@mui/icons-material';
import React, { Fragment } from 'react';
import * as Icon from 'react-bootstrap-icons';

interface Props {
  value: any;
  pinned: string | null;
  rowIndex: number;
}

const ActionCellRenderer = (props: Props) => {
  const actionClickHandler = (mode: string) => {
    const editRisk = { index: props.rowIndex, mode: mode };
    //dispatch(riskActions.setEditRisk(editRisk));
  };

  const icons = [];
  //for (let idx = 0; idx < props.value.length; idx++) {
  //const action = props.value[idx];

  if (props.value.edit === true) {
    icons.push(
      <Icon.PencilSquare
        onClick={() => actionClickHandler('Update')}
        style={{ margin: '3px' }}
        color="#7d9eb5"
        size={12}
      />,
    );
  }
  if (props.value.delete === true) {
    icons.push(
      <Icon.Trash onClick={() => actionClickHandler('Assign')} style={{ margin: '3px' }} color="#7d9eb5" size={12} />,
    );
  }
  // }
  return <Fragment>{icons}</Fragment>;
};

export default ActionCellRenderer;
