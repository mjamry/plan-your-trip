import React from 'react';
import {
  GridToolbarColumnsButton, GridToolbarContainer, GridToolbarFilterButton,
} from '@mui/x-data-grid';

import { makeStyles } from '@mui/styles';
import CustomToolbarItem, { CustomToolbarItemProps } from './CustomToolbarItem';

const useStyles = makeStyles({
  toolbarContainer: {
    display: 'flex',
    flexDirection: 'row',
    fontColor: 'red',
  },
  toolbarRight: {
    paddingRight: '1vw',
  },
  toolbarLeft: {
    flexGrow: 1,
    textAlign: 'left',
    paddingLeft: '1vw',
  },
});

type ToolbarProps = {
  actions?: CustomToolbarItemProps[];
}

function CustomToolbar(props: ToolbarProps) {
  const { actions } = props;
  const classes = useStyles();

  const renderCustomActions = (): JSX.Element[] => {
    if (actions) {
      return actions.map(
        (a: CustomToolbarItemProps) => (
          <CustomToolbarItem
            title={a.title}
            icon={a.icon}
            action={a.action}
            key={a.title}
          />
        ),
      );
    }
    return [];
  };

  return (
    <GridToolbarContainer className={classes.toolbarContainer}>
      <div className={classes.toolbarLeft}>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
      </div>
      <div className={classes.toolbarRight}>
        { renderCustomActions() }
      </div>
    </GridToolbarContainer>
  );
}

export default CustomToolbar;
