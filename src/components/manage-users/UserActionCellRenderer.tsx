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
  for (let idx = 0; idx < props.value.length; idx++) {
    const action = props.value[idx];
    if (action === 'Add') {
      icons.push(
        <span title="Add">
          <Icon.Plus onClick={() => actionClickHandler('Add')} style={{ margin: '3px' }} color="#7d9eb5" size={12} />
        </span>,
      );
    }

    if (action === 'Update') {
      icons.push(
        <Icon.PencilSquare
          onClick={() => actionClickHandler('Update')}
          style={{ margin: '3px' }}
          color="#7d9eb5"
          size={12}
        />,
      );
    }
    if (action === 'Delete') {
      icons.push(
        <Icon.Trash onClick={() => actionClickHandler('Assign')} style={{ margin: '3px' }} color="#7d9eb5" size={12} />,
      );
    }
  }
  return <Fragment>{icons}</Fragment>;
};

export default ActionCellRenderer;
